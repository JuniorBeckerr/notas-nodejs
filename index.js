const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const path = require('path');
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function processarInformacoesPDF(texto) {
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
  resultado.cnpjsEncontrados = cnpjsEncontrados[0].nome
  console.log(resultado.cnpjsEncontrados)
  return resultado;
}

app.post('/upload', upload.single('pdfFile'), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const data = await pdf(buffer);
    const texto = data.text;

    if (texto.trim() === '') {
      console.log('O PDF parece ser uma imagem.');
      res.status(400).send('O PDF parece ser uma imagem.');
    } else {
      const informacoes = processarInformacoesPDF(texto);

      const informacoesFormatadas = `
        Número do Boleto: ${informacoes.numeroBoleto || "Não encontrado"}
        Valor do Boleto: ${informacoes.ValorFormatado || "Não encontrado"}
        Data de Emissão: ${informacoes.menorData || "Não encontrado"}
        Data de Vencimento: ${informacoes.maiorData || "Não encontrado"}
        Pagador: ${informacoes.cnpjsEncontrados || "Não encontrado"}
      `;
      console.log('Informações formatadas:\n', informacoesFormatadas);

      res.send(informacoesFormatadas);
    }
  } catch (error) {
    console.error('Erro ao processar o arquivo PDF:', error);
    res.status(500).send('Erro ao processar o arquivo PDF.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
