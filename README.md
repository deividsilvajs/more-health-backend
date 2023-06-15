## Sobre

Backend do programa [More Health](https://github.com/deividsilvajs/more-health).

## Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como usar](#como-usar)

## Requisitos

- Possuir o Node.js instalado na sua máquina.

- Possuir um banco de dados no Mongo DB.

## Instalação

Abra o terminal no diretório de sua preferência e execute os seguintes comandos:

```bash
git clone https://github.com/deividsilvajs/more-health-backend
cd more-health-backend
npm install
```

## Configuração

Antes de executar o programa, você precisa configurar a conexão com o banco de dados. Siga as etapas abaixo:

1. Crie um arquivo `.env` na raiz do diretório do projeto.

2. Abra o arquivo `.env` em um editor de texto e adicione a seguinte variável:

DB_CONNECTION = [seu link de conexão com o banco de dados]  

3. Substitua `[seu link de conexão com o banco de dados]` pelo link de conexão com o seu banco de dados. Por exemplo:

DB_CONNECTION = mongodb://localhost:27017/my-database

4. Salve o arquivo `.env`.

Agora, a variável de ambiente está configurada e o programa está pronto para ser executado.

## Como usar

1. Abra o terminal e navegue até o diretório onde o repositório foi instalado e configurado.

2. Execute os comandos "npx tsc" e "npm start" no terminal. Isso iniciará o servidor e garantirá que esteja em execução corretamente.