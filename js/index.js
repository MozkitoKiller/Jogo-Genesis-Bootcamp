let order = [];
let clickedOrder = [];

let score = 0;

// 0 - Verde
// 1 - vermlho
// 2- amarelo
// 3- azul

const blue = document.querySelector('.azul');
const red = document.querySelector('.vermelho');
const yellow = document.querySelector('.amarelo');
const green = document.querySelector('.verde');

const jogar = document.querySelector('.jogar');

const pontos = document.querySelector('.pontos');

const msg = document.querySelector('.msg');

const prox = document.querySelector('.prox');


function iniciaJogo ()  {

    //cria ordem aleatória de cores
    let shuffleOrder = () => {
        let colorOrder = Math.floor(Math.random() * 4);
        order[order.length] = colorOrder;
        clickedOrder = [];

        for(let i in order) {
            let elementColor = createColorElement(order[i]);
            lightColor(elementColor, Number(i) + 1);
        }

    }


    // acend a prox cor
    let lightColor = (element, number) => {
        number = number * 500;

        setTimeout(() => {
            element.classList.add('selected');
        },number - 250);

        setTimeout(() => {
            element.classList.remove('selected');
        }, number);
    }

    //funcao para o click do usuario
    let click = (color)=> {
        clickedOrder[clickedOrder.length] = color;

        createColorElement(color).classList.add('selected');

        setTimeout(() => {
            createColorElement(color).classList.remove('selected');
            checkOrder();
        }, 250);

        
    } 

    //funcao que retorna a cor
    let createColorElement = (color) => {
        if(color == 0) {
            return green
        } else if(color == 1) {
            return red
        }else if(color == 2) {
            return yellow
        } else if(color == 3) {
            return blue
        }
    }


    //checa seo botão clicado são iguais o da ordem gerada
    let checkOrder = () => {
        for(let i in clickedOrder) {
            if(clickedOrder[i] != order[i]){
                gameOver();
                break;
            }
        }

        if(clickedOrder.length == order.length) {
            msg.innerText = 'Acertou!';          
        }
    }

    
    // funcao para proximo nivel do jogo
    let nextLevel = () => {
        msg.innerText = '';
        score++;
        pontos.innerText = score;
        shuffleOrder();
    }

    //funcao para game over
    let gameOver = () => {

        alert(`pontuação: ${score}! \nVocê perdeu o jogo!\n Clique em ok para iniciar um novo jogo`);
        
        order = [];
        clickedOrder = [];
        playGame();
    }

    //função que inicia o jogo
    let playGame = () => {
        alert('bem-vindo ao Gênesis! Iniciando novo jogo')
        score = 0; 

        nextLevel();
    }

    //escutadores de evento de click nas cores
    green.addEventListener('click', click(0));
    red.addEventListener('click', click(1));
    yellow.addEventListener('click', click(2));
    blue.addEventListener('click', click(3));

    //atribuição de valores no array a partir do click
    green.onclick = () =>  click(0);
    red.onclick = () =>  click(1);
    yellow.onclick = () =>  click(2);
    blue.onclick = () =>  click(3);

    playGame();

    //adiciona função de avançar para o prox nivel ao botão 'proximo nivel'
    prox.onclick = () => nextLevel();
}

jogar.onclick = () => iniciaJogo()