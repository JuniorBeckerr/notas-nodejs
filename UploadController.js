const pdf = require('pdf-parse');
const PdfModel = require('./pdfModel');
const { text } = require('express');

class UploadController {
  static async processarPDFVIVO(buffer) {
    try {
            const data = await pdf(buffer);
            const texto = data.text;
      
            if (texto.trim() === '') {
              console.log('O PDF parece ser uma imagem.');
              throw new Error('O PDF parece ser uma imagem.');
            }
            
            const informacoes = PdfModel.processarInformacoesPDF(texto);
      
            const informacoesFormatadas = `
              Número do Boleto: ${informacoes.numeroBoleto || "Não encontrado"}
              Valor do Boleto: ${informacoes.ValorFormatado || "Não encontrado"}
              Data de Emissão: ${informacoes.menorData || "Não encontrado"}
              Data de Vencimento: ${informacoes.maiorData || "Não encontrado"}
              Pagador: ${informacoes.cnpjsEncontrados || "Não encontrado"}
            `;
      
            return informacoesFormatadas;
          } catch (error) {
            console.error('Erro ao processar o arquivo PDF:', error);
            throw new Error('Erro ao processar o arquivo PDF.');
          }
  }


  static async processarPDFVIVOJSON(buffer) {
    try {
      const data = await pdf(buffer);
      const texto = data.text;

      if (texto.trim() === '') {
        console.log('O PDF parece ser uma imagem.');
        throw new Error('O PDF parece ser uma imagem.');
      }

      const informacoes = PdfModel.processarInformacoesPDF(texto);
      const informacoesFormatadas = {
        numeroBoleto: informacoes.numeroBoleto || "Não encontrado",
        ValorFormatado: informacoes.ValorFormatado || "Não encontrado",
        menorData: informacoes.menorData || "Não encontrado",
        maiorData: informacoes.maiorData || "Não encontrado",
        cnpjsEncontrados: informacoes.cnpjsEncontrados || ["Não encontrado"]
      };

      return informacoesFormatadas;
    } catch (error) {
      console.error('Erro ao processar o arquivo PDF:', error);
      throw new Error('Erro ao processar o arquivo PDF.');
    }
  }



  static async processarPDFTOTVSNFS(buffer) {

    const data = await pdf(buffer);
    const texto = data.text;


  }


  static async processarPDFTOTVSBoleto(buffer) {
    try {
      const data = await pdf(buffer);
      const texto = data.text;

      if (texto.trim() === '') {
        console.log('O PDF parece ser uma imagem.');
        throw new Error('O PDF parece ser uma imagem.');
      }


      const informacoes = PdfModel.processarPdfTOTVS(texto);

      const informacoesFormatadas = `
        Número do Boleto: ${informacoes.numeroBoleto || "Não encontrado"}
        Valor do Boleto: ${informacoes.ValorFormatado || "Não encontrado"}
        Data de Emissão: ${informacoes.menorData || "Não encontrado"}
        Data de Vencimento: ${informacoes.maiorData || "Não encontrado"}
        Pagador: ${informacoes.cnpjsEncontrados || "Não encontrado"}
      `;

      return informacoesFormatadas;
    } catch (error) {
      console.error('Erro ao processar o arquivo PDF:', error);
      throw new Error('Erro ao processar o arquivo PDF.');
    }
  }

  static async processarPDFTOTVSJSON(buffer) {
    try {
      const data = await pdf(buffer);
      const texto = data.text;

      if (texto.trim() === '') {
        console.log('O PDF parece ser uma imagem.');
        throw new Error('O PDF parece ser uma imagem.');
      }

      const informacoes = PdfModel.processarPdfTOTVS(texto);
      const informacoesFormatadas = {
        numeroBoleto: informacoes.numeroBoleto || "Não encontrado",
        ValorFormatado: informacoes.ValorFormatado || "Não encontrado",
        menorData: informacoes.menorData || "Não encontrado",
        maiorData: informacoes.maiorData || "Não encontrado",
        cnpjsEncontrados: informacoes.cnpjsEncontrados || ["Não encontrado"]
      };

      console.log(informacoesFormatadas)
      return informacoesFormatadas;
    } catch (error) {
      console.error('Erro ao processar o arquivo PDF:', error);
      throw new Error('Erro ao processar o arquivo PDF.');
    }
  }

}

module.exports = UploadController;
