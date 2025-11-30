// app/(tabs)/index.tsx
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Card, Chip, Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useEquipes } from '@/lib/hooks/useEquipes';
import { useAvaliacoes } from '@/lib/hooks/useAvaliacoes';
import { Loading } from '../../components/ui/Loading';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { MaterialIcons } from '@expo/vector-icons';
import type { EquipeResponse } from '@/lib/types/equipe.types';

export default function EquipesScreen() {
  const router = useRouter();
  const { equipesComProjeto, isLoadingComProjeto } = useEquipes();
  const { minhasAvaliacoes } = useAvaliacoes();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Filtrar equipes pela busca
  const filteredEquipes = equipesComProjeto.filter((equipe) =>
    equipe.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Verificar se equipe já foi avaliada
  const jaAvaliada = (equipeId: string) => {
    return minhasAvaliacoes.some((av) => av.equipeId === equipeId);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // React Query fará o refetch automaticamente
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (isLoadingComProjeto) {
    return <Loading message="Carregando equipes..." />;
  }

  const renderEquipe = ({ item }: { item: EquipeResponse }) => {
    const avaliada = jaAvaliada(item.id);

    return (
      <Card
        style={styles.card}
        onPress={() => router.push(`/avaliar/${item.id}`)}
      >
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <MaterialIcons name="groups" size={24} color="#6F73D2" />
              <Text style={styles.cardTitle}>{item.nome}</Text>
            </View>
            {avaliada && (
              <Chip icon="check-circle" style={styles.chipAvaliada}>
                Avaliada
              </Chip>
            )}
          </View>

          <View style={styles.cardInfo}>
            <View style={styles.infoRow}>
              <MaterialIcons name="person" size={16} color="#666" />
              <Text style={styles.infoText}>Líder: {item.nomeLider}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="people" size={16} color="#666" />
              <Text style={styles.infoText}>
                {item.quantidadeMembros || 0} membros
              </Text>
            </View>

            {item.temProjeto && (
              <View style={styles.infoRow}>
                <MaterialIcons name="assignment" size={16} color="#666" />
                <Text style={styles.infoText}>Possui projeto</Text>
              </View>
            )}
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar equipe..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      {filteredEquipes.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="groups" size={64} color="#CCC" />
          <Text style={styles.emptyText}>
            {searchQuery
              ? 'Nenhuma equipe encontrada'
              : 'Nenhuma equipe com projeto cadastrada'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredEquipes}
          renderItem={renderEquipe}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
  searchbar: {
    margin: 16,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#111827',
    flex: 1,
  },
  chipAvaliada: {
    backgroundColor: '#D1FAE5',
  },
  cardInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
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