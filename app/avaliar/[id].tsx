// app/avaliar/[id].tsx
import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, TextInput, Card, Chip } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useEquipes } from '@/lib/hooks/useEquipes';
import { useAvaliacoes } from '@/lib/hooks/useAvaliacoes';
import { useAuth } from '@/lib/hooks/useAuth';
import { CriterioInput } from '../../components/features/avaliacoes/CriterioInput';
import { Loading } from '../../components/ui/Loading';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { CRITERIOS, CATEGORIAS, calcularNotaFinal } from '@/lib/constants/criterios';
import type { CreateAvaliacaoRequest } from '@/lib/types';

export default function AvaliarEquipeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { useEquipeById } = useEquipes();
  const { data: equipe, isLoading: isLoadingEquipe } = useEquipeById(id!);
  const { create, isCreating } = useAvaliacoes();

  // Estado do formulário
  const [formData, setFormData] = useState<Record<string, number>>({
    relevanciaProblema: 0,
    fundamentacaoProblema: 0,
    focoSolucao: 0,
    viabilidadeSolucao: 0,
    clarezaApresentacao: 0,
    dominioAssunto: 0,
    transmissaoInformacoes: 0,
    padronizacaoApresentacao: 0,
    linguagemTempo: 0,
    qualidadeRespostas: 0,
  });

  const [comentarios, setComentarios] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calcular pontuação total
  const pontuacaoTotal = Object.values(formData).reduce((sum, val) => sum + val, 0);
  const notaFinal = calcularNotaFinal(pontuacaoTotal);

  // Validar se todos os critérios foram preenchidos
  const validarFormulario = () => {
    const newErrors: Record<string, string> = {};

    CRITERIOS.forEach((criterio) => {
      if (formData[criterio.id] === undefined || formData[criterio.id] === null) {
        newErrors[criterio.id] = 'Obrigatório';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validarFormulario()) {
      Alert.alert('Atenção', 'Por favor, avalie todos os critérios.');
      return;
    }

    if (!user?.perfilProfessor?.id) {
      Alert.alert('Erro', 'Perfil de professor não encontrado.');
      return;
    }

    try {
      const payload: CreateAvaliacaoRequest = {
        equipeId: id!,
        avaliadorId: user.perfilProfessor.id,
        relevanciaProblema: formData.relevanciaProblema,
        fundamentacaoProblema: formData.fundamentacaoProblema,
        focoSolucao: formData.focoSolucao,
        viabilidadeSolucao: formData.viabilidadeSolucao,
        clarezaApresentacao: formData.clarezaApresentacao,
        dominioAssunto: formData.dominioAssunto,
        transmissaoInformacoes: formData.transmissaoInformacoes,
        padronizacaoApresentacao: formData.padronizacaoApresentacao,
        linguagemTempo: formData.linguagemTempo,
        qualidadeRespostas: formData.qualidadeRespostas,
        comentarios: comentarios || undefined,
      };

      await create(payload);

      Alert.alert(
        'Sucesso!',
        `Avaliação registrada com nota final ${notaFinal.toFixed(2)}`,
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error: any) {
      console.error('Erro ao salvar avaliação:', error);
      Alert.alert(
        'Erro',
        error.response?.data?.message || 'Erro ao salvar avaliação. Tente novamente.'
      );
    }
  };

  if (isLoadingEquipe) {
    return <Loading message="Carregando equipe..." />;
  }

  if (!equipe) {
    return (
      <ErrorMessage
        message="Equipe não encontrada"
        onRetry={() => router.back()}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        {/* Header da Equipe */}
        <Card style={styles.headerCard}>
          <Card.Content>
            <View style={styles.equipeHeader}>
              <MaterialIcons name="groups" size={32} color="#6F73D2" />
              <View style={styles.equipeInfo}>
                <Text style={styles.equipeNome}>{equipe.nome}</Text>
                <Text style={styles.equipeLider}>Líder: {equipe.lider?.nome}</Text>
                <Text style={styles.equipeMembros}>
                  {equipe.quantidadeMembros} membros
                </Text>
              </View>
            </View>

            {equipe.projeto && (
              <View style={styles.projetoInfo}>
                <MaterialIcons name="assignment" size={20} color="#6B7280" />
                <Text style={styles.projetoTitulo}>{equipe.projeto.titulo}</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Resumo de Pontuação */}
        <Card style={styles.resumoCard}>
          <Card.Content>
            <View style={styles.resumoHeader}>
              <Text style={styles.resumoTitle}>Resumo da Avaliação</Text>
            </View>

            <View style={styles.resumoGrid}>
              <View style={styles.resumoItem}>
                <Text style={styles.resumoLabel}>Pontuação Total</Text>
                <Text style={styles.resumoPontos}>{pontuacaoTotal} / 50</Text>
              </View>
              <View style={styles.resumoDivider} />
              <View style={styles.resumoItem}>
                <Text style={styles.resumoLabel}>Nota Final</Text>
                <Text style={[styles.resumoNota, { color: '#6F73D2' }]}>
                  {notaFinal.toFixed(2)}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Critérios por Categoria */}
        {Object.entries(CATEGORIAS).map(([key, categoria]) => {
          const criteriosDaCategoria = CRITERIOS.filter((c) => c.categoria === key);
          const pontosDaCategoria = criteriosDaCategoria.reduce(
            (sum, c) => sum + (formData[c.id] || 0),
            0
          );

          return (
            <View key={key} style={styles.categoriaContainer}>
              <View style={styles.categoriaHeader}>
                <Text style={styles.categoriaNome}>{categoria.nome}</Text>
                <Chip style={{ backgroundColor: categoria.cor }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    {pontosDaCategoria} / {categoria.maxPontos}
                  </Text>
                </Chip>
              </View>

              {criteriosDaCategoria.map((criterio) => (
                <CriterioInput
                  key={criterio.id}
                  label={criterio.nome}
                  descricao={criterio.descricao}
                  value={formData[criterio.id] || 0}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, [criterio.id]: value }))
                  }
                  error={errors[criterio.id]}
                />
              ))}
            </View>
          );
        })}

        {/* Comentários */}
        <Card style={styles.comentariosCard}>
          <Card.Content>
            <Text style={styles.comentariosLabel}>
              Comentários (opcional)
            </Text>
            <TextInput
              mode="outlined"
              multiline
              numberOfLines={4}
              value={comentarios}
              onChangeText={setComentarios}
              placeholder="Adicione observações sobre a apresentação..."
              style={styles.comentariosInput}
              outlineColor="#E5E7EB"
              activeOutlineColor="#6F73D2"
            />
          </Card.Content>
        </Card>

        {/* Botões */}
        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={styles.buttonCancel}
            disabled={isCreating}
          >
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isCreating}
            disabled={isCreating}
            style={styles.buttonSubmit}
          >
            {isCreating ? 'Salvando...' : 'Salvar Avaliação'}
          </Button>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  headerCard: {
    margin: 16,
    backgroundColor: '#fff',
  },
  equipeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  equipeInfo: {
    marginLeft: 16,
    flex: 1,
  },
  equipeNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  equipeLider: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  equipeMembros: {
    fontSize: 14,
    color: '#6B7280',
  },
  projetoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  projetoTitulo: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  resumoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  resumoHeader: {
    marginBottom: 16,
  },
  resumoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  resumoGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resumoItem: {
    flex: 1,
    alignItems: 'center',
  },
  resumoDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  resumoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  resumoPontos: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  resumoNota: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  categoriaContainer: {
    marginBottom: 24,
  },
  categoriaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoriaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  comentariosCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  comentariosLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  comentariosInput: {
    backgroundColor: '#fff',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
  buttonCancel: {
    flex: 1,
    borderColor: '#E5E7EB',
  },
  buttonSubmit: {
    flex: 1,
    backgroundColor: '#6F73D2',
  },
});