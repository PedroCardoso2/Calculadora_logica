document.addEventListener('DOMContentLoaded', () => {
  const botoes = document.querySelectorAll('.button');
  const display = document.getElementById('display');
  let expressao = '';

  botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
      const textoBotao = botao.textContent;
      adicionarAoDisplay(textoBotao);
    });
  });

  const formulario = document.querySelector('form');
  formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const resultado = calcular(expressao);
    display.textContent = resultado;
  });

  const resetar = document.querySelector('input[type="reset"]');
  resetar.addEventListener('click', () => {
    expressao = '';
    display.textContent = '';
  });

  function adicionarAoDisplay(texto) {
    expressao += texto;
    display.textContent = expressao;
  }

  function calcular(expressao) {
    return eval(expressao); 
  }
});
