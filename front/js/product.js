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
    makeImage(imageUrl, altTxt);
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