// app/+not-found.tsx
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={80} color="#6B7280" />
      <Text style={styles.title}>Página não encontrada</Text>
      <Text style={styles.description}>
        A página que você está procurando não existe ou foi removida.
      </Text>
      <Button
        mode="contained"
        onPress={() => router.replace('/')}
        style={styles.button}
      >
        Voltar para o início
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#6F73D2',
  },
});
