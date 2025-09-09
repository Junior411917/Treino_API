require("dotenv").config();

const db = require("./db");

const port = process.env.PORT;

const express = require("express");

const app = express();
app.use(express.json());

app.get("/teste", (req, res) => {
  res.json({
    message: "It's working!",
  });
});

app.get("/customers/:id", async (req, res) => {
  const customer = await db.selectCustomer(req.params.id);
  res.json(customer);
});

app.get("/customers", async (req, res) => {
  const customers = await db.selectCustomers();
  res.json(customers);
});

app.post("/customers", async (req, res) => {
  await db.insertCustomer(req.body);
  res.sendStatus(201);
});

app.patch("/customers/:id", async (req, res) => {
  await db.updateCustomer(req.params.id, req.body);
  res.sendStatus(200);
});

app.delete("/customers/:id", async (req, res) => {
  await db.deleteCustomer(req.params.id);
  res.sendStatus(204);
});

app.listen(port);

console.log("Backend working!");
