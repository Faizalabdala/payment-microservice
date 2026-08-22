const usuario = {
  nome: "Faizal",
  idade: 22,
  linguagens: ["java", "python", "javascript"],
};

const { nome, ...usuariosemnome } = usuario;
console.log(usuariosemnome);
