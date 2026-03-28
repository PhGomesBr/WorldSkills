const personagem = document.querySelector("#personagem");
let timer;

personagem.addEventListener('mouseenter', () => {
    timer = setTimeout(() => {
        personagem.style.animation = 'andar 0.5s steps(6) infinite';
    }, 500);
});

personagem.addEventListener('mouseleave', () => {
    clearTimeout(timer);
    personagem.style.animation = 'none';
});