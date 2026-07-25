require("dotenv").config();

const app = require("./app");

app.listen(process.env.PORT || 3000, () => {
  console.log(`O servidor iniciou na porta ${process.env.PORT}`);
});
