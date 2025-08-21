import { registrosStyles as styles } from '@/styles/registrosStyles';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useCallback, useState } from 'react';
import { FlatList, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { eixos } from './perguntas';


interface Registro {
  id?: number | string;
  Município: string;
  Estado: string;
  'Data da visita': string;
}

export default function Registros() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [registroParaApagar, setRegistroParaApagar] = useState<number | string | null>(null);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [registroEditando, setRegistroEditando] = useState<any>(null);
  const [respostasEdicao, setRespostasEdicao] = useState<{ [key: string]: string }>({});


  function getKeyboardType(pergunta: string) {
  if (
    pergunta.toLowerCase().includes('latitude') ||
    pergunta.toLowerCase().includes('longitude') ||
    pergunta.toLowerCase().includes('quantidade') ||
    pergunta.toLowerCase().includes('total') ||
    pergunta.toLowerCase().includes('média') ||
    pergunta.toLowerCase().includes('percentual') ||
    pergunta.toLowerCase().includes('r$') ||
    pergunta.toLowerCase().includes('%') ||
    pergunta.toLowerCase().includes('km²')
  ) {
    return 'numeric';
  }
  return 'default';
}

const salvarEdicao = async () => {
  try {
    const registrosAtuais = JSON.parse(await AsyncStorage.getItem('registros') || '[]');
    const index = registrosAtuais.findIndex((r: Registro) => r.id === registroEditando.id);
    
    if (index !== -1) {
      registrosAtuais[index] = { ...registroEditando, ...respostasEdicao };
      await AsyncStorage.setItem('registros', JSON.stringify(registrosAtuais));
      await carregarRegistros(); // Recarrega a lista
    }
    
    setModalEditarVisible(false);
    setRegistroEditando(null);
    setRespostasEdicao({});
  } catch (e) {
    alert('Erro ao salvar edição');
  }
};

function aplicarMascaraData(texto: string) {
  let cleaned = texto.replace(/\D/g, '');
  cleaned = cleaned.slice(0, 8);
  
  if (cleaned.length >= 5) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{0,2})/, '$1/$2/$3');
  } else if (cleaned.length >= 3) {
    return cleaned.replace(/(\d{2})(\d{0,2})/, '$1/$2');
  }
  return cleaned;
}

  const confirmarApagar = (id: number | string) => {
  setRegistroParaApagar(id);
  setModalVisible(true);
  };

  const carregarRegistros = async () => {
    try {
      const dados = await AsyncStorage.getItem('registros');
      if (dados !== null) {
        const parsed = JSON.parse(dados);
        console.log('Registros carregados do AsyncStorage:', parsed.reverse());
        setRegistros(parsed);
      }
    } catch (erro) {
      console.error('Erro ao carregar registros:', erro);
    }
  };

  const apagarRegistro = async (id: number | string) => {
  try {
    const dados = await AsyncStorage.getItem('registros');
    const lixeira = JSON.parse(await AsyncStorage.getItem('lixeira') || '[]');
    if (dados !== null) {
      const registrosAtuais: Registro[] = JSON.parse(dados);
      const novosRegistros = registrosAtuais.filter(reg => reg.id !== id);
      const registroRemovido = registrosAtuais.find(reg => reg.id === id);
      if (registroRemovido) {
        lixeira.push(registroRemovido);
        await AsyncStorage.setItem('lixeira', JSON.stringify(lixeira));
      }
      await AsyncStorage.setItem('registros', JSON.stringify(novosRegistros));
      setRegistros(novosRegistros);

    }
  } catch (erro) {
    console.error('Erro ao apagar registro:', erro);
  }
};

async function compartilharPDF(registro: any) {
  const camposPrincipais = [
    { label: 'Município', key: 'Município' },
    { label: 'Estado', key: 'Estado' },
    { label: 'Data da visita', key: 'Data da visita' },
    { label: 'Localização', key: 'Localização' },
    { label: 'Lagitude', key: 'Latitude' },
    { label: 'Longitude', key: 'Longitude' },
  ];

  const html = `
    <html>
      <head>
        <style>
          @page { margin: 24px; padding: 20px}
          body { font-family: Arial, Helvetica, sans-serif; color: #222; padding: 20px; }
          h1 { text-align: center; color: #1caecc; margin-bottom: 25px; }
          h2 {
          background: #1caecc;
          color: white;
          border-radius: 8px;
          padding: 12px 0;
          margin: 32px 0 16px 0;
          text-align: center;
          width: 100%;
          display: block;
          font-size: 1.2em;
          letter-spacing: 1px;
        }
          .perguntas { display: flex; flex-wrap: wrap; gap: 16px; }
          .campo {
            flex: 1 1 45%;
            min-width: 220px;
            margin: 8px 0;
            background: #f7fafc;
            border-radius: 6px;
            padding: 8px 12px;
            box-sizing: border-box;
          }
          .label { font-weight: bold; color: #1caecc; }
          .resposta { color: #444; margin-left: 4px; }
        </style>
      </head>
      <body>
        <h1>Registro de Pesquisa</h1>
        ${eixos.map(eixo => `

          <h2>${eixo.titulo}</h2>
          <div class="perguntas">
            ${eixo.perguntas.map(pergunta => `
              <div class="campo">
                <span class="label">${pergunta}:</span>
                <span class="resposta">${registro[pergunta] ?? '-'}</span>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </body>
    </html>
  `;
  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri);
}

  useFocusEffect(
  useCallback(() => {
    carregarRegistros();
  }, [])
);


  const renderItem = ({ item }: { item: Registro }) => (
    <View style={styles.cards}>
      <Text style={styles.cardTitle}>
        {item.Município}/{item.Estado} - {item['Data da visita']}
      </Text>
      <TouchableOpacity style={styles.clickToView}
      onPress={() => {
  setRegistroEditando(item);
  const { id, ...respostas } = item;
  const respostasString = Object.fromEntries(
    Object.entries(respostas).map(([key, value]) => [key, String(value || '')])
  );
  setRespostasEdicao(respostasString);
  setModalEditarVisible(true);
}}>
        <Text style={styles.clickToViewText}><AntDesign name="eyeo" size={24} color="#687076" /></Text>
        <Text style={styles.clickToViewText}> / </Text>
        <Text style={styles.clickToViewText}><AntDesign name="edit" size={24} color="#687076" /></Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ position: 'absolute', top: 8, right: 10 }}
      onPress={() => confirmarApagar(item.id!)}
    >
      <AntDesign name="delete" size={24} color="white" />
    </TouchableOpacity>

    <TouchableOpacity
    style={{ position: 'absolute', bottom: 10, right: 10 }}
    onPress={() => compartilharPDF(item)}
  >
    <AntDesign name="export" size={24} color="#687076" />
    </TouchableOpacity>

    </View>
  );

  return (
  <View style={styles.container}>
    <FlatList
      data={registros}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      renderItem={renderItem}
    />
    
    {/* Modal de confirmação para deletar */}
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
          <Text style={styles.titleModal}>Deseja mover para a lixeira?</Text>
          <View style={styles.botoesModal}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.botaoCancelar}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                if (registroParaApagar !== null) {  
                  await apagarRegistro(registroParaApagar);
                  setModalVisible(false);
                  setRegistroParaApagar(null);
                  carregarRegistros();
                }
              }}
            >
              <Text style={styles.botaoExcluir}>Mover</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

{/* Modal de edição */}
<Modal
  animationType="slide"
  transparent={true}
  visible={modalEditarVisible}
>
  <View style={styles.modalContainer}>
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      backgroundColor: '#1caecc'
    }}>
      <View style={{flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.title}>Editar registro</Text>
          <TouchableOpacity 
          style={{ position: 'absolute', right: 10}}
          onPress={() => setModalEditarVisible(false)}>
            <AntDesign  
            style={{ fontWeight: 'bold' }}
            name="close" size={24} color="white" />
          </TouchableOpacity>
     </View>     
    </View>

    {/* Conteúdo */}
    <View style={styles.modalContent}>
      <ScrollView style={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        {eixos.map(eixo => (
          <View key={eixo.titulo}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 16,
              
              borderRadius: 8,
              textAlign: 'center',
              backgroundColor: '#1caecc',
              padding: 8,
              
            }}>
              {eixo.titulo}
            </Text>
            
            {eixo.perguntas.map((pergunta, index) => (
              <View key={index} style={{ marginBottom: 16 }}>
                <Text style={styles.pergunta}>
                  {pergunta}
                </Text>
                <TextInput
                  style={styles.input}
                  value={respostasEdicao[pergunta] || ''}
                  onChangeText={texto => {
                    if (pergunta.toLowerCase().includes('data')) {
                      const mascarado = aplicarMascaraData(texto);
                      setRespostasEdicao(prev => ({ ...prev, [pergunta]: mascarado }));
                    } else {
                      setRespostasEdicao(prev => ({ ...prev, [pergunta]: texto }));
                    }
                  }}
                  keyboardType={pergunta.toLowerCase().includes('data') ? 'numeric' : getKeyboardType(pergunta)}
                  maxLength={pergunta.toLowerCase().includes('data') ? 10 : undefined}
                  multiline={pergunta.length > 50}
                  numberOfLines={pergunta.length > 50 ? 3 : 1}
                />
              </View>
            ))}
          </View>
        ))}
        
        {/* Espaçamento final */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Botão fixo no rodapé */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 16,
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#1caecc',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center'
          }}
          onPress={salvarEdicao}
        >
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold'
          }}>
          
          <AntDesign size={28} name="save" color={'white'} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

  </View>
);
}