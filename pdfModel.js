const { text } = require("express");

class PdfModel {
  static processarInformacoesPDF(texto) {
    const resultado = {};

    const numeroBoletoRegex = /(\d|\.|\s){48,}/;
    const numeroBoletoMatch = texto.match(numeroBoletoRegex);

    if (numeroBoletoMatch) {
      let numeroBoleto = numeroBoletoMatch[0].replace(/[.\s]/g, '');

      if (numeroBoleto.length > 48) {
        numeroBoleto = numeroBoleto.slice(0, 47);
      }

      resultado.numeroBoleto = numeroBoleto;

      let valorBoleto = numeroBoleto.slice(-8);
      let ValorFormatado = (parseFloat(valorBoleto) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      resultado.ValorFormatado = ValorFormatado;

    } else {
      resultado.numeroBoleto = "Número do Boleto não encontrado.";
    }

    const dataRegex = /(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})/g;
    const datasEncontradas = texto.match(dataRegex);

    if (datasEncontradas && datasEncontradas.length > 0) {
      let menorData = datasEncontradas[0];
      let maiorData = datasEncontradas[0];

      for (let i = 1; i < datasEncontradas.length; i++) {
        const dataAtual = datasEncontradas[i];

        if (dataAtual < menorData) {
          menorData = dataAtual;
        }

        if (dataAtual > maiorData) {
          maiorData = dataAtual;
        }
      }
      resultado.menorData = menorData;
      resultado.maiorData = maiorData;
    } else {
      console.log('Nenhuma data encontrada');
    }

    let dados = [
      "07040560000119 MRA",
      "22408887000194 PRESTIGE INCORPORAÇÃO",
      "26038751000190 BLUE PARK",
      "36322152000158 CONDOMINIO PRESTIGE",
      "75047498000147 BUSINESS",
      "75047498000228 ADM",
      "75047498000309 THERMAS",
      "75047498000490 CENTRAL"
    ];

    function obterNomePorCNPJ(cnpjProcurado) {
      let resultado = dados.find(item => item.startsWith(cnpjProcurado));
      if (resultado) {
        let partes = resultado.split(" ");
        return partes.slice(1).join(" ");
      } else {
        return "CNPJ não encontrado";
      }
    }

    function encontrarNomesNoTexto(texto) {
      let cnpjsEncontrados = [];
    
      dados.forEach(cnpj => {
        let cnpjSemEspacos = cnpj.split(" ")[0];
        if (texto.includes(cnpjSemEspacos)) {
          let nomeEncontrado = obterNomePorCNPJ(cnpjSemEspacos);
          cnpjsEncontrados.push({ cnpj: cnpjSemEspacos, nome: nomeEncontrado });
        }
      });
    
      return cnpjsEncontrados;
    }
    let cnpjsEncontrados = encontrarNomesNoTexto(texto);

    if (cnpjsEncontrados.length > 0) {
      resultado.cnpjsEncontrados = cnpjsEncontrados.map(item => item.nome);
      if (cnpjsEncontrados.length === 0) {
        resultado.cnpjsEncontrados = ["CNPJ não encontrado"];
      }
          } else {
      resultado.cnpjsEncontrados = ["CNPJ não encontrado"];
    }



    return resultado;
  }



  static processarPdfTOTVS(texto) {
    const resultado = {};

    const numeroBoletoRegex = /(\d|\.|\s){48,}/;
    const numeroBoletoMatch = texto.match(numeroBoletoRegex);

    if (numeroBoletoMatch) {
      let numeroBoleto = numeroBoletoMatch[0].replace(/[.\s]/g, '');

      if (numeroBoleto.length > 48) {
        numeroBoleto = numeroBoleto.slice(0, 47);
      }

      resultado.numeroBoleto = numeroBoleto;

      let valorBoleto = numeroBoleto.slice(-8);
      let ValorFormatado = (parseFloat(valorBoleto) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      resultado.ValorFormatado = ValorFormatado;

    } else {
      resultado.numeroBoleto = "Número do Boleto não encontrado.";
    }

    const dataRegex = /(\d{2}\/\d{2}\/\d{2,4})/g;
    const datasEncontradas = texto.match(dataRegex);
    let datasUnicas = [...new Set(datasEncontradas)]



    let timestamps = datasUnicas.map(data => {
      const [dia, mes, ano] = data.split('/');
      const anoFormatado = ano.length === 2 ? `20${ano}` : ano; // Converte anos no formato 'yy' para 'yyyy'
      return new Date(`${mes}/${dia}/${anoFormatado}`).getTime();
    });


    let menorData = new Date(Math.min.apply(null, timestamps));
    let maiorData = new Date(Math.max.apply(null, timestamps));

    menorData = `${menorData.getDate().toString().padStart(2, '0')}/${(menorData.getMonth() + 1).toString().padStart(2, '0')}/${menorData.getFullYear().toString().slice(-2)}`;
    maiorData = `${maiorData.getDate().toString().padStart(2, '0')}/${(maiorData.getMonth() + 1).toString().padStart(2, '0')}/${maiorData.getFullYear().toString().slice(-2)}`;

    resultado.menorData = menorData;
    resultado.maiorData = maiorData;

    let dados = [
      "07040560000119 MRA",
      "22408887000194 PRESTIGE INCORPORAÇÃO",
      "26038751000190 BLUE PARK",
      "36322152000158 CONDOMINIO PRESTIGE",
      "75047498000147 BUSINESS",
      "75047498000228 ADM",
      "75047498000309 THERMAS",
      "75047498000490 CENTRAL"
    ];




    return resultado;
  }

}
module.exports = PdfModel;
