// components/features/avaliacoes/AvaliacaoCard.tsx
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import type { AvaliacaoResponse } from '@/lib/types';
import { getCorNota, getLabelNota } from '@/lib/constants/criterios';

interface AvaliacaoCardProps {
  avaliacao: AvaliacaoResponse;
}

export function AvaliacaoCard({ avaliacao }: AvaliacaoCardProps) {
  const corNota = getCorNota(avaliacao.notaFinal || 0);
  const labelNota = getLabelNota(avaliacao.notaFinal || 0);

  return (
    <Card style={styles.card}>
      <Card.Content>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialIcons name="groups" size={24} color="#6F73D2" />
            <View style={styles.headerInfo}>
              <Text style={styles.equipeNome}>{avaliacao.nomeEquipe}</Text>
              <Text style={styles.data}>
                {new Date(avaliacao.criadoEm).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Pontuação */}
        <View style={styles.pontuacaoContainer}>
          <View style={styles.pontuacaoItem}>
            <Text style={styles.pontuacaoLabel}>Pontuação Total</Text>
            <Text style={styles.pontuacaoValor}>
              {avaliacao.pontuacaoTotal || 0} / 50
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.pontuacaoItem}>
            <Text style={styles.pontuacaoLabel}>Nota Final</Text>
            <Text style={[styles.notaFinal, { color: corNota }]}>
              {(avaliacao.notaFinal || 0).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Label da Nota */}
        <Chip
          style={[styles.chip, { backgroundColor: `${corNota}20` }]}
          textStyle={{ color: corNota, fontWeight: 'bold' }}
        >
          {labelNota}
        </Chip>

        {/* Comentários */}
        {avaliacao.comentarios && (
          <View style={styles.comentariosContainer}>
            <MaterialIcons name="comment" size={16} color="#6B7280" />
            <Text style={styles.comentarios} numberOfLines={2}>
              {avaliacao.comentarios}
            </Text>
          </View>
        )}

        {/* Detalhes dos critérios */}
        <View style={styles.criteriosContainer}>
          <View style={styles.criterioRow}>
            <Text style={styles.criterioLabel}>Definição do Problema:</Text>
            <Text style={styles.criterioValor}>
              {avaliacao.relevanciaProblema + avaliacao.fundamentacaoProblema} / 10
            </Text>
          </View>
          <View style={styles.criterioRow}>
            <Text style={styles.criterioLabel}>Defesa da Solução:</Text>
            <Text style={styles.criterioValor}>
              {avaliacao.focoSolucao + avaliacao.viabilidadeSolucao} / 10
            </Text>
          </View>
          <View style={styles.criterioRow}>
            <Text style={styles.criterioLabel}>Apresentação:</Text>
            <Text style={styles.criterioValor}>
              {avaliacao.clarezaApresentacao +
                avaliacao.dominioAssunto +
                avaliacao.transmissaoInformacoes +
                avaliacao.padronizacaoApresentacao +
                avaliacao.linguagemTempo +
                avaliacao.qualidadeRespostas}{' '}
              / 30
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  equipeNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  data: {
    fontSize: 12,
    color: '#6B7280',
  },
  pontuacaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  pontuacaoItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  pontuacaoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  pontuacaoValor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  notaFinal: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chip: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  comentariosContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 12,
  },
  comentarios: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  criteriosContainer: {
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  criterioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  criterioLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  criterioValor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
});