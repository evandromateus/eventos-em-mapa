let btnLogout = document.querySelector('.user-info button')

    btnLogout.addEventListener('click', () => {
        firebase.auth().signOut().then(() => {
            alert('Desconectado.')
            location.replace('/')
        }).catch(err => {
            console.log(err.code)
            console.log(err.message)
        })
    })
