import BaseURL from "./BaseURL.js"
import { GetAllPhones, GetPhonesById, UpdateData } from "./request.js"


let userId = JSON.parse(localStorage.getItem("userInfo"))
let row = document.querySelector(".row")



function GetFavorites() {
    GetPhonesById(`${BaseURL}/users`, userId)
        .then(res => {
            let user = res.phones
            let MyFavs = res.phones.favorites
            GetAllPhones(`${BaseURL}/phones`)
                .then((res) => {
                    let phones = res.phones
                    let myFavoritePhones = phones.filter(phones => MyFavs.includes(phones.id))

                    myFavoritePhones.forEach(element => {
                        row.innerHTML += `
                <div class="col-md-3 col-sm-4">
            <div class="card">
        <img src="https://karbonn.in/wp-content/uploads/2023/02/Image-A28Q3JZK2L3WPW7.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h4 class="card-title">${element.brand}</h4>
    <p class="card-text">${element.model}</p>
    <p class="card-text">Price: ${element.price}</p>
    <a href="detail.html?id=${element.id}" class="btn btn-dark">Detials</a>
    <a href="#" data-id=${element.id} class="btn nofav btn-dark"><i class="fa-solid fa-heart-crack"></i></a>
    <button class="btn btn-dark add-to-basket" data-id="${element.id}"><i class="fa-solid fa-cart-plus"></i>  Basket</button>
  </div>
  </div></div>
                `
                let noFavs = document.querySelectorAll(".nofav")
                noFavs.forEach(noFav=>{
                    noFav.addEventListener("click",()=>{
                        let NoFavID = noFav.getAttribute("data-id")
                        let FindedNoFav=MyFavs.find(myFav=>myFav=NoFavID)
                        let noFavIndex = MyFavs.indexOf(FindedNoFav)
                        MyFavs.splice(noFavIndex, 1)
                        UpdateData(`${BaseURL}/users`, userId, user)
                        .then(()=>GetFavorites())

                    })
                })
                    })
                })
        }

        )
}

GetFavorites()