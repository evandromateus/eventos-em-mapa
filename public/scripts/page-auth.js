let inputEmail = document.querySelector('#email')
let inputPassword = document.querySelector('#password')
let inputName = document.querySelector('#name')
let btnRegister = document.querySelector('#register')
let btnLogin = document.querySelector('#login')
const auth = firebase.auth()

btnRegister.addEventListener('click', () => {
    auth.createUserWithEmailAndPassword(inputEmail.value, inputPassword.value).then(res => {

        const user = firebase.auth().currentUser

        user.updateProfile({
            displayName: inputName.value
        })

        console.log(res)
        alert("Bem vindo. Você está cadastrado.")
        location.replace('/')

    }).catch(error => {
        console.log(error.code)
        console.log(error.message)
    })
})

btnLogin.addEventListener('click', () => {
    auth.signInWithEmailAndPassword(inputEmail.value, inputPassword.value).then(user => {
        alert("Você está autenticado.")
        alert(user.displayName)
        location.replace('/')
    }).catch(error => {
        console.log(error.code)
        console.log(error.message)
    })
})