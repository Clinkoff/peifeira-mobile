// app/(auth)/login.tsx
import { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { useAuth } from "@/lib/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!matricula || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    setError("");

    try {
      await login({ matricula, senha });
    } catch (err: any) {
      console.error("Erro no login:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Erro ao fazer login. Verifique suas credenciais."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>PeiFeira</Text>
            </View>
            <Text style={styles.subtitle}>Sistema de Avaliações</Text>
            <Text style={styles.description}>
              Acesso exclusivo para professores
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Matrícula"
              value={matricula}
              onChangeText={setMatricula}
              mode="outlined"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              keyboardType="default"
              style={styles.input}
              outlineColor="#DDD"
              activeOutlineColor="#6F73D2"
              disabled={isLoading}
            />

            <TextInput
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              mode="outlined"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              style={styles.input}
              outlineColor="#DDD"
              activeOutlineColor="#6F73D2"
              disabled={isLoading}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            {error && (
              <HelperText type="error" visible={!!error} style={styles.error}>
                {error}
              </HelperText>
            )}

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Problemas para acessar? Entre em contato com o coordenador.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6F73D2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  error: {
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#6F73D2",
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  footer: {
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});
