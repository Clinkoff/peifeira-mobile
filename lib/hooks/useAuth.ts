// lib/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { authApi } from '@/lib/api/authApi';
import { storage } from '../utils/storage';
import type { Usuario, LoginRequest } from '@/lib/types'; // ← Importar dos types corretos

export function useAuth() {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!isLoading) {
      if (!user && !inAuthGroup) {
        router.replace('/login');
      } else if (user && inAuthGroup) {
        router.replace('/');
      }
    }
  }, [user, segments, isLoading]);

  const loadUser = async () => {
    try {
      const savedUser = await storage.getUser();
      if (savedUser) {
        setUser(savedUser);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginRequest) => {
    try {
      const response = await authApi.login(data);
      
      // // Verificar se é professor
      // if (response.usuario.role !== 'Professor') {
      //   throw new Error('Apenas professores podem acessar este aplicativo');
      // }

      await storage.saveToken(response.token);
      await storage.saveUser(response.usuario);
      setUser(response.usuario);
      
      router.replace('/');
    } catch (error: any) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const logout = async () => {
    await storage.clear();
    setUser(null);
    router.replace('/login');
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}