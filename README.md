# Websocket Mobile

## Instalação e Configuração do Ambiente, Passo a Passo.:gear:

### 1- Baixe o Node(14.17.1) atráves deste link: https://nodejs.org/dist/v14.17.1/node-v14.17.1-x64.msi e o Java(11.0.13) atráves deste link: https://www.oracle.com/br/java/technologies/javase/jdk11-archive-downloads.html. Faça as instalações padrões

### 2- Instale o NPM e outras ferramentas complementares atráves da propria instalação do Node

<img alt="Node" src="https://res.cloudinary.com/dds7bsyhr/image/upload/v1639598207/nodejs_r1r6wq.png">

### 3- Faça o download do Android Studio atráves deste link: https://developer.android.com/studio. Faça a instalação normalmente com os paths de instalação padrão

### 4- Abra o Android Studio na página inicial, clique em "More Actions" e em "SDK Manager"

<img alt="sdk" src="https://res.cloudinary.com/dds7bsyhr/image/upload/v1639599222/android_xuddef.png">

### 5- Marque a caixa do Android10(Q) certifique-se que a "Android SDK Platform 29" também está selecionada, depois clique em "Show Package Details" no canto inferior direito e marque as opções "Intel x86 Atom_64 System Image", "Intel x86 Atom System Image", "Google APIs Intel x86 Atom System Image" e "Google APIs Intel x86 Atom_64 System Image". Clique em aplicar e baixe os arquivos necessários. 

<img alt="android10" src="https://res.cloudinary.com/dds7bsyhr/image/upload/v1639599589/sdk_kjlpa0.png">

### 6- Clique em "SDK Tools" que fica ao lado de "SDK Plataform" em cima da tabela, clique em "Show Package Details" novamente, selecione a opção 29.0.2, clique em "Apply" e baixe os arquivos necessários. 

<img alt="sdk tools" src="https://res.cloudinary.com/dds7bsyhr/image/upload/v1639615934/sdk_tools_r31g3v.png">

### 7- Aperte o botão do windows e digite "Editar as variáveis de ambiente do sistema", selecione a opção que irá aparecer

<img alt="editar variaveis de ambiente" src="https://res.cloudinary.com/dds7bsyhr/image/upload/v1639608048/variavel_of3zqe.png">

### 8- Clique em "Variáveis de Ambiente"

<img alt="variaveis de ambiente" src="https://res.cloudinary.com/dds7bsyhr/image/upload/v1639608138/variavel_de_ambiente_ynzuwy.png">

### 9- Nas variáveis de sistema de usuario, clique em "Novo..." 

<img alt="novo" src="https://res.cloudinary.com/dds7bsyhr/image/upload/v1639616269/novo_a5vhae.png">

### 10- Em "Variable Name" escreva "ANDROID_HOME" desta exata maneira. Em "Variable Value" você devera colocar o local em que o android sdk foi instalado, que por padrão é em "C:\Users\SEU USUARIO\AppData\Local\Android\Sdk. Atenção ao nome do seu USÚARIO do PC e NÃO ESQUEÇA de dar ok

<img alt="adicionando variavel de usuario" src="https://res.cloudinary.com/dds7bsyhr/image/upload/v1639616311/android_home_hrjopu.png">

### Você também podera checar o local em que seu Android SDK foi instalado no seu Android Studio, dentro de SDK Plataforms

<img alt="local de instalação" src="https://res.cloudinary.com/dds7bsyhr/image/upload/v1639616675/local_difeqq.png">

### 11- Verifique se o ANDROID_HOME foi inserido corretamente. Abra o Power shell e digite "Get-ChildItem -Path Env:\" e veja se o ANDROID_HOME foi listado

<img alt="verificação" src="https://res.cloudinary.com/dds7bsyhr/image/upload/v1639617135/verificar_s7dovs.png">

### 12- Adicione a variável JAVA_HOME da mesma maneira que adicionou a ANDROID_HOME, porem agora em "Variáveis do Sistema' em vez de "Variáveis de Usúario" com a "Variable Value" sendo "C:\Program Files\Android\Android Studio\jre", path padrão.

<img alt="JAVA_HOME" src="https://res.cloudinary.com/dds7bsyhr/image/upload/v1639654607/JAVA_HOME_qyidk9.png">

### 13- Procure pela variável "Path", selecione ela e clique em "Editar...", clique em "Novo" e coloque o seguinte path caso tenha feito a instalação do java de maneira padrão: "C:\Program Files\Common Files\Oracle\Java\javapath". 

<img alt="Path" src="https://res.cloudinary.com/dds7bsyhr/image/upload/v1639655065/JAVA_HOME_vgshyn.png">

#### Clique em "Mover para Cima" até que a variável esteja no topo, assim como na imagem acima. Depois clique em todos os "OK"

### 14- Conecte um celular android no computador via USB, e coloque no modo de desenvolvedor do Android (a maneira de colocar no modo de desenvolvedor depende de qual versão do Android o celular  é, pesquise como fazer isso que não é muito difícil). Em seguida, abra um terminal CMD do Windows e rode o comando `adb devices`. Verifique se listou o id celular. 

#### Caso apareça que `adb não é reconhecido como um comando`, faça o seguinte procedimento: edite a variável de ambiente PATH do Sistema, adicionando o endereço completo da pasta platform-tools: C:\Users\{NOME_DE_USUARIO}\AppData\Local\Android\Sdk\platform-tools. Lembre de substituir {NOME_DE_USUARIO} pelo seu nome de usuário, por exemplo: C:\Users\Visuri\AppData\Local\Android\Sdk\platform-tools





### :computer: Iniciando o App:

```bash

# Clone esse Repositório

# Entre na pasta do projeto pelo Terminal

# Entre na Branch develop pelo git
$ git checkout develop

# Instale o yarn
$ npm install -g yarn

# Instale as dependências
$ yarn install

# caso não reconheça o yarn, rode o comando e depois tente $ yarn install denovo
$ npm install -g yarn

# Ative o modo de desenvolvedor do seu telefone, ative a depuração USB e conecte o telefone ao computador

# Execute a aplicação com esse comando
$ yarn android


```



