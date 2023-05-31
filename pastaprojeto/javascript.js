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
    if (event.submitter.value === 'Resultado') {
      const resultado = calcular(expressao);
      const tipoOperacao = obterTipoOperacao(expressao);
      const mensagemResultado = `${expressao} é ${tipoOperacao}`;
      display.textContent = mensagemResultado;
    }
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
    try {
      const resultado = eval(expressao); 
      return resultado;
    } catch (error) {
      return 'Erro na expressão';
    }
  }

  function obterTipoOperacao(expressao) {
    const tipoOperacao = {
      '∧': 'Conjunção',
      '∨': 'Disjunção',
      '->': 'Condicional',
      '⇔': 'Bicondicional',  
      '~': 'Negação',
    };

    const operadores = Object.keys(tipoOperacao);
    const operadorEncontrado = operadores.find((operador) => expressao.includes(operador));

    if (operadorEncontrado) {
      return tipoOperacao[operadorEncontrado];
    } else {
      return 'Não é possível fazer essa operação! ';
    }
  }
});
