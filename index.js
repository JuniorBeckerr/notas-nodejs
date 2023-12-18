const express = require('express');
const multer = require('multer');
const UploadController = require('./UploadController');
const PdfModel = require('./pdfModel');
const path = require('path');
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload/vivo', upload.single('pdfFile'), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const informacoesFormatadas = await UploadController.processarPDFVIVO(buffer);

    console.log('Informações formatadas:\n', informacoesFormatadas);
    res.send(informacoesFormatadas);
  } catch (error) {
    console.error('Erro ao processar o arquivo PDF:', error);
    res.status(500).send('Erro ao processar o arquivo PDF.');
  }
});

async function processarPdfJson(buffer, propriedade) {
  try {
    const informacoesFormatadas = await UploadController.processarPDFVIVOJSON(buffer);

    switch (propriedade) {
      case 'boleto':
        return informacoesFormatadas.numeroBoleto;
      case 'valorboleto':
        return informacoesFormatadas.ValorFormatado;
      case 'emissao':
        return informacoesFormatadas.menorData;
      case 'vencimento':
        return informacoesFormatadas.maiorData;
      case 'cnpj':
        return informacoesFormatadas.cnpjsEncontrados;
      default:
        return informacoesFormatadas;
    }
  } catch (error) {
    console.error('Erro ao processar o arquivo PDF da VIVO:', error);
    throw new Error('Erro ao processar o arquivo PDF da VIVO.');
  }
}

app.post('/processar-pdf/vivo/json/:propriedade', upload.single('pdfFile'), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const { propriedade } = req.params;

    const informacao = await processarPdfJson(buffer, propriedade);

    res.json(informacao);
  } catch (error) {
    console.error('Erro ao processar o arquivo PDF da VIVO:', error);
    res.status(500).json({ error: 'Erro ao processar o arquivo PDF da VIVO.' });
  }
});




app.post('/upload/totvs', upload.fields([{ name: 'pdfFile', maxCount: 1 }, { name: 'pdfFile3', maxCount: 1 }]), async (req, res) => {
  try {
    const bufferBoleto = req.files['pdfFile3'][0].buffer;

    const informacoesFormatadasBoleto = await UploadController.processarPDFTOTVSBoleto(bufferBoleto);


    console.log('Informações formatadas:\n', informacoesFormatadasBoleto);


    res.send(informacoesFormatadasBoleto);
  } catch (error) {
    console.error('Erro ao processar os arquivos PDF:', error);
    res.status(500).send('Erro ao processar os arquivos PDF.');
  }
});



async function processarPdfJsontotvs(buffer, propriedade) {
  try {
    const informacoesFormatadasBoleto = await UploadController.processarPDFTOTVSJSON(buffer);

    switch (propriedade) {
      case 'boleto':
        return informacoesFormatadasBoleto.numeroBoleto;
      case 'valorboleto':
        return informacoesFormatadasBoleto.ValorFormatado;
      case 'emissao':
        return informacoesFormatadasBoleto.menorData;
      case 'vencimento':
        return informacoesFormatadasBoleto.maiorData;
      case 'cnpj':
        return informacoesFormatadasBoleto.cnpjsEncontrados;
      default:
        return informacoesFormatadasBoleto;
    }
  } catch (error) {
    console.error('Erro ao processar o arquivo PDF da TOTVS:', error);
    throw new Error('Erro ao processar o arquivo PDF da TOTVS.');
  }
}

app.post('/processar-pdf/totvs/json/:propriedade', upload.single('pdfFile'), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const { propriedade } = req.params;

    const informacao = await processarPdfJsontotvs(buffer, propriedade);

    res.json(informacao);
  } catch (error) {
    console.error('Erro ao processar o arquivo PDF da TOTVS:', error);
    res.status(500).json({ error: 'Erro ao processar o arquivo PDF da TOTVS.' });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
