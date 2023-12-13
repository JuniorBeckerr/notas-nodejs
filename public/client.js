document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const textoExtratoElement = document.getElementById('textoExtrato');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(form);
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const texto = await response.text();
        textoExtratoElement.innerHTML = `<pre>${texto}</pre>`;
  
        const nlpResponse = await fetch('/processar-nlp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ texto }),
        });
  
        if (nlpResponse.ok) {
          const nlpResultado = await nlpResponse.json();
          console.log('Resultado do processamento NLP:', nlpResultado);
        } else {
          console.error('Erro ao processar NLP:', nlpResponse.status);
        }
      } else {
        console.error('Erro ao enviar o arquivo PDF');
      }
    });
  });
  