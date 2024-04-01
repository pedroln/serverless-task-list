<h2> CRUD DE TASKS - SERVERLESS </h2>

<h3> Requisitos que foram feitos com sucesso: </h3>

- Listagem Geral e Filtrada a partir do status da Task(GET), Criação(POST), Atualização(PUT), Deleção(DELETE) de uma Task.

- AWS Lambda para hospedando a lógica da aplicação.

-  AWS API Gateway para expondo a API.
  
- Dados das tasks armazenados no DynamoDB.

- Código programado em Typescript (NestJS).

- Tratamentos na parte de Criação e Update (como falta de informações da Task)


**Conteúdo:**

CRUD de Tasks utilizando Typescript (framework NestJS) e com o código hospedado em AWS Lambda, com sua Api exposta na AWS API Gateway e as informações guardadas no banco de dados DynamoDB.

Bibliotecas utilizadas:

- Bibliotecas do NestJS
- Aws-Lambda
- Serverless framework
- Aws-serverless-express
- Aws-sdk

Funcionalidades:

- Para rodar o projeto: Para instalar as dependências, utilize o comando -
  <blockquote> "npm install"
  </blockquote>
- Após isto, certifique-se que há um usuário IAM na AWS com as todas as permissões de administrador.
- Adicione a chave de acesso e a chave secreta deste usuário utilizando o comando 
  <blockquote> "aws configure"
    </blockquote>
- Após todas as configurações e instalações, basta usar o comando, dê build no projeto com o comando
  <blockquote> 
    "npm run build"
    </blockquote>
- Em seguida, iniciar o framework Serverless para que o projeto rode na AWS utilizando o comando
  <blockquote> "serverless deploy"
    </blockquote>
- Após todo o processo, toda a aplicação Serverless já estará montada na AWS e o terminal retornará os links que serão utilizados nos endpoints, podendo ser utilizados no Postman, ou na parte de API Gateway que estará disponível na AWS do usuário na região SA-EAST

<h5> 
  
- Abaixo está listado as rotas e os bodys em JSON (para as requisições que exigem uma inserção do mesmo) de modo que a requisição seja feita com sucesso para cada requisito (e também para dar trigger em cada exceção/validação que foi criada)</h5>

  - <strong>LISTAGEM DE TODAS AS TASKS - ROTA - GET</strong> 
      <blockquote>**url**/tasks/</blockquote>
  Caso a base de dados já possua alguma Task, será listado as informações de todas as Tasks

  - <strong>LISTAGEM DE TASKS FILTRADAS POR STATUS - ROTA - GET</strong> 
      <blockquote>**url**/tasks/getTasksByStatus + **Parametros da Query** </blockquote>
  Caso a base de dados já possua alguma Task, basta inserir o status como um QUERY PARAM ao testar a rota e ela irá retornar todas as Tasks que possuem esse status
  
  - <strong>CRIAÇÃO DE UMA TASK - ROTA - POST</strong> 
        <blockquote>**url**/tasks/createTask</blockquote>
  Criação de uma task com as informações (Title, Description e StatusTask), caso nada seja inserido no campo StatusTask ele será salvo no banco de dados como "Pending".
  RETORNO: Task salva junto com seu campo único id e sua Data/Horário de criação (createdAt)
  O endpoint não permite salvar sem o campo "Title" e "Description", caso algum desses campos sejam retirados, um erro 400 retornará com a mensagem alertando do campo ausente.
  JSON EXEMPLO:

 <blockquote> 
           
            {
                "title": "Title Task",
                "description": "Description Task",
                "statusTask": "Done"
            }
            
 </blockquote>

 - <strong>DELEÇÃO DE UMA TASK - ROTA - DELETE</strong> 
    <blockquote>**url**/tasks/deleteTask/"idDaTask" </blockquote>
Caso a base de dados já possua alguma Task, basta inserir o id de uma task existente após a barra que a Task será deletada (recomenda-se usar uma das rotas GET para pegar a id da task que se deseja deletar)
    RETORNOS: 
    TASK EXISTENTE: Retorna as informações da task que foi removida.
    TASK COM ID INEXISTENTE: Retorna erro 404 alertando o usuário de que o id inserido não existe.


- <strong>EDIÇÃO/ATUALIZAÇÃO DE UMA TASK - ROTA - PUT</strong> 
    <blockquote>**url**/tasks/updateTask/"idDaTask" </blockquote>
Caso a base de dados já possua alguma Task, insira o id de uma task existente após a barra (recomenda-se usar uma das rotas GET para pegar a id da task que se deseja editar), após isso insira no Body o JSON EXEMPLO:

 <blockquote> 
           
            {
                "title": "Title Task 2",
                "description": "Description Task 2",
                "statusTask": "Done 2"
            }
            
 </blockquote>
    RETORNOS: 
    TASK EXISTENTE: Retorna as informações da task que foi atualizada.
    TASK COM ID INEXISTENTE: Retorna erro 404 alertando o usuário de que o id inserido não existe.
