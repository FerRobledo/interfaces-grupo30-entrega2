"use strict"

var openForm = document.querySelector(".perfil"),
    closeForm = document.getElementById("close-form"),
    form = document.querySelector(".form-container"),
    mostrarRegistro = document.getElementById("btn-registrarse"),
    login = document.querySelector(".login-container"),
    register = document.querySelector(".registro-container"),
    btnIniciarSesion = document.querySelectorAll(".btn-iniciarsesion"),
    inputsFechaNac = document.querySelectorAll('.fecha-nac input'),
    dayInput = document.querySelector('.day-input'),
    monthInput = document.querySelector('.month-input'),
    yearInput = document.querySelector('.year-input'),
    email = document.getElementById("email"),
    passEye = document.getElementById('password-eye'),
    pass = document.getElementById("password"),
    confirmEye = document.getElementById("confirm-pass-eye"),
    confirmPass = document.getElementById("confirm-password"),
    success = document.querySelector(".success"),
    sendRegister = document.querySelector(".registro"),
    closeIcon = document.querySelector("#closeIcon");


openForm.addEventListener("click", e =>{
    form.style.display = "flex"
    closeForm.style.display = "flex"
})

closeForm.addEventListener("click", e =>{
    document.body.style.overflow = "auto"
    form.style.display = "none"
    closeForm.style.display = "none"
})

closeIcon.addEventListener("click", e =>{
    document.body.style.overflow = "auto"
    form.style.display = "none"
    closeForm.style.display = "none"
})

mostrarRegistro.addEventListener("click", e => {
    e.preventDefault()
    login.style.display = "none"
    register.style.display = "flex"
})

btnIniciarSesion.forEach(btn => {
    btn.addEventListener("click", e=> {
        e.preventDefault()
        register.style.display = "none"
        success.style.display = "none"
        login.style.display = "flex"
    })  
})

/** Validación de la fecha de nacimiento */

dayInput.addEventListener('input', () => {
    if (dayInput.value.length === 2)
        monthInput.focus()
    if (monthInput.value.length > 2)
        monthInput.value = monthInput.value.slice(0, 2)
});

monthInput.addEventListener('input', () => {
    if (monthInput.value.length === 2)
        yearInput.focus()
    if (monthInput.value.length > 2)
        monthInput.value = monthInput.value.slice(0, 2)
});

yearInput.addEventListener('input', ()=> {
    if(yearInput.value.length === 4)
        email.focus()
    if(yearInput.value.length > 4)
        yearInput.value = yearInput.value.slice(0, 4)
})

/** Show password */

passEye.addEventListener("click", e =>{
    if(pass.type === "password"){
        pass.type = "text"
        passEye.src = './images/show-svgrepo-com.svg'
    } else{
        pass.type = "password"
        passEye.src = './images/hide-svgrepo-com.svg'
    }
    
})

confirmEye.addEventListener("click", e =>{
    if(confirmPass.type === "password"){
        confirmPass.type = "text"
        confirmEye.src = './images/show-svgrepo-com.svg'
    } 
    else{
        confirmPass.type = "password"
        confirmEye.src = './images/hide-svgrepo-com.svg'
    }
})

sendRegister.addEventListener("submit", e=>{
    e.preventDefault()
    success.style.display = "flex"
})


function updatePlaceholders() {
    if (window.innerWidth <= 480) {
        pass.placeholder = 'Su contraseña';
        confirmPass.placeholder = 'Su contraseña';
    } else {
        pass.placeholder = 'Escriba su contraseña';
        confirmPass.placeholder = 'Escriba su contraseña';
    }
}

window.addEventListener('load', updatePlaceholders);
window.addEventListener('resize', updatePlaceholders);
