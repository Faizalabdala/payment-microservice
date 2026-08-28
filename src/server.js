require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT || PORT || 3000, () => {
  console.log(`O servidor iniciou na porta ${process.env.PORT}`);
});
