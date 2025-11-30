import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, List, Button, Avatar, Divider } from 'react-native-paper';
import { useAuth } from '@/lib/hooks/useAuth';
import { useAvaliacoes } from '@/lib/hooks/useAvaliacoes';
import { MaterialIcons } from '@expo/vector-icons';

export default function PerfilScreen() {
  const { user, logout } = useAuth();
  const { minhasAvaliacoes } = useAvaliacoes();

  const handleLogout = () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  const totalAvaliacoes = minhasAvaliacoes.length;
  const mediaGeral =
    totalAvaliacoes > 0
      ? minhasAvaliacoes.reduce((sum, av) => sum + (av.notaFinal || 0), 0) / totalAvaliacoes
      : 0;

  return (
    <ScrollView style={styles.container}>
      {/* Header com Avatar */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.avatarContainer}>
            <Avatar.Text
              size={80}
              label={user?.nome.charAt(0).toUpperCase() || 'P'}
              style={styles.avatar}
            />
            <Text style={styles.nome}>{user?.nome}</Text>
            <Text style={styles.role}>Professor</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Informações Pessoais */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          <Divider style={styles.divider} />

          <List.Item
            title="Matrícula"
            description={user?.matricula}
            left={(props) => <List.Icon {...props} icon="badge-account" />}
            style={styles.listItem}
          />

          <List.Item
            title="E-mail"
            description={user?.email}
            left={(props) => <List.Icon {...props} icon="email" />}
            style={styles.listItem}
          />

          {user?.perfilProfessor?.departamento && (
            <List.Item
              title="Departamento"
              description={user.perfilProfessor.departamento}
              left={(props) => <List.Icon {...props} icon="domain" />}
              style={styles.listItem}
            />
          )}

          {user?.perfilProfessor?.titulacao && (
            <List.Item
              title="Titulação"
              description={user.perfilProfessor.titulacao}
              left={(props) => <List.Icon {...props} icon="school" />}
              style={styles.listItem}
            />
          )}

          {user?.perfilProfessor?.areaEspecializacao && (
            <List.Item
              title="Área de Especialização"
              description={user.perfilProfessor.areaEspecializacao}
              left={(props) => <List.Icon {...props} icon="book-open-variant" />}
              style={styles.listItem}
            />
          )}
        </Card.Content>
      </Card>

      {/* Estatísticas */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <Divider style={styles.divider} />

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <MaterialIcons name="assessment" size={32} color="#6F73D2" />
              <Text style={styles.statValue}>{totalAvaliacoes}</Text>
              <Text style={styles.statLabel}>Avaliações Realizadas</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <MaterialIcons name="trending-up" size={32} color="#10B981" />
              <Text style={styles.statValue}>{mediaGeral.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Média das Notas</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Sobre o App */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Sobre o App</Text>
          <Divider style={styles.divider} />

          <List.Item
            title="Versão do App"
            description="1.0.0"
            left={(props) => <List.Icon {...props} icon="information" />}
            style={styles.listItem}
          />

          <List.Item
            title="Sistema"
            description="PeiFeira - Avaliações Mobile"
            left={(props) => <List.Icon {...props} icon="cellphone" />}
            style={styles.listItem}
          />
        </Card.Content>
      </Card>

      {/* Botão de Logout */}
      <View style={styles.logoutContainer}>
        <Button
          mode="contained"
          onPress={handleLogout}
          icon="logout"
          style={styles.logoutButton}
          contentStyle={styles.logoutButtonContent}
        >
          Sair do App
        </Button>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerCard: {
    margin: 16,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatar: {
    backgroundColor: '#6F73D2',
    marginBottom: 16,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#6B7280',
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 12,
  },
  listItem: {
    paddingVertical: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  logoutContainer: {
    paddingHorizontal: 16,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
  },
  logoutButtonContent: {
    paddingVertical: 8,
  },
});