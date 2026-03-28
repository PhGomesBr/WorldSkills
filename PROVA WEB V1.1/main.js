function toggleMenu() {
      const sidebar = document.getElementById('sidebar');
      const btn = document.getElementById('menuBtn');

      sidebar.classList.toggle('active');//Toggle, serve para alternar entre os modos ligado/desligado, nesse caso ele adiciona a classe se nao tiver e remove se tiver, adiciona esta classe para mostrar o menu lateral
      btn.classList.toggle('active'); // A mesma coisa, porem para mudar e ativar a animação do X do menu hamburguer

    }
function showTab(tabId, button) {

  // 🔹 Esconde todos os conteúdos
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });

  // 🔹 Remove active de todos os botões
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });

  // 🔹 Mostra o conteúdo clicado
  document.getElementById(tabId).classList.add('active');

  // 🔹 Ativa o botão clicado
  button.classList.add('active');
}
