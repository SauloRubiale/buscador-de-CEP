const cepInput = document.getElementById("CEP");

const resultadoDiv = document.getElementById("Resultado");

const cepButton = document.getElementById("Buscar");

cepButton.addEventListener("click", async () => {
  const cep = cepInput.value.trim();
  async function BuscarCep(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    const resposta = await fetch(url);

    const dados = await resposta.json();

    return dados;
  }

  const resultado = await BuscarCep(cep);
  resultadoDiv.innerHTML = `
    <p><strong>Rua:</strong> ${resultado.logradouro}</p>
    <p><strong>Bairro:</strong> ${resultado.bairro}</p>
  <p><strong>Cidade:</strong> ${resultado.localidade} - ${resultado.uf}</p>
`;
});
