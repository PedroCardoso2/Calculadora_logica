document.addEventListener('DOMContentLoaded', () => {
  const botoes = document.querySelectorAll('.button');
  const display = document.getElementById('display');
  let expressao = '';

  math.import({
    and: function(x, y) { return x && y },
    or: function(x, y) { return x || y },
    not: function(x) { return !x },
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

      criarTabelaVerdade(expressao);
    }
  });

  const resetar = document.querySelector('input[type="reset"]');
  resetar.addEventListener('click', () => {
    expressao = '';
    display.textContent = '';
    const container = document.getElementById('tabela-verdade');
    container.innerHTML = '';
  });

  function adicionarAoDisplay(texto) {
    expressao += texto;
    display.textContent = expressao;
  }

  function calcular(expressao) {
    try {
      const variaveis = {
        'P': 'true',
        'P': 'false',
        'Q': 'true',
        'Q': 'false',
      };

      let expr = expressao;
      for (const variavel in variaveis) {
        expr = expr.split(variavel).join(variaveis[variavel]);
      }

      expr = expr
        .replace(/\∧/g, ' and ')
        .replace(/\∨/g, ' or ')
        .replace(/~/g, ' not ');

      while (expr.includes('⇔')) {
        let startIdx = expr.indexOf('⇔');
        let endIdx = startIdx;
        while (startIdx > 0 && expr[startIdx - 1] !== '(') {
          startIdx--;
        }
        while (endIdx < expr.length && expr[endIdx + 1] !== ')') {
          endIdx++;
        }
        let biconditionalExpr = expr.slice(startIdx, endIdx + 1);
        let [leftExpr, rightExpr] = biconditionalExpr.split('⇔');
        let newExpr = '(' + leftExpr + ' and ' + rightExpr + ') or (' + 'not ' + leftExpr + ' and not ' + rightExpr + ')';
        expr = expr.replace(biconditionalExpr, newExpr);
      }

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

  function gerarCombinacoes(n) {
    if (n === 1) {
      return [['F'], ['V']];
    } else {
      let combinacoes = gerarCombinacoes(n - 1);
      return [...combinacoes.map(combinacao => ['F', ...combinacao]), ...combinacoes.map(combinacao => ['V', ...combinacao])];
    }
  }
  
  function criarTabelaVerdade(expressao) {
    const container = document.getElementById('tabela-verdade');
    container.innerHTML = '';
  
    const table = document.createElement('table');
    table.classList.add('tabela-verdade');
  
    let vars = [...new Set(expressao.match(/[A-Za-z]+/g))];
  
    let header = table.createTHead();
    let row = header.insertRow();
    for (let variavel of vars) {
      let cell = row.insertCell();
      cell.innerHTML = "<b>" + variavel + "</b>";
    }
    let cell = row.insertCell();
    cell.innerHTML = "<b>" + expressao + "</b>";
  
    let combinacoes = gerarCombinacoes(vars.length);
  
    let expr = expressao;
    expr = expr.replace(/∧/g, ' && ');
    expr = expr.replace(/∨/g, ' || ');
    expr = expr.replace(/~/g, ' !');
    expr = expr.replace(/->/g, ' <= ');
    expr = expr.replace(/⇔/g, ' === ');
  
    let todasAsSaidas = [];
  
    for (let combinacao of combinacoes) {
      let row = table.insertRow();
      let valorCombinacao = {};
      for (let i = 0; i < vars.length; i++) {
        let cell = row.insertCell();
        cell.innerHTML = combinacao[i];
        valorCombinacao[vars[i]] = combinacao[i] === 'V';
      }
  
      let valorExpr = expr;
      for (let variavel in valorCombinacao) {
        let valor = valorCombinacao[variavel] ? "true" : "false";
        valorExpr = valorExpr.split(variavel).join(valor);
      }
  
      let valor = eval(valorExpr) ? 'V' : 'F';
      todasAsSaidas.push(valor);
      let cell = row.insertCell();
      cell.innerHTML = valor;
    }
  
    if (todasAsSaidas.every(saida => saida === 'V')) {
      display.textContent = 'Essa tabela é Tautologica';
      container.appendChild(table);
    } else if (todasAsSaidas.every(saida => saida === 'F')) {
      display.textContent = 'Essa tabela é Contradição';
      container.appendChild(table);
    } else {
      container.appendChild(table);
    }
  }
  
  formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.submitter.value === 'Resultado') {
      const resultado = calcular(expressao);
      const mensagemResultado = `O resultado de ${expressao} é ${resultado}`;
      display.textContent = mensagemResultado;
  
      criarTabelaVerdade(expressao);
    }
  })  

});

