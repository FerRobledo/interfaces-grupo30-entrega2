"use strict"

var openForm = document.querySelector(".perfil"),
    closeForm = document.getElementById("close-form"),
    form = document.querySelector(".form-container"),
    btnRegistarse = document.querySelector("#btn-registrarse"),
    login = document.querySelector(".login-container"),
    register = document.querySelector(".registro-container"),
    btnIniciarSesion = document.querySelectorAll("#btn-iniciarsesion"),
    inputsFechaNac = document.querySelectorAll('.fecha-nac input'),
    dayInput = document.querySelector('.day-input'),
    monthInput = document.querySelector('.month-input'),
    yearInput = document.querySelector('.year-input'),
    email = document.getElementById("email"),
    eyes = document.querySelectorAll(".eye"),
    pass = document.querySelectorAll(".password");


form.addEventListener("submit", e=> {
    e.preventDefault()
})

openForm.addEventListener("click", e =>{
    form.style.display = "flex"
    closeForm.style.display = "flex"
})

closeForm.addEventListener("click", e =>{
    document.body.style.overflow = "auto"
    form.style.display = "none"
    closeForm.style.display = "none"
})

btnRegistarse.addEventListener("click", e => {
    e.preventDefault()
    login.style.display = "none"
    register.style.display = "flex"
})

btnIniciarSesion.forEach(btn => {
    btn.addEventListener("click", e=> {
        e.preventDefault()
        register.style.display = "none"
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

eyes.forEach(eye => {
    eye.addEventListener("click", ()=> {
        pass.forEach(p => {
            if(p.type === "password"){
                p.type = "text"
                eye.src = './images/show-svgrepo-com.svg'
            }
            else{
                p.type = "password"
                eye.src = './images/hide-svgrepo-com.svg'
            }  
        })
        
    })
})