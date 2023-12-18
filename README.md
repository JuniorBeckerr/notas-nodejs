# PDF extractor

![start](https://github.com/JuniorBeckerr/notas-nodejs/assets/111386163/0a90dfa4-0910-43c2-86d8-000c97e08b39)


> Este projeto é uma aplicação Node.js para processamento de informações a partir de arquivos PDF, especialmente voltado para documentos relacionados a pagamentos.


### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Criação de endpoints para as informações extraidas em json
- [ ] Inserir mais informações referente ao documento.
- [ ] Implementar OCR para validar documentos em formatos visuais


## 🚀 Instalando PDF extractor

Para instalar o PDF extractor, siga estas etapas:

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/JuniorBeckerr/notas-nodejs.git
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

## ☕ Usando PDF extractor

Para usar PDF extractor, siga estas etapas:

1. **Selecione o Modelo de Documento:**<br>
por enquanto temos somente VIVO e TOTVS

![selecione-modelo](https://github.com/JuniorBeckerr/notas-nodejs/assets/111386163/a0c07cce-088e-43bc-ac0f-ce0b1eb8e5a4)
<br><br><br>

2. **Após modelo selecionado, clique para fazer upload:**<br>

![click-nfs](https://github.com/JuniorBeckerr/notas-nodejs/assets/111386163/cf2d3b89-6157-410f-a8d9-e7d997b8babe)
<br><br><br>

3. **Após selecionado o documento, clique em ENVIAR PDF:**<br>

![enviar-pdf](https://github.com/JuniorBeckerr/notas-nodejs/assets/111386163/2150f5b9-cdc7-4eda-9460-0160ff4f22eb)
<br><br><br>

3. **Se bem sucedido, resultará nas informações extraidas e um toast de sucesso:**<br>

![sucess](https://github.com/JuniorBeckerr/notas-nodejs/assets/111386163/41719259-7922-4a65-9e06-6f08157bd16b)
<br><br><br>

4. **Se mal sucedido, resultará em um toast de erro:**<br>

![error](https://github.com/JuniorBeckerr/notas-nodejs/assets/111386163/446111db-1272-4bb8-8a04-6d7e89d101fa)
<br><br><br>





## Processamento de arquivo VIVO (JSON)<br>
Obtenha informações formatadas de um arquivo VIVO em formato JSON.

Endpoint:<br>
```
POST | /processar-pdf/vivo/json/:propriedade
```
<br>


1. **Parâmetros:**<br>

 <strong>pdfFile</strong>: Arquivo PDF relacionado à VIVO.<br>
 <strong>propriedade</strong>: Propriedade desejada para obtenção de informações (boleto, valorboleto, emissao, vencimento, cnpj).<br>




**Exemplo de uso:**<br>
```
POST | /processar-pdf/vivo/json/boleto
```

<br>

![insomia-boleto](https://github.com/JuniorBeckerr/notas-nodejs/assets/111386163/9c678939-bd33-4864-84d7-702cc882debe)
