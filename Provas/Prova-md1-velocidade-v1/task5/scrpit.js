const personagem = document.querySelector('.personagem');

personagem.addEventListener('mouseenter', () => {
    // aqui você INICIA a animação
    personagem.style.animation = 'walk 1s steps(4) infinite';
});

personagem.addEventListener('mouseleave', () => {
    // aqui você PARA a animação
    personagem.style.animation = 'none';
    
});