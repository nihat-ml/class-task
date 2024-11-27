import BaseURL from "./BaseURL.js";
import { GetAllPhones } from "./request.js";

let row = document.querySelector(".row")


function GetData() {
  GetAllPhones(`${BaseURL}/phones`)
    .then(res => ShowAllPhones(res.phones))
}

GetData()



function ShowAllPhones(array) {
  row.innerHTML = ""
  array.forEach(element => {
    console.log(element);
    
    row.innerHTML += `
     <div class="col">
            <div class="card">
        <img src="https://karbonn.in/wp-content/uploads/2023/02/Image-A28Q3JZK2L3WPW7.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h4 class="card-title">${element.brand}</h4>
    <p class="card-text">${element.model}</p>
    <p class="card-text">Price: ${element.price}</p>
    <a href="detail.html?id=${element.id}" class="btn btn-dark">Detials</a>
    <a href="#" class="btn btn-dark"><i class="fa-solid fa-heart"></i></a>
  </div>
  </div></div>`

  });
}