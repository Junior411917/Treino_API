require("dotenv").config();

const db = require("./db");

const port = process.env.PORT;

const express = require("express");

/*a linha abaixo é a configuração para que eu possa receber Json no meu backend */
const app = express();
app.use(express.json());

/*Rota para teste */
app.get("/teste", (req, res) => {
  res.json({
    message: "It's working!",
  });
});
/*criação da rota oficial para encontrar um cliente por id */
app.get("/customers/:id", async (req, res) => {
  const customer = await db.selectCustomer(req.params.id);
  res.json(customer);
});
/*criação da rota oficial para encontrar meus clientes */
app.get("/customers", async (req, res) => {
  const customers = await db.selectCustomers();
  res.json(customers);
});
/*criação da rota de cadastro de cliente */
app.post("/customers", async (req, res) => {
  await db.insertCustomer(req.body);
  res.sendStatus(201);
});

/*criação da rota de atualização de cliente */
app.patch("/customers/:id", async (req, res) => {
  await db.updateCustomer(req.params.id, req.body);
  res.sendStatus(200);
});

/*deletar um cliente por id */
app.delete("/customers/:id", async (req, res) => {
  await db.deleteCustomer(req.params.id);
  res.sendStatus(204);
});

app.listen(port);

console.log("Backend working!");
