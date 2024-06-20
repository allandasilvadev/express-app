### Express App

Aplicação desenvolvida durante o curso "ExpressJS - Otimização de aplicações NodeJS - (Treinaweb)"

#### packages usados
* expressJS
* express-handlebars
* jest
* supertest
* mongo-memory-server
* mongoose
* body-parser
* consign
* dotenv

#### Urls disponíveis

<strong>páginas</strong>
* GET: /

<strong>api courses</strong>
* GET: /courses
* GET: /courses/:id
* POST: /courses
* PATCH: /courses/:id
* DELETE: /courses/:id

Para executar esse projeto localmente, seguir os seguintes passos:

* Clonar o repositório;
* Entrar na pasta criada e executar os seguintes comandos:
    * ***docker compose up -d*** (Esse comando irá criar o container do banco de dados)
    * ***npm install*** (Para instalar as dependências do projeto)
    * Executar a aplicação com o comando ***nodemon app.js***
    * Acessar: http://localhost:3000

Para executar os testes, executar:
***npm test***

Obs: Será necessário instalar o ***jest*** e o ***nodemon*** globalmente em sua máquina para rodar a aplicação.