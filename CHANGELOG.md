# CHANGELOG

Todas mudanças notáveis entre versões serão documentadas nesse arquivo.

## v0.0.10b 27/01/2022

### Adicionado

- Knob virtual para controle da intensidade de estimulação
- Componentização das telas de `Treatment.tsx` e `AddProtocolParameters.tsx` para melhorar 
perfomance e melhorar controle sober as renderizações da UI
- Ajustes de ADM Passiva, gráifco perdendo ordem de estímulos. Adiciona intensidade
inicial e alvo no app e no vision

## v0.5 27/01/2022

### Adicionado

- Som e vibração nos botões de aumentar e diminuir a intensidade do canal
- Telas de pré e pós tratamento integradas ao reducer
- Add serviço de write e read no armazenamento interno

## v0.4 06/01/2020

### Adicionado

- Novas telas de Seleção de Eletrodos e Tratamento
- Monitoramente de conexão à internet, com barra de status mostrando no header
- Add estado global ao aplicativo via Redux
- Add base do serviço de Bluetooth no app, com `read`, `write` e `scan`

### Alterado

- Meio do controle de sessão alterado de AsyncStorage para Redux-persist
- Componente `AppHeader` para o header do app, não usa mais o Header padrão do Navigator

### Removido

- Remove tela de estimulação avançada

## v0.2 10/12/2021

### Adicionado

- Criação do arquivo IPA para distribuição em iOS
- Novo fluxo para criação de protocolo
- Diferenciação dos tipos de usuário `Expert`, `Professional` e `Paciente`
- Adiciona `AsyncStorage` para controle de sessão
- Adiciona parâmetros default para cada tipo de protocolo padrão
- Organização dos tipos do app em `src/Types`

### Alterado

- Adapta tela de bluetooth para avançar sem conexão bluetooth
- Otimização dos `setState` do projeto
- Correções de responsividade

### Removido

- Remove calendário (date-picker) dos inputs de data de nascimento

## v0.1 17/11/2021

### Adicionado

- Criado `CHANGELOG.md`
- Inicia a partir do boilerplate https://github.com/thecodingmachine/react-native-boilerplate 
- Criação das telas
- Criação de componentes base para padronização
- Instalação dos pacotes e bibliotecas do projeto via `yarn`
- Configuração de build para Android (apk)
- Padronização do estilo de código via `prettier`, `eslint` e `editorconfig`

### Alterado

- Refatoração e reorganização de arquivos vindos do boilerplate
- Refatora `Containers` para `Screens`

### Removido

- Arquivos e imagens padrão do boilerplate
