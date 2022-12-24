# Conversor de moedas

## Live application:

https://erick-scur-api-exchange-rates.up.railway.app/api-docs/

<br>

## Como rodar a aplicação:

<br>

### Opção 1 (Docker):

1 - Gerar uma build:

```
docker build -t exchange-rates .
```

2 - Iniciar o container:

```
docker run -p 5050:5050 .
```

### Opção 2 (Sem Docker):

1 - Instalar as dependencias:

```
npm install
```

2 - Iniciar a aplicação:

```
npm run start:prod
```

<br>

## Executando os testes automatizados:

Rodar todos os testes:

```
npm run test
```

Rodar testes unitários:

```
npm run test:unit
```

Rodar testes de integração:

```
npm run test:integration
```

<br>

## Apresentação geral da aplicação:

<br>

### Propósito:

O propósito principal no desenvolvimento desse projeto foi demonstrar meu conhecimento e habilidade no desenvolvimento de APIs REST utilizando Node e TypeScript, bem como a aplicação dos conceitos de Clean Architecture, Test Driven Development, Clean Code e S.O.L.I.D

<br>

### Features:

- Cadastrar Usuário;
- Autenticação;
- Verificação de usuário através de seu Bearer Token;
- Criptografia de senha;
- Registrar Transação;
- Consulta de taxas de conversão em serviço externo;
- Consultar Transações;
- Testes Automatizados;

<br>

### Escolha das tecnologias:

- Express: É um framework amplamente utilizado para construção de APIs REST com Node, porém, poderia ser substituido pelo Fastify;
- Prisma: Object Relational Mapper (ORM) é uma ótima ferramente para realizar a comunicação com diversos tipos de bancos de dados;
- Axios: Cliente HTTP baseado em Promise para o navegador e Node.js;
- jsonwebtoken: Lib utilizada para geração de tokens de autenticação;
- Bcrypt: Lib utilizada para realizar a criptografia e verificação de senhas;

Como foram utilizados os princípios da Clean Architecture, esse projeto pode facilmente se adaptar facilmente para utilizar qualquer tecnologia externa, por exemplo, se quisermos trocar do Express para Fastify, serão feitas poucas alterações, devido ao fato da aplicação isolar as camadas externas.

<br>

### Separação de camadas:

#### Domain:

Camada principal e mais interna da aplicação, nela que ficam as entidades, interfaces e casos de uso, nela que são definidas as regras de negócio da aplicação.

#### Presentation:

Essa camada é a parte onde acontece a interação com requisições externas. Essa camada é a porta de entrada para os efeitos que um ser humano, um aplicativo ou uma mensagem terão no domínio. As solicitações serão aceitas dessa camada e a resposta será moldada nessa camada e exibida ao usuário.

#### Data:

Camada responsável por implementar os protocolos dos casos de uso presentes na camada de domínio, nela são injetados os repositórios vindos da camada de infra para realizar a comunicação com banco de dados.

#### Infra:

Esta camada é a que acessa serviços externos, como banco de dados, sistemas de mensagens e serviços de e-mail.

#### Main:

Essa camada é responsável por instanciar as classes vindas das outras camadas, injetando as dependências e expondo as rotas da API.

<br>

## Itens desejáveis

- Logs: Com a implementação da classe LogControllerDecorator, todo erro de servidor será armazenado em uma tabela de logs no banco de dados.
- Tratamento de exceções: O tratamento de erros ocorre utilizando helpers para disparar erros HTTP com seus respectivos status code, também existem os Validators, que são responsáveis por validar o corpo recebido da requisição e disparar erros caso algo esteja inválido.
- Documentação
- Coesão de commits: Foram feitos commits pequenos, com pequenas incrementações, para assim ter um melhor controle do processo de desenvolvimento.
- Mensagens de commits claras: Foi utilizado a biblioteca "git-commit-msg-linter" para padronizar as mensagens dos commits com os seus respectivos prefixos.
- Configuração de lint: Foram utilizados as libs eslint e prettier. O eslint tem como objetivo encontrar erros no código para assim realizar a correção. O prettier foi utilizado para formatar o código e manter um padrão de formatação em todo o projeto.
- Testes unitários: Utilizado o JEST para realizar testes unitários, buscando testar as regras de negócio de cada classe da aplicação, e buscando uma boa cobertura de testes.
- Testes de integração: Utilizado o JEST e o supertest para simular requisições feitas para a API, utilizando também um banco de dados de testes, para assim, não influenciar nos dados presentes no banco real.
- Documentação dos endpoints: Documentação pode ser encontrada em: https://erick-scur-api-exchange-rates.up.railway.app/api-docs/
- Estar rodando e disponível: A aplicação está rodando na plataforma Railway e pode ser encontrada em: https://erick-scur-api-exchange-rates.up.railway.app/api-docs/
- CI/CD
