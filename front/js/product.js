
  //la variable params récupère l'url de la page
  const queryString = window.location.search;
  const Params = new URLSearchParams(queryString);
  // la variable id va récupérer la valeur du paramètre _id
  const id = Params.get("id");

  if(id != null){
    let priceItem=0
    let imgUrl,altText,nameArticle
  }

 

  fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => lesProduits(data));

function lesProduits(produit) {
  const imageUrl = produit.imageUrl;
  const altTxt = produit.altTxt;
  altText=altTxt
  imgUrl=imageUrl
  const name = produit.name;
  nameArticle=name
  const price = produit.price;
  priceItem=price
  const description = produit.description;
  const colors = produit.colors;
  makeImage(imageUrl, altTxt);
  makeH1(name);
  makePrice(price);
  makeDescription(description);
  makeColor(colors);
}
function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const img = document.querySelector(".item__img");
  if (img != null) {
    img.appendChild(image);
  }
}
function makeH1(name) {
  const h1 = document.querySelector("#title");
  if (h1 != null) {
    h1.textContent = name;
  }
}
function makePrice(price) {
  const span = document.querySelector("#price");
  if (span != null) {
    span.textContent = price;
  }
}
function makeDescription(description) {
  const p = document.querySelector("#description");
  if (p != null) {
    p.textContent = description;
  }
}
function makeColor(colors) {
  const select = document.querySelector("#colors");
  if (select != null) {
    for (i = 0; i < colors.length; i++) {
      const option = document.createElement("option");
      option.value = colors[i];
      option.textContent = colors[i];
      select.appendChild(option);
    }
  }
}

const button = document.getElementById("addToCart");
if (button != null) {

  button.addEventListener("click", function () {
    let total=0
    const price=document.querySelector("#price")
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
  
    
    if (
      color == null ||
      color === "" ||
      quantity == null ||
      quantity == 0 ||
      quantity > 100
    ) {
      alert(
        "Pour valider le choix de cet article, veuillez renseigner une couleur, et une quantité valide entre 1 et 100"
      );
      return;
    } 
      const kanap = {
        id: id,
        price:priceItem,
        color: color,
        quantity:Number(quantity),
        imageUrl:imgUrl,
        name:nameArticle,
        altTxt:altText
      };

      localStorage.setItem(id + "_" + color, JSON.stringify(kanap));
      window.location.href="cart.html"
      // localStorage.setItem("toto", JSON.stringify(kanap))
      // const itemFrom=  JSON.parse(localStorage.getItem(id))

      //console.log("vous avez ajouté au panier le canapé de couleur " +itemFrom.color+ " en quantité " + itemFrom.quantity)
      kanap.forEach(item => {
         quantity=item.quantity+item.quantity
        total+=quantity
      }) 
      quantity.textContent=total
      
    
  });
}
