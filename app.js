// Array que armazena os nomes dos amigos
let amigos = [];

// Array que registra os nomes que já foram sorteados
let sorteados = [];

// Array que registra os sorteadores que já realizaram o sorteio
let sorteadoresJaRealizaram = [];

// Variável para controlar se o cadastro foi finalizado
let cadastroFinalizado = false;

// Função para adicionar um amigo
function adicionarAmigo() {
  if (cadastroFinalizado) {
    alert("Cadastro finalizado! Agora só é possível sortear.");
    return;
  }

  const inputAmigo = document.getElementById("amigo");
  const nome = inputAmigo.value.trim();

  if (nome === "") {
    alert("Por favor, insira um nome.");
    return;
  }

  amigos.push(nome);
  atualizarListaAmigos();
  inputAmigo.value = "";
}

// Função para atualizar a lista exibida na tela
function atualizarListaAmigos() {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";
  
  for (let i = 0; i < amigos.length; i++) {
    const li = document.createElement("li");
    li.textContent = amigos[i];
    lista.appendChild(li);
  }
}

// Adiciona o listener para acionar a função ao pressionar Enter no campo de entrada
const inputAmigo = document.getElementById("amigo");
inputAmigo.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    adicionarAmigo();
  }
});

// Função para finalizar o cadastro e bloquear a adição de novos amigos
function finalizarCadastro() {
  if (amigos.length === 0) {
    alert("Adicione pelo menos um amigo antes de finalizar o cadastro.");
    return;
  }

  if (confirm("Todos já foram cadastrados?")) {
    cadastroFinalizado = true;
    document.getElementById("botaoAdicionar").disabled = true; // Desativa o botão de adicionar
    document.getElementById("amigo").disabled = true; // Desativa o campo de input
  }
}

// Função para sortear um amigo
function sortearAmigo() {
  if (!cadastroFinalizado) {
    alert("Finalize o cadastro antes de sortear.");
    return;
  }

  // Solicita o nome da pessoa que vai realizar o sorteio
  const pessoaQueSorteia = prompt("Digite o seu nome (quem vai sortear):").trim();
  if (!pessoaQueSorteia) {
    alert("Nome inválido.");
    return;
  }

  // Verifica se o sorteador está cadastrado
  if (!amigos.includes(pessoaQueSorteia)) {
    alert("Nome não encontrado na lista de amigos.");
    return;
  }

  // Verifica se a pessoa já realizou o sorteio
  if (sorteadoresJaRealizaram.includes(pessoaQueSorteia)) {
    alert("Você já tirou seu amigo secreto.");
    return;
  }

  // Cria a lista de nomes disponíveis, excluindo:
  // - A pessoa que está sorteando, para não tirar a si mesmo;
  // - Os amigos que já foram sorteados anteriormente.
  const disponiveis = amigos.filter(nome => nome !== pessoaQueSorteia && !sorteados.includes(nome));

  if (disponiveis.length === 0) {
    alert("Não há nomes disponíveis para sortear.");
    return;
  }

  // Gera um índice aleatório para selecionar um amigo da lista disponível
  const indiceAleatorio = Math.floor(Math.random() * disponiveis.length);
  const amigoSorteado = disponiveis[indiceAleatorio];

  // Registra que esse sorteador já realizou o sorteio e o amigo sorteado para não ser sorteado novamente
  sorteadoresJaRealizaram.push(pessoaQueSorteia);
  sorteados.push(amigoSorteado);

  // Exibe o resultado e inicia a contagem regressiva de 10 segundos
  const resultadoElemento = document.getElementById("resultado");
  let segundos = 10;
  resultadoElemento.innerHTML = `A pessoa sorteada para <strong>${pessoaQueSorteia}</strong> é: <strong>${amigoSorteado}</strong><br>Esse resultado sumirá em <span id="countdown">${segundos}</span> segundos.`;

  const countdownInterval = setInterval(() => {
    segundos--;
    document.getElementById("countdown").textContent = segundos;

    if (segundos <= 0) {
      clearInterval(countdownInterval);
      resultadoElemento.innerHTML = "";
    }
  }, 1000);

  // Verifica se todos já sortearam
  if (sorteadoresJaRealizaram.length === amigos.length) {
    setTimeout(() => {
      resultadoElemento.innerHTML = "<strong>LISTA FINALIZADA, APROVEITEM!</strong>";

      // Após 5 segundos, a página é recarregada para zerar tudo
      setTimeout(() => {
        location.reload();
      }, 5000);
    }, 10000); // Exibe a mensagem após o último sorteio
  }
}
