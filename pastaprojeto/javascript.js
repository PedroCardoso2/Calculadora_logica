document.addEventListener('DOMContentLoaded', () => {
  const botoes = document.querySelectorAll('.button');
  const display = document.getElementById('display');
  let expressao = '';

  math.import({
    and: function(x, y) { return x && y },
    or: function(x, y) { return x || y },
    not: function(x) { return !x },
    biconditional: function(x, y) { return (x && y) || (!x && !y) },
  }, { override: true });

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
      const mensagemResultado = `O resultado de ${expressao} é ${resultado}`;
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
      const variaveis = {
        'PV': 'true',
        'PF': 'false',
        'QV': 'true',
        'QF': 'false',
      };

      let expr = expressao;
      for (const variavel in variaveis) {
        expr = expr.split(variavel).join(variaveis[variavel]);
      }

      expr = expr
        .replace(/\∧/g, ' and ')
        .replace(/\∨/g, ' or ')
        .replace(/~/g, ' not ')
        .replace(/⇔/g, ' biconditional ');

      let exprSplitted = expr.split("->");
      let exprWithImplicationHandled = exprSplitted[0];
      for (let i = 1; i < exprSplitted.length; i++) {
        exprWithImplicationHandled += " or not " + exprSplitted[i];
      }

      const resultado = math.evaluate(exprWithImplicationHandled);
      return resultado ? 'V' : 'F';
    } catch (error) {
      return 'Erro na expressão';
    }
  }
});
