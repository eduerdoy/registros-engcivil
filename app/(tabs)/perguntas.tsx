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
    {
      titulo: 'Demanda e consumo',
      perguntas: [
        'Média diária de consumo por habitante (em L/hab.dia), segmentado por tipo de uso (residencial, rural, industrial)',
        'Cálculo da demanda total (população x consumo per capita)',
        'Aumento/redução em meses secos ou chuvosos (em %)',
        'Razão entre consumo do dia mais alto e o consumo médio)',
        'Razão entre maior vazão horária e média diária do dia de pico',
      ]
    },
    {
      titulo: 'Cobertuda da rede',
      perguntas: [
        "Comprimento total da rede existente (em km)",
        "% da população urbana atendida pela rede",
        "PVC, ferro fundido, PEAD, etc.",
        "Em anos (útil para avaliar risco de perdas e manutenção)",
        "Frequência de rompimentos, vazamentos, reclamações",
      ]
    },
    {
      titulo: 'Tarifação',
      perguntas: [
        "Modelo adotado: progressiva, fixa, subsidiada, por faixa de consumo",
        "Valor cobrado por m³ para consumo médio (ex: 10 m³/mês)",
        "Valor reduzido ou subsídio para baixa renda",
        "Valor fixo mínimo por ligação (independentemente do consumo)",
        "% de usuários em atraso ou inadimplentes permanentes",
      ]
    },
    {
      titulo: 'Indicadores técnicos e econômicos',
      perguntas: [
        "% de água produzida que não é faturada (perdas físicas + comerciais)",
        "Vazamentos, rompimentos — % estimada",
        "Fraudes, erros de medição — % estimada",
        "Custo médio de tratamento, adução e distribuição por metro cúbico (R$/m³)",
        "Gasto anual com consertos, materiais e mão de obra",
      ]
    },
    {
      titulo: 'Gestão do sistema',
      perguntas: [
       "Prestador do serviço: municipal, estadual (ex: CAESA), privado, consórcio",
        "Total de operadores e técnicos no sistema local",
        "% da receita orçada efetivamente arrecadada",
        "O sistema depende de repasses externos para operar? (Sim/Não – justificar)",
      ]
    },
    {
      titulo: 'Expansão e investimentos',
      perguntas: [
        "Com base na população futura e crescimento per capita estimado",
        "Extensão necessária para universalizar o acesso (em km)",
        "Valores planejados ou já encaminhados a órgãos financiadores (ex: FUNASA, BNDES)",
        "Convênios disponíveis, limites de crédito, programas habitacionais ou de saneamento",
      ]
    },
    {
      titulo: 'Localização',
      perguntas: [
        "Latitude, longitude e altitude em cada ponto relevante (captação, ETA, reservatórios, adução)",
"Ex: SIRGAS 2000, UTM, SAD69",
"Delimitação espacial (croqui, planta, shapefile, etc.)",

      ]
    },
    {
      titulo: 'Altimetria',
      perguntas: [
"Cota do terreno natural em cada ponto relevante (m); necessário para cálculo de carga hidráulica",
"Desnível entre manancial e reservatórios/ETA",
"Curvas de nível ou seções longitudinais de adutoras/canais",
      ]
    },
    {
      titulo: 'Planimetria',
      perguntas: [
"Distância entre os elementos do sistema (captação-ETA, ETA-reservatórios)",
"Rotas possíveis, obstáculos, tipo de terreno atravessado",
"Presença de estradas, linhas de transmissão, redes subterrâneas",
      ]
    },
    {
      titulo: 'Hidrografia',
      perguntas: [
"Rios, igarapés, lagos, canais próximos da obra (com nome e classe, se possível)",
"Identificação de áreas sujeitas a inundações (níveis históricos)",
"Trecho reto ou de baixa turbulência do rio; margem direita/esquerda",
      ]
    },
    {
      titulo: 'Uso de ocupação do solo',
      perguntas: [
"Urbano, rural, agrícola, florestal, APP, industrial",
"Áreas de Preservação Permanente conforme legislação vigente",
"Zonas previstas no plano diretor do município",
      ]
    },
    {
      titulo: 'acessibilidade de logística',
      perguntas: [
"Vias de acesso (estradas, vicinais, pontes, servidões de passagem)",
"Solo rochoso, argiloso, arenoso, brejo, declividade",
"Energia elétrica, rede de água existente, área disponível para canteiro de obras",
      ]
    },
    {
      titulo: 'Base cartográfica',
      perguntas: [
"Cartas topográficas, imagens aéreas, levantamento por drone ou estação total",
"Ex: 1:10.000, 1:25.000, 1:50.000 (mínimo recomendado para áreas urbanas: 1:10.000 ou mais detalhado)",
"Tipo de equipamento utilizado e margem de erro admitida (ex: ±0,30 m)",
      ]
    },
    {
      titulo: 'geotecnia (se aplicável)',
      perguntas: [
"Identificação de camadas, resistência, presença de aquífero freático",
"Sondagens SPT, ensaios de permeabilidade, relatórios geotécnicos",
      ]
    },
    {
      titulo: 'identificação',
      perguntas: [
"Nome oficial ou local do rio, igarapé, lago, poço ou nascente utilizado ou previsto para captação",
"Superficial (rio, lago, reservatório) ou subterrâneo (poço tubular, surgência natural)",
"Coordenadas UTM ou latitude/longitude do ponto de captação (referência geodésica utilizada)",
"Nome da bacia e sub-bacia, órgão responsável pelo monitoramento (ANA, CPRM, etc.)",
"Conforme Resolução CONAMA nº 357/2005 (Classe 1, 2, 3 ou especial)",
      ]
    },
    {
      titulo: 'vazão e disponibilidade hídrica',
      perguntas: [
"Média histórica do fluxo (m³/s ou L/s), obtida de séries temporais (mínimo 10 anos se possível)",
"Vazão de referência para dimensionamento legal e outorga (normalmente Q7,10 para superficial)",
"Vazão de cheia (importante para avaliar risco de submersão da estrutura)",
"Volume sustentável de retirada diária, semanal ou mensal",
"Número da outorga, volume autorizado e prazo de validade (órgão outorgante estadual ou ANA)",
      ]
    },
    {
      titulo: 'qualidade da água',
      perguntas: [
"Turbidez, cor aparente, pH, condutividade, temperatura, sólidos totais, ferro, manganês, amônia, nitrato etc.",
"Coliformes totais, E. coli, bactérias heterotróficas, etc.",
"Histórico de coleta: pontual, semanal, mensal, sazonal? (para fins de comparação)",
"Indústria, esgoto doméstico, agroquímicos, mineração, resíduos sólidos, etc. na bacia de contribuição",
      ]
    },
    {
      titulo: 'condições ambientais',
      perguntas: [
"Percentual de cobertura vegetal, urbanização, agricultura, áreas degradadas ou de APPs",
"Avaliação técnica da vulnerabilidade: lixões, fossas, postos de combustíveis, esgotos, etc.",
"Presença de sedimentos em suspensão, desmatamento de margens, obras irregulares, etc.",
"Diferença significativa de nível e vazão entre período seco e chuvoso",
      ]
    },
    {
      titulo: 'poços (para mananciais subterrâneos)',
      perguntas: [
"Nível da água em repouso (medido em metros desde a superfície do terreno)",
"Nível durante bombeamento a uma determinada vazão",
"Vazão considerada sustentável após ensaio de bombeamento (curva vazão x rebaixamento)",
"Condutividade, dureza, pH, presença de metais, cloretos, sulfatos, etc.",
"Distância e interferência com outros poços na área (efeito de cone de depressão)",
      ]
    },
    {
      titulo: 'infraestrutura de captação',
      perguntas: [
"Captação flutuante, fixa, por galeria filtrante, por poço tubular, vertente, etc.",
"Estrutura de proteção contra vandalismo, fauna, inundação, contaminação (cercas, barreiras, selo sanitário, etc.)",
"Condição de acesso à estrutura de captação em campo (via, ponte, passarela, trilha)",
"Em operação, desativada, abandonada, em colapso, intermitente, etc.",
      ]
    },
    {
      titulo: 'características físicas',
      perguntas: [
"Área em m²/ha ocupada pela captação, adução, ETA, reservatórios, etc.",
"Plano, ondulado, montanhoso, áreas sujeitas a escorregamento",
"Arenoso, argiloso, latossolo, presença de laterita, estabilidade",
"Áreas de Preservação Permanente (ex: margens de rios, nascentes, topos de morros) conforme Lei 12.651/12",
"Unidades de Conservação próximas (APA, REBIO, RPPN, etc.)",
"Presença de corpos hídricos próximos e sensíveis ao impacto (riachos, igarapés, lagoas)",
      ]
    },
    {
      titulo: 'qualidade ambiental local',
      perguntas: [
"Espécies registradas ou observadas na área de influência direta e indireta (com destaque para espécies ameaçadas)",
"Tipo de vegetação predominante, espécies nativas, exóticas, ou ameaçadas",
"Grau de conectividade ecológica da área afetada",
"Terras indígenas, quilombolas, comunidades tradicionais, pesca artesanal",
      ]
    },
    {
      titulo: 'fontes ambientais de impacto',
      perguntas: [
"Área em m²/ha que será desmatada, tipo de vegetação suprimida",
"Lançamento de rejeitos líquidos ou sólidos na construção ou operação",
"Resíduos da obra: materiais de construção, restos de tubulação, lodo de limpeza de ETA",
"Possíveis fontes: derramamento de combustíveis, produtos químicos (coagulantes, cloro, etc.), esgoto",
"Ruídos e poeira gerados nas fases de construção e operação",
"Intervenções em áreas desprotegidas, movimentação de solo, taludes",
      ]
    },
    {
      titulo: 'Licenciamento ambiental',
      perguntas: [
"Verificar exigência conforme porte e localização, junto ao órgão ambiental (Ex: SEMA/APA, IBAMA, IMAP/AP)",
"Licença Prévia (LP), Licença de Instalação (LI), Licença de Operação (LO)",
"Nome e esfera do órgão licenciador: municipal, estadual ou federal",
"Ex: outorga de uso da água, supressão vegetal, anuência de UC, autorização de trânsito de máquinas, etc.",
      ]
    },
    {
      titulo: 'avaliação da sensibilidade ambiental',
      perguntas: [
"Alta, média ou baixa sensibilidade ambiental (baseada em uso do solo, biodiversidade, importância hidrológica, presença de APP/UC)",
"Limites definidos para avaliação de impactos diretos (mapeados em planta georreferenciada)",
"Abrangência dos impactos indiretos (ex: comunidades no entorno, desvio de cursos d’água)",
      ]
    },
    {
      titulo: 'medidas mitigradoras/compensatórias',
      perguntas: [
"Medidas para minimizar impactos durante a construção e operação (controle de erosão, revegetação, isolamento de áreas sensíveis)",
"Monitoramento da fauna, flora, qualidade da água, ruído, resíduos, etc.",
"Reflorestamento, doação de área, compensação florestal, etc.",
"Realização de audiências públicas, consultas ou outras formas de participação social",
      ]
    },
    {
      titulo: 'sistemas existentes',
      perguntas: [
"Levantamento completo das instalações atuais de abastecimento de água: adutoras, captações, ETAs, reservatórios e redes. Registrar as partes que podem ser aproveitadas, adaptadas ou descartadas, justificando tecnicamente.",  
      ]
    },
    {
      titulo: 'compatibilidade',
      perguntas: [
      "Análise da integração física e operacional entre as partes do sistema. Verificar se a combinação entre as partes garante: Abastecimento contínuo; Qualidade da água tratada; Eficiência energética e operacionall",
      ]
    },
    {
      titulo: 'método de operação',
      perguntas: [
      "Definir como será operado cada órgão do sistema. Avaliar também os meios de alerta e redundância, em especial para falhas críticas (falha de bomba, falta de energia, transbordamento)",
      ]
    },
    {
      titulo: 'Etapas de inplantação',
      perguntas: [
      "Definir as fases de execução do sistema",
      ]
    },
    {
      titulo: 'Viabilidade econômico-financeira',
      perguntas: [
      "Avaliar se o sistema proposto é financeiramente viável",
      ]
    },
    {
      titulo: 'Compatibilidade entre partes',
      perguntas: [
      "Verificar se as partes projetadas são tecnicamente compatíveis ao longo do tempo, mesmo com crescimento da população. Avaliar também a resiliência do sistema bem como flexibilidade para ampliações e plano de contigêngcia.",
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
  }

  setModalVisible(false);
  setRespostas({});
  setStepEixo(0);

  
};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoIniciar} 
        onPress={() => {
        setModalVisible(true);
        }}>
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
          onPress={() => 
            setModalSair(true)
            }>
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

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20,
              
              }}>
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
                      onPress={() => {setModalSair(false)
                      }}
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
