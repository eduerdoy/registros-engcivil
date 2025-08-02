import { perguntasStyles as styles } from '@/styles/perguntasStyles';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

  export const eixos = [
    {
      titulo: 'Área de estudo',
      perguntas: [
        'Município',
        'Estado',
        'Data da visita',
        'Localização',
        'Latitude',
        'Longitude',
      ]
    },
    {
      titulo: 'Condições gerais',
      perguntas: [
        'Contexto econômico da área de estudo',
        'Configuração topográfica',
        'Condições geológicas',
        'População predominante (residente, flutuante, temporária)',
        'População (quantidade de habitantes)',
        'ETA existente (sim: caracteríscticas, não)',
        'Possível local de implantação (coordenadas)',
        'Impacto ambiental (leve, intermediário, grave)',
      ]
    },
    {
      titulo: 'Demografia',
      perguntas: [
        'Total de habitantes na área de influência direta',
        'Total de habitantes flutuantes na AID',
        'Total de habitantes temporárias na AID',
        'Crescimento estimado com base em tendências do IBGE ou órgãos municipais',
        'Hab/km² (área urbana, rural e de expansão)',
        'Média anual dos últimos 10 anos',
        'Percentual de crianças, adultos e idosos',
      ]
    },
    {
      titulo: 'Condições sociais',
      perguntas: [
        'Média de anos de estudo ou percentuais por faixa (fundamental, médio, superior)',
        'Percentual da população acima de 15 anos que sabe ler e escrever',
        'Presença de redes de água, esgoto, energia, pavimentação',
        'Alvenaria, madeira, palafita, etc.',
        '% da população com acesso à água potável e esgoto tratado',
      ]
    },
    {
      titulo: 'Condições econômicas',
      perguntas: [
        'Média mensal por domicílio (em R$)',
        'Agricultura, comércio, indústria, pesca, funcionalismo público, etc.',
        'Estimativa ou dados oficiais',
        'Se houver (IVS, IPM, ou outro índice municipal/estadual)',
      ]
    },
    {
      titulo: 'Saúde pública',
      perguntas: [
        'Taxa de doenças de veiculação hídrica (diarreias, hepatites, verminoses)',
        '% da população atendida por UBS, PSF, agentes comunitários',
      ]
    },
    {
      titulo: 'Aspectos territoriais',
      perguntas: [
        'Definição de limites, expansão urbana prevista, áreas de proteção permanente (APPs)',
        'Favelas, áreas invadidas ou sem regularização fundiária',
        'Presença de fluxos migratórios recentes (chegada ou saída)',
      ]
    },
    {
      titulo: 'Participação pública',
      perguntas: [
        'Expectativas da população quanto ao projeto (levantadas por entrevistas, audiências públicas, etc.)',
      ]
    },
  ];

export default function Perguntas() {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalSair, setModalSair] = useState(false);
  const [respostas, setRespostas] = useState<{ [key: string]: string }>({});
  const [stepEixo, setStepEixo] = useState(0);

  
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

  function aplicarMascaraData(texto: string) {
    // Remove tudo que não for número
    let cleaned = texto.replace(/\D/g, '');

    // Limita a 6 dígitos (ddmmaaaa ou ddmmaa)
    cleaned = cleaned.slice(0, 8);

    // Aplica a máscara dd/mm/aa
    if (cleaned.length >= 5) {
      return cleaned.replace(/(\d{2})(\d{2})(\d{0,2})/, '$1/$2/$3');
    } else if (cleaned.length >= 3) {
      return cleaned.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    }
    return cleaned;
  }

   const eixoAtual = eixos[stepEixo];

  const handleRespostaChange = (perguntaTitulo: string, text: string) => {
    setRespostas(prev => ({...prev, [perguntaTitulo]: text})); // Usa 'perguntaTitulo' como chave
  }

  const salvarRegistro = async () => {

  const novoRegistro = {
    id: Date.now(),
    ...respostas 
  };

  try {
    const registrosAtuais = JSON.parse(await AsyncStorage.getItem('registros') || '[]');
    registrosAtuais.push(novoRegistro);
    await AsyncStorage.setItem('registros', JSON.stringify(registrosAtuais));
  } catch (e) {
    alert('Erro ao salvar registro');
  }

  setModalVisible(false);
  setRespostas({});
  setStepEixo(0);

  
};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoIniciar} onPress={() => setModalVisible(true)}>
        <Text style={styles.textoBotao}>Iniciar registro</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.title}>{eixoAtual.titulo}</Text>
          <TouchableOpacity 
          style={{ position: 'absolute', right: 10}}
          onPress={() => setModalSair(true)}>
            <AntDesign  
            style={{ fontWeight: 'bold' }}
            name="close" size={24} color="white" />
          </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <ScrollView>
              {eixoAtual.perguntas.map((pergunta, index) => (
                <View key={index} style={styles.perguntaContainer}>
                  <Text style={styles.pergunta}>{pergunta}</Text>
                  <TextInput
                    style={styles.input}
                    value={respostas[pergunta] || ''}
                    onChangeText={texto => {
                    if (pergunta.toLowerCase().includes('data')) {
                      const mascarado = aplicarMascaraData(texto);
                      handleRespostaChange(pergunta, mascarado);
                    } else {
                      handleRespostaChange(pergunta, texto);
                    }
                  }}
                  keyboardType={pergunta.toLowerCase().includes('data') ? 'numeric' : getKeyboardType(pergunta)}
                  maxLength={10 + 2}
                  />
                </View>
              ))}

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                {stepEixo > 0 ? (
                  <TouchableOpacity style={styles.botaoVoltar} onPress={() => setStepEixo(stepEixo - 1)}>
                    <Text style={styles.textoBotao}>
                      <AntDesign size={20} name="left" color={'white'} />
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{ width: 48 }} />
                )}
                {stepEixo < eixos.length - 1 ? (
                  <TouchableOpacity style={styles.botaoAvançar} onPress={() => setStepEixo(stepEixo + 1)}>
                    <Text style={styles.textoBotao}>
                      <AntDesign size={20} name="right" color={'white'} />
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.botaoSalvar} onPress={salvarRegistro}>
                    <Text style={styles.textoBotao}>
                      <AntDesign size={20} name="save" color={'white'} />
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      
      <Modal style={styles.modalContainer}
              visible={modalSair}
              transparent
              animationType="slide"
              onRequestClose={() => setModalSair(true)}
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
                  height: '24%',
                  borderRadius: 8,
                  alignItems: 'center'
                }}>
                  <Text style={styles.titleModal}>Deseja sair?</Text>
                  <View style={styles.botoesModal}>
                    <TouchableOpacity
                      onPress={() => setModalSair(false)}
                    >
                      <Text style={styles.botaoCancelar}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {
                      setModalSair(false);
                      setModalVisible(false);
                    }}
                    >
                      <Text style={styles.botaoExcluir}>Sair</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
      </Modal>

    </View>
  );
}
