"use strict"

const openForm = document.querySelector(".perfil"),
      closeForm = document.getElementById("close-form"),
      form = document.querySelector(".form-container"),
      btnRegistarse = document.querySelector(".btn-registrarse"),
      login = document.querySelector(".login-container"),
      register = document.querySelector(".registro-container"),
      btnIniciarSesion = document.querySelector(".btn-iniciarsesion")

openForm.addEventListener("click", e =>{
    form.style.display = "flex"
    closeForm.style.display = "flex"
})

closeForm.addEventListener("click", e =>{
    form.style.display = "none"
    closeForm.style.display = "none"
})

btnRegistarse.addEventListener("click", e => {
    login.style.display = "none"
    register.style.display = "flex"
})

btnIniciarSesion.addEventListener("click", e=> {
    login.style.display = "flex"
    register.style.display = "none"
})