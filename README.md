# App para registro de pesquisas de campo - UNIFAP

App desenvolvido sob demanda para alunos do curso de engenharia civil da UNIFAP, como um facilitador de registro de pesquisas de campo.

## Funcionalidades

### Tab "Perguntas"
- Inicie um novo registro para salvar as informações de uma pesquisa de campo
- Salve o registro clicando no botão ao finalizar

### Tab "Registros"
Cards das suas pesquisas salvas com as seguintes opções:
- Ícone central: Ver e/ou editar as respostas
- Ícone superior: Mover para a lixeira
- Ícone inferior: Exportar o registro como PDF

### Tab "Lixeira"
Gerencia os registros movidos:
- Restaurar registros
- Apagar definitivamente

## Como configurar o projeto

1. Clone o repositório
```bash
git clone https://github.com/eduerdoy/registros-engcivil.git
cd pesquisa-campo
```

2. Instale as dependências
```bash
npm install
```

3. Para desenvolvimento
```bash
npx expo start
```
- Instale o Expo Go no seu celular
- Escaneie o QR Code que aparece no terminal

4. Para gerar o APK (Opcional)
```bash
# Instale o EAS CLI globalmente
npm install -g eas-cli

# Faça login no Expo
eas login

# Gere o APK
eas build -p android --profile preview
```

## Arquivos necessários não versionados

Para gerar o APK, você precisará dos seguintes arquivos (solicite ao mantenedor do projeto):
- `my-upload-key.keystore` - Keystore para build Android

## Estrutura do Projeto

- `/app` - Código fonte da aplicação
- `/assets` - Imagens e outros recursos
- `/components` - Componentes React reutilizáveis
- `/contexts` - Contextos do React
- `/hooks` - Custom hooks
- `/styles` - Estilos globais

## Observações

As perguntas são específicas para o curso de engenharia civil e só podem ser modificadas alterando o código fonte.

## Contato

Para obter os arquivos necessários ou tirar dúvidas, entre em contato com o mantenedor do projeto.
