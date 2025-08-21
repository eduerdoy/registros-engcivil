import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export async function salvarRegistroSimples({ municipio, estado,  data }: { municipio: string; estado: string, data: string }) {
  try {
    const registrosExistentes = await AsyncStorage.getItem('registros');
    const registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];

    const novoRegistro = {
      id: Date.now().toString(),
      municipio,
      estado,
      data,
    };

    registros.push(novoRegistro);
    await AsyncStorage.setItem('registros', JSON.stringify(registros));
  } catch (e) {
    console.error('Erro ao salvar o registro:', e);
  }
}

type PerguntasContextType = {
  respostas: any[];
  registrarResposta: (pergunta: any) => void;
};

const PerguntasContext = createContext<PerguntasContextType | null>(null);

type PerguntasProviderProps = {
  children: ReactNode;
};

export const PerguntasProvider = ({ children }: PerguntasProviderProps) => {
  const [respostas, setRespostas] = useState<any[]>([]);

  const registrarResposta = (pergunta: any) => {
    setRespostas((prev) => [...prev, pergunta]);
  };

  return (
    <PerguntasContext.Provider value={{ respostas, registrarResposta }}>
      {children}
    </PerguntasContext.Provider>
  );
};

export const usePerguntas = () => {
  const context = useContext(PerguntasContext);
  if (!context) {
    throw new Error('usePerguntas deve ser usado dentro de um PerguntasProvider');
  }
  return context;
};