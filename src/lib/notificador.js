function notificarPagamento(servico, pagamentoID) {
  servico.enviar(`Pagamento ${pagamentoID} criado`);
}

module.exports = { notificarPagamento };
