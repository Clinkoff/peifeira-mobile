// app/(tabs)/avaliacoes.tsx
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Searchbar, Chip, SegmentedButtons } from 'react-native-paper';
import { useState } from 'react';
import { useAvaliacoes } from '@/lib/hooks/useAvaliacoes';
import { AvaliacaoCard } from '../../components/features/avaliacoes/AvaliacaoCard';
import { Loading } from '../../components/ui/Loading';
import { MaterialIcons } from '@expo/vector-icons';
import type { AvaliacaoResponse } from '@/lib/types';

export default function AvaliacoesScreen() {
  const { minhasAvaliacoes, isLoadingMinhasAvaliacoes, mediaGeral } = useAvaliacoes();
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroNota, setFiltroNota] = useState('todas');
  const [refreshing, setRefreshing] = useState(false);

  // Filtrar avaliações
  const filteredAvaliacoes = minhasAvaliacoes.filter((avaliacao) => {
    const matchesSearch = avaliacao.nomeEquipe
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    let matchesNota = true;
    if (filtroNota === 'excelente') {
      matchesNota = (avaliacao.notaFinal || 0) >= 9;
    } else if (filtroNota === 'bom') {
      matchesNota = (avaliacao.notaFinal || 0) >= 7 && (avaliacao.notaFinal || 0) < 9;
    } else if (filtroNota === 'regular') {
      matchesNota = (avaliacao.notaFinal || 0) >= 5 && (avaliacao.notaFinal || 0) < 7;
    } else if (filtroNota === 'insuficiente') {
      matchesNota = (avaliacao.notaFinal || 0) < 5;
    }

    return matchesSearch && matchesNota;
  });

  // Calcular estatísticas
  const totalAvaliacoes = minhasAvaliacoes.length;
  const mediaMinhasAvaliacoes =
    totalAvaliacoes > 0
      ? minhasAvaliacoes.reduce((sum, av) => sum + (av.notaFinal || 0), 0) / totalAvaliacoes
      : 0;

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (isLoadingMinhasAvaliacoes) {
    return <Loading message="Carregando avaliações..." />;
  }

  const renderAvaliacao = ({ item }: { item: AvaliacaoResponse }) => {
    return <AvaliacaoCard avaliacao={item} />;
  };

  return (
    <View style={styles.container}>
      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total de Avaliações</Text>
          <Text style={styles.statValue}>{totalAvaliacoes}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Minha Média</Text>
          <Text style={[styles.statValue, { color: '#6F73D2' }]}>
            {mediaMinhasAvaliacoes.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Busca */}
      <Searchbar
        placeholder="Buscar equipe..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      {/* Filtro de Notas */}
      <View style={styles.filtrosContainer}>
        <SegmentedButtons
          value={filtroNota}
          onValueChange={setFiltroNota}
          buttons={[
            { value: 'todas', label: 'Todas' },
            { value: 'excelente', label: '≥9' },
            { value: 'bom', label: '7-9' },
            { value: 'regular', label: '5-7' },
            { value: 'insuficiente', label: '<5' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      {/* Lista */}
      {filteredAvaliacoes.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="assessment" size={64} color="#CCC" />
          <Text style={styles.emptyText}>
            {searchQuery || filtroNota !== 'todas'
              ? 'Nenhuma avaliação encontrada com os filtros aplicados'
              : 'Você ainda não realizou nenhuma avaliação'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredAvaliacoes}
          renderItem={renderAvaliacao}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  searchbar: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  filtrosContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  segmentedButtons: {
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
});