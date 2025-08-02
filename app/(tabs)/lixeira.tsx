import { lixeiraStyles as styles } from '@/styles/lixeiraStyles';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

interface Registro {
  id: number | string;
  [key: string]: any;
}

export default function Lixeira() {
  const [lixeira, setLixeira] = useState<Registro[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [registroParaExcluir, setRegistroParaExcluir] = useState<number | string | null>(null);

  const carregarLixeira = async () => {
    const dados = await AsyncStorage.getItem('lixeira');
    setLixeira(dados ? JSON.parse(dados) : []);
  };

  useFocusEffect(
    useCallback(() => {
      carregarLixeira();
    }, [])
  );

  const restaurarRegistro = async (registro: Registro) => {
    const registros = JSON.parse(await AsyncStorage.getItem('registros') || '[]');
    const novaLixeira = lixeira.filter(item => item.id !== registro.id);
    registros.push(registro);
    await AsyncStorage.setItem('registros', JSON.stringify(registros));
    await AsyncStorage.setItem('lixeira', JSON.stringify(novaLixeira));
    await carregarLixeira();
  };

  const excluirDefinitivo = async (id: number | string) => {
    const novaLixeira = lixeira.filter(item => item.id !== id);
    await AsyncStorage.setItem('lixeira', JSON.stringify(novaLixeira));
    await carregarLixeira();
  };

  const renderItem = ({ item }: { item: Registro }) => (
    <View style={{
      backgroundColor: '#f7fafc',
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <View>
        <Text style={{ fontWeight: 'bold', color: '#1caecc', fontSize: 16 }}>
          {item.Município || '-'} / {item.Estado || '-'}
        </Text>
        <Text style={{ color: '#687076' }}>{item['Data da visita'] || '-'}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <TouchableOpacity onPress={() => restaurarRegistro(item)}>
          <AntDesign name="reload1" size={24} color="#1caecc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setRegistroParaExcluir(item.id);
          setModalVisible(true);
        }}>
          <AntDesign name="delete" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={lixeira}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      <Modal
        style={styles.modalContainer}
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: 'white',
            width: '70%',
            height: '27%',
            borderRadius: 8,
            alignItems: 'center'
          }}>
            <Text style={styles.titleModal}>Deseja excluir definitivamente?</Text>
            <View style={styles.botoesModal}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.botaoCancelar}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  if (registroParaExcluir !== null) {
                    await excluirDefinitivo(registroParaExcluir);
                    setModalVisible(false);
                    setRegistroParaExcluir(null);
                  }
                }}
              >
                <Text style={styles.botaoExcluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}