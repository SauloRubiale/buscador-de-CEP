const cepInput = document.getElementById("CEP");
const resultadoDiv = document.getElementById("Resultado");
const cepButton = document.getElementById("Buscar");

cepInput.focus();

async function BuscarCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const resposta = await fetch(url);
  return await resposta.json();
}

cepButton.addEventListener("click", async () => {
  const cep = cepInput.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    resultadoDiv.innerHTML =
      "<p>Por favor, insira um CEP válido com 8 dígitos.</p>";
    cepInput.value = "";
    cepInput.focus();
    return;
  }

  cepButton.disabled = true;
  resultadoDiv.innerHTML = "<p>Buscando CEP...</p>";

  try {
    const resultado = await BuscarCep(cep);

    if (resultado.erro) {
      resultadoDiv.innerHTML = "<p>CEP não encontrado.</p>";
      return;
    }

    resultadoDiv.innerHTML = `
      <p><strong>Rua:</strong> ${resultado.logradouro || "N/A"}</p>
      <p><strong>Bairro:</strong> ${resultado.bairro || "N/A"}</p>
      <p><strong>Cidade:</strong> ${resultado.localidade} - ${resultado.uf}</p>
    `;
  } catch (error) {
    resultadoDiv.innerHTML =
      "<p>Erro ao buscar o CEP. Verifique sua conexão.</p>";
  } finally {
    cepInput.value = "";
    cepInput.focus();

    cepButton.disabled = false;
  }
});
