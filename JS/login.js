import BaseURL from "./BaseURL.js"
import { GetAllPhones } from "./request.js"

let loginForm=document.querySelector(".login-form")
let email=document.querySelector("#email")
let password=document.querySelector("#password")




loginForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    GetAllPhones(`${BaseURL}/phones`)
    .then((res)=>{
        let users=res.phones
        let findedUser= users.find(user=> user.email==email.value && user.password==password.value)
       if(findedUser){
          localStorage.setItem("userInfo",JSON.stringify(findedUser.id))
          window.location.href="index.html"
       }else{
          alert("Invalid username or password")
       }
    })
})