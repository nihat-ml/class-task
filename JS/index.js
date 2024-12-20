
import BaseURL from "./BaseURL.js";
import { GetAllPhones, GetPhonesById, UpdateData } from "./request.js";

let row = document.querySelector(".row")
let loginDiv = document.querySelector(".loginDiv")
let logoutDiv = document.querySelector(".logoutDiv")
let loginBtn = document.querySelector(".login")
let favpage = document.querySelector(".favpage")

let userid = localStorage.getItem("userInfo") || null


function newNav() {
  let userid = localStorage.getItem("userInfo") || null
  if (userid) {
    loginDiv.style.display = "none"
    GetAllPhones(BaseURL + "/users")
      .then(res => {
        let persons = res.phones
        persons.forEach(person => {
          logoutDiv.innerHTML = `
              <span>${person.name}</span>
              <button class="btn logout btn-outline-danger" type="submit">Log Out</button>`
        })
        let logoutBtn = document.querySelector(".logout")
        logoutBtn.addEventListener("click", (e) => {
          e.preventDefault()
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log out!"
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem("userInfo")
              Swal.fire({
                title: "Log outed!",
                text: "You have been log out succesfuly.",
                icon: "success"
              });
              newNav()
            }
          });
        })
      })
  }
  else {
    loginDiv.style.display = "block"
    logoutDiv.style.display = "none"
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.location.href = "login.html"
    })
  }
}
newNav()

function GetData() {
  GetAllPhones(`${BaseURL}/phones`)
    .then(res => ShowAllPhones(res.phones))
}

GetData()



function ShowAllPhones(array) {
  row.innerHTML = ""
  array.forEach(element => {


    row.innerHTML += `
     <div class="col-md-3 col-sm-4">
            <div class="card">
        <img src="https://karbonn.in/wp-content/uploads/2023/02/Image-A28Q3JZK2L3WPW7.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h4 class="card-title">${element.brand}</h4>
    <p class="card-text">${element.model}</p>
    <p class="card-text">Price: ${element.price}</p>
    <a href="detail.html?id=${element.id}" class="btn btn-dark">Detials</a>
    <a href="#" data-id=${element.id} class="btn fav btn-dark"><i class="fa-solid fa-heart"></i></a>
    <button class="btn btn-dark add-to-basket" data-id="${element.id}"><i class="fa-solid fa-cart-plus"></i>  Basket</button>
  </div>
  </div></div>`

    let favBtns = document.querySelectorAll(".fav")
    favBtns.forEach(favBtn => {
      favBtn.addEventListener("click", () => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"))
        if (!userInfo) {
          alert("login olmadiginiz ucun favorit-e mehsul ata bilmersiz.")
          window.location.href = "login.html"
        } else {
          let prodId = favBtn.getAttribute("data-id")
          let userId = userInfo
          AddFavorites(userId, prodId)
        }
      })
    })

  });
}

function AddFavorites(userId, prodId) {
  GetPhonesById(`${BaseURL}/users`, userId)
    .then(res => {
      if (!res.phones.favorites.includes(prodId)) {
        res.phones.favorites.push(prodId)
        UpdateData(`${BaseURL}/users`, userId, res.phones)
      } else {
        alert("Bu mehsul favorite-de var artiq!")
      }
    })

}
 favpage.addEventListener("click", ()=>{
  window.location.href="favorite.html"
 })







