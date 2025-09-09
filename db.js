/*Criando a conexão com o banco de dados */

/*Criando o pool*/
async function connect() {
  if (global.connection) return global.connection.connect();

  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
  });

  /*Conexão com o banco de dados*/
  const client = await pool.connect();
  console.log("The connection pool was created successfully!!");

  const res = await client.query("Select now()");
  console.log(res.rows[0]);
  client.release();

  global.connection = pool;
  return pool.connect();
}

connect();

/*Aqui embaixo eu vou fazer o CRUD para ver se está tudo funcionando */
/*Buscando todos os meus clientes */
async function selectCustomers() {
  const client = await connect();
  const res = await client.query("SELECT * FROM customers");
  return res.rows;
}

/*Buscando um cliente por id */
async function selectCustomer(id) {
  const client = await connect();
  const res = await client.query(
    "SELECT * FROM customers WHERE customer_id=$1",
    [id]
  );
  return res.rows;
}

/*Cadastrando um cliente */
/*Obs: a função de INSERT não possui retorno */
async function insertCustomer(customer) {
  const client = await connect();
  const sql =
    "INSERT INTO customers(first_name, last_name, email, phone, address) VALUES ($1, $2, $3, $4, $5)";
  const res = await client.query(sql, [
    customer.first_name,
    customer.last_name,
    customer.email,
    customer.phone,
    customer.address,
  ]);
}

/*atualizando os dados de um cliente; só para testar, vou atualizar os dados do cliente de id: 4 */
async function updateCustomer(id, customer) {
  const client = await connect();
  const sql =
    "UPDATE customers SET first_name=$1, last_name=$2, email=$3, phone=$4, address=$5 WHERE customer_id=$6";
  const values = [
    customer.first_name,
    customer.last_name,
    customer.email,
    customer.phone,
    customer.address,
    id,
  ];
  await client.query(sql, values);
}

/*excluindo um cliente; só para testar, vou apagar os dados do cliente de id: 5*/
async function deleteCustomer(id) {
  const client = await connect();
  const sql = "DELETE FROM customers WHERE customer_id=$1";
  const values = [id];
  await client.query(sql, values);
}
module.exports = {
  selectCustomers,
  selectCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};
