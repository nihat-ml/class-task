import BaseURL from "./BaseURL.js"
import { PostData, GetAllPhones } from "./request.js"

let registerForm=document.querySelector(".resgister-form")
let name=document.querySelector("#name")
let surname=document.querySelector("#surname")
let email=document.querySelector("#email")
let password=document.querySelector("#password")


registerForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    let newUser={
        name:name.value,
        surname:surname.value,
        email:email.value,
        password:password.value,
        isAdmin:false,
        favorites:[]
    }




GetAllPhones(`${BaseURL}/users`)
.then(res=>{
    let users=res.phones
    let findedUser=users.find(user=>user.email==email.value)
    if(findedUser){
        alert("Bu email artiq qeydiyyatdan kecirilib")
    }else{
        
    PostData(`${BaseURL}/users`,newUser)
    .then(()=>{
        window.location.href="login.html"
    })
    }
})


})