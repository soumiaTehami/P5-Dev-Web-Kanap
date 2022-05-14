fetch("http://localhost:3000/api/products")
.then(res=> res.json())
.then(data=> addproducts(data))

function addproducts(donnes){
const  imageUrl=donnes[0]. imageUrl
let hr=document.createElement('a');
hr.href= "http://localhost:3000/images/kanap01.jpeg"
hr.text="canape"
const items=document.querySelector("#items")
if (items !=null){
   items.appendChild(hr)
}}



