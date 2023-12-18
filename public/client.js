document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const textoExtratoElement = document.getElementById('textoExtrato');
  const mensagemSucessoElement = document.getElementById('mensagemSucesso');
  const mensagemErroElement = document.getElementById('mensagemErro');
  const totvsInputs = document.getElementById('totvsInputs');

  mensagemErroElement.style.display='none';
  mensagemSucessoElement.style.display='none';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const fornecedor = document.getElementById('fornecedor').value;

    formData.append('fornecedor', fornecedor);

    const response = await fetch(`/upload/${fornecedor.toLowerCase()}`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const texto = await response.text();
      textoExtratoElement.innerHTML = `<pre>${texto}</pre>`;
      mensagemSucessoElement.textContent = 'Upload bem-sucedido!';
      mensagemErroElement.textContent = '';
      mensagemSucessoElement.style.display='flex';
      mensagemErroElement.style.display='none';
      setTimeout(() => {
        mensagemSucessoElement.style.display = 'none';
      }, 2000);
    } else {
      mensagemErroElement.textContent = 'Erro ao enviar o arquivo PDF';
      mensagemSucessoElement.textContent = '';
      mensagemSucessoElement.style.display='none';
      mensagemErroElement.style.display='flex';
      setTimeout(() => {
        mensagemErroElement.style.display = 'none';
      }, 2000);
    }
  });

  document.getElementById('fornecedor').addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    totvsInputs.style.display = selectedValue === 'TOTVS' ? 'block' : 'none';
  });
});
