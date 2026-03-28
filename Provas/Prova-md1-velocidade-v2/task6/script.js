const email      = document.getElementById('email');
const password   = document.getElementById('password');
const confirmar  = document.getElementById('confirmar');
const pwMsg      = document.getElementById('pw-msg');
const confirmMsg = document.getElementById('confirm-msg');

function emailValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function checarRegras(valor) {
    return {
        comprimento: valor.length >= 8,
        minuscola:   /[a-z]/.test(valor),
        maiuscula:   /[A-Z]/.test(valor),
        numero:      /[0-9]/.test(valor)
    };
}

function atualizarRegras(valor) {
    const r = checarRegras(valor);
    document.getElementById('r-len').classList.toggle('ok', r.comprimento);
    document.getElementById('r-low').classList.toggle('ok', r.minuscola);
    document.getElementById('r-up').classList.toggle('ok', r.maiuscula);
    document.getElementById('r-num').classList.toggle('ok', r.numero);
}

function toggleVis(id, btn) {
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
}

function handleSubmit() {
    const regras     = checarRegras(password.value);
    const todasOk    = Object.values(regras).every(r => r);
    const emailOk    = emailValido(email.value);
    const senhaIgual = password.value === confirmar.value;

    pwMsg.textContent      = '';
    pwMsg.className        = 'field-msg';
    confirmMsg.textContent = '';
    confirmMsg.className   = 'field-msg';

    if (!emailOk) {
        pwMsg.textContent = 'E-mail inválido.';
        pwMsg.className   = 'field-msg error';
        return;
    }

    if (!todasOk) {
        pwMsg.textContent = 'A senha não atende todos os requisitos.';
        pwMsg.className   = 'field-msg error';
        return;
    }

    if (!senhaIgual) {
        confirmMsg.textContent = 'As senhas não coincidem.';
        confirmMsg.className   = 'field-msg error';
        return;
    }

    pwMsg.textContent = 'Conta criada com sucesso!';
    pwMsg.className   = 'field-msg success';
}

password.addEventListener('input', function () {
    atualizarRegras(password.value);
});