 const html = document.querySelector('html');
 const focoBtn = document.querySelector('.app__card-button--foco');
 const curtoBtn = document.querySelector('.app__card-button--curto');
 const longoBtn = document.querySelector('.app__card-button--longo');
 const imagem = document.querySelector('.app__image');
 const titulo = document.querySelector('.app__title');
 const botoes = document.querySelectorAll('.app__card-button');
 const iniciarBtn = document.querySelector('#start-pause span');
 const iniciarBtnImg = document.querySelector('#start-pause img');
 const musicaInput = document.querySelector('#alternar-musica');
 const musica = new Audio('./sons/luna-rise-part-one.mp3');
 const playBtn = document.querySelector('#start-pause');
 const playSom = new Audio('./sons/play.wav');
 const pauseSom = new Audio('./sons/pause.mp3');
 const stopSom = new Audio('./sons/beep.mp3');
 const timer = document.querySelector('#timer')

 let temporizador = 1500;
 let intervaloId = null
 musica.loop = true;
 

    musicaInput.addEventListener('change', () => {
        if(musica.paused){
            musica.play();
        }else{
            musica.pause();
        }
    })
 focoBtn.addEventListener('click', () => {
    temporizador = 1500;
    alterarContexto('foco');
    focoBtn.classList.add('active');
});
curtoBtn.addEventListener('click', () => {
    temporizador = 300;
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active');
})
longoBtn.addEventListener('click', () => {
    temporizador = 900;
    alterarContexto('descanso-longo');
    longoBtn.classList.add('active');
})

function alterarContexto(contexto) {
    showTimer();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de retornar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            default:
        break;
        
    }
}
const contagem =() => {
    if(temporizador <= 0){
        //stopSom.play();
        alert('Tempo finalizado!')
        parar();
        return
    }
    temporizador -= 1;
    showTimer();
}
playBtn.addEventListener('click', iniciar)
function iniciar(){
    if(intervaloId){
        pauseSom.play();
        iniciarBtnImg.setAttribute('src', './imagens/play_arrow.png');
        iniciarBtn.innerHTML = 'Começar';
        parar();
        return
    }
    playSom.play();
    iniciarBtn.innerHTML = 'Pausar';
    iniciarBtnImg.setAttribute('src', './imagens/pause.png');
    intervaloId = setInterval(contagem, 1000);
}
function parar(){
    clearInterval(intervaloId);
    intervaloId=null;
}
function showTimer (){
    const time = new Date(temporizador * 1000);
    const formatedTime = time.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })
    timer.innerHTML = `${formatedTime}`
}
showTimer();