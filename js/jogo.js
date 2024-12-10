let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(acertos, tentativas);
  
  // Mostra o botão jogar novamente alterando a classe CSS (className)
  btnJogarNovamente.classList.add('visivel');
  // Oculta o botão reiniciar alterando a classe CSS (className)
  btnReiniciar.classList.add('invisivel');
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true; // Variável jogar volta a ser verdadeira
  let divis = document.getElementsByTagName("div");

  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id >= '0' && divis[i].id <= '3') {
      divis[i].className = "inicial";
    }
  }

  let imagem = document.getElementById("imagem");
  if (imagem) {
    imagem.remove();
  }
  let imagemErro= document.getElementById("imagemErro");
  if (imagemErro) {
    imagemErro.remove();
  }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = tentativas > 0 ? (acertos / tentativas) * 100 : 0;
  document.getElementById("resposta").innerHTML = 
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// Função executada quando o jogador acertou
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
  obj.appendChild(img);
}

// Função executada quando o jogador errou
function errou(obj) {
  obj.className = "errou";
  const img = new Image(100);
  img.id = "imagemErro";
  img.src = "https://w7.pngwing.com/pngs/226/279/png-transparent-red-angry-emoji-anger-emoticon-smiley-emoji-icon-angry-emoji-s-fruit-angry-emoji-smile.png"; // URL da imagem de erro
  //adiciona a imagem criada na div(OBJ) escolhida pelo usuario
  obj.appendChild(img);
}

// Função que sorteia um número aleatório entre 0 e 3 e verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;
    // Verifica se jogou 4 vezes
    if (tentativas === 4) {
      btnJogarNovamente.classList.add('invisivel');
      btnReiniciar.classList.add('visivel');
    }

    let sorteado = Math.floor(Math.random() * 4); // Agora sorteia entre 0 e 3

    if (obj.id === sorteado.toString()) {
      acertou(obj);
      acertos++;
    } else {
      errou(obj);
      const objSorteado = document.getElementById(sorteado.toString());
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);