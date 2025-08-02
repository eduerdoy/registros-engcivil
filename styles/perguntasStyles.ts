import { StyleSheet } from 'react-native';

export const perguntasStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  textoPergunta: {
    color: 'black',
    fontSize: 16, // opcional
    marginBottom: 8, // opcional
  },
  botaoIniciar: {
    backgroundColor: 'rgb(28, 174, 204)',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },

  textoBotao: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

   modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    color: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  title:{
    color: 'white',
    backgroundColor: 'rgb(28, 174, 204)',
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    padding: 10,
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10, 
    textTransform: 'uppercase',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  perguntaContainer: {
    marginBottom: 15,
  },
  pergunta: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  botaoSalvar: {
    backgroundColor: 'rgb(28, 174, 204)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    padding: 10,
    width: '20%',
  },
  botaoAvançar: {
    backgroundColor: 'rgb(28, 174, 204)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    padding: 10,
    width: '20%',
  },
  botaoVoltar: {
    backgroundColor: 'rgb(28, 174, 204)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    padding: 10,
    width: '20%',
  },

  titleModal:{
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      padding: 10,
      width: '100%',
      textAlign: 'center',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      backgroundColor: 'rgb(28, 174, 204)',
    },
    botaoExcluir:{
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: '#e95d5dff',
      padding: 10,
      fontSize: 16,
      borderRadius: 8,
      width: 100,
      textAlign: 'center',
    },
    botaoCancelar:{
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: '#9BA1A6',
      padding: 10,
      fontSize: 16,
      borderRadius: 8,
      width: 100,
      textAlign: 'center',
    },
    botoesModal:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    top: 80,
    width: '100%',
    },
});