import { GetPhonesById } from "./request.js";
import BaseURL from "./BaseURL.js";



let id = new URLSearchParams(window.location.search).get("id")





let row = document.querySelector(".row")

GetPhonesById(`${BaseURL}/phones`, id)
.then(res =>ShowAllPhones(res.phones))


function ShowAllPhones({brand, model, operatingSystem, year, price}){
    row.innerHTML=` <div class="col-12 col-md-8">
                <div class="card">
                    <div class="row no-gutters">
                       
                        <div class="col-md-4">
                            <img src="https://karbonn.in/wp-content/uploads/2023/02/Image-A28Q3JZK2L3WPW7.png" class="card-img" alt="...">
                        </div>
                       
                        <div class="col-md-8">
                            <div class="card-body">
                                <div>
                                    <h4 class="card-title">${brand}</h4>
                                    <p class="card-text">${model}</p>
                                    <p class="card-text">Operating System: ${operatingSystem}</p>
                                    <p class="card-text">Year: ${year}</p>
                                    <p class="card-text">Price: ${price}</p>
                                    <a href="#" class="btn btn-success"><i class="fa-solid fa-basket-shopping"></i></a>
                                    <a href="#" class="btn btn-dark"><i class="fa-solid fa-heart"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    
}