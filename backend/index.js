const express = require("express");
const cors = require("cors");
const Funcionario = require("./config");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const snapshot = await Funcionario.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.post("/funcionarios", async (req, res) => {
  const funcionario = req.body;
  await Funcionario.add({ funcionario });
  res.send({ msg: "Funcionário adicionado" });
});

app.put("/funcionarios/:id", async (req, res) => {
  const id = req.params.id;
  delete req.body.id;
  const funcionario = req.body;
  await Funcionario.doc(id).update(req.body);
  res.send({ msg: "Funcionário atualizado" });
});

app.delete("/funcionarios/:id", async (req, res) => {
  const id = req.params.id;
  await Funcionario.doc(id).delete();
  res.send({ msg: "Funcionário excluído" });
});

app.listen(4000, () => console.log("Up & RUnning *4000"));