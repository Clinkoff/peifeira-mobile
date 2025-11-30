// components/features/avaliacoes/CriterioInput.tsx
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

interface CriterioInputProps {
  label: string;
  descricao: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export function CriterioInput({
  label,
  descricao,
  value,
  onChange,
  error,
}: CriterioInputProps) {
  const pontos = [0, 1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.pontuacao}>
          {value} / 5 pontos
        </Text>
      </View>
      
      <Text style={styles.descricao}>{descricao}</Text>

      <View style={styles.pontosContainer}>
        {pontos.map((ponto) => (
          <TouchableOpacity
            key={ponto}
            style={[
              styles.pontoButton,
              value === ponto && styles.pontoButtonActive,
            ]}
            onPress={() => onChange(ponto)}
          >
            <Text
              style={[
                styles.pontoText,
                value === ponto && styles.pontoTextActive,
              ]}
            >
              {ponto}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  pontuacao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6F73D2',
  },
  descricao: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  pontosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  pontoButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  pontoButtonActive: {
    borderColor: '#6F73D2',
    backgroundColor: '#6F73D2',
  },
  pontoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  pontoTextActive: {
    color: '#fff',
  },
  error: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 8,
  },
});