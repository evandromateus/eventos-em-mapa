let inputEmail = document.querySelector('#email')
let inputPassword = document.querySelector('#password')
let inputName = document.querySelector('#name')
let btnRegister = document.querySelector('#register')
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

