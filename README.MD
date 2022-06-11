Para rodar a aplicação

Rode o comando: docker-compose up --build

A aplicação estará sendo servida na porta 80

É possível alterar a porta pelo arquivo docker-compose.yml

É possível rodar o container localmente ou em um servidor na nuvem que tenha o Docker instalados 

Os dois endpoints disponiveis são:

GET - /check

{
  "API OK"
}

POST - /u/register

{
  name: "Nome de Exmplo",
  phone: "459999999"
}

GET - /u/:id

{
  id: <ID_USUARIO>,
  name: "Nome de Exemplo",
  phone: "459999999"
}
