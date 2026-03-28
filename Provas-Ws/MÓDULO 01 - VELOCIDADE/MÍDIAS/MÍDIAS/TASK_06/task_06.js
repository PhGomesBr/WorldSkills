const handleSubmit = (e) => {
    e.preventDefault()
    const password = document.querySelector("#password").value
    const confirmPassword = document.querySelector("#passwordConfirmation").value
    const feedback = document.querySelector("#feedback")

    if (password !== confirmPassword) feedback.innerHTML("Senhas não são iguais")
    if (password.length < 8) feedback.innerHTML("Sua senha deve ter mais de 8 caracteres")
    if (!/[a-z]/.test(password)) feedback.innerHTML("Sua senha deve possuir letras minúsculas") 
    if (!/[A-Z]/.test(password)) feedback.innerHTML("Sua senha deve possuir letras maiúsculas") 
    if (!/[0-9]/.test(password)) feedback.innerHTML("Sua senha deve possuir ao menos um número") 
}