let inputEmail = document.querySelector('#email')
let inputPassword = document.querySelector('#password')
let btnLogin = document.querySelector('#login')
const auth = firebase.auth()

btnLogin.addEventListener('click', () => {
    auth.signInWithEmailAndPassword(inputEmail.value, inputPassword.value).then(() => {
        alert("Você está autenticado.")
        location.replace('/')
    }).catch(error => {
        console.log(error.code)
        console.log(error.message)
    })
})