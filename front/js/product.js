function init() {
//la variable params récupère l'url de la page
const queryString = window.location.search;
const Params = new URLSearchParams(queryString);
// la variable id va récupérer la valeur du paramètre _id
const id = Params.get("id");
console.log({id}); 
    fetch("http://localhost:3000/api/products/"+id)
      .then((res) => res.json())
      .then((data) => lesProduits(data));
  }
  init();
  function lesProduits(produit) {
    const imageUrl = produit.imageUrl;
    const altTxt = produit.altTxt;
    const name = produit.name;
    const price = produit.price;
    const description = produit.description;
    const colors = produit.colors;
    makeImage(imageUrl, altTxt);
    makeH1(name)
    makePrice(price)
    makeDescription(description)
    makeColor(colors)
  }
  function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = altTxt;
    const parent = document.querySelector(".item__img");
    if (parent != null) {
      parent.appendChild(image);
  }
}
function makeH1(name) {
  const h1 = document.querySelector("#title");
  if (h1 != null) {
    h1.textContent=name

  }
}
function makePrice(price){
  const span= document.querySelector("#price");
  if (span!= null) {
    span.textContent=price
}
}
function makeDescription(description) {
  const p = document.querySelector("#description");
  if (p != null) {
    p.textContent=description

  }
}
function makeColor(colors){
  const select = document.querySelector("#colors");
  if (select != null) {
    for (i = 0; i < colors.length; i++) {
      const option=document.createElement("option")
      
      option.value=colors[i] 
      console.log(option)
      option.textContent=colors[i]
      select.appendChild(option)
  }
  }

  }


