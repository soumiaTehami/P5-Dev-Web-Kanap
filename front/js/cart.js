const cart = [];

function init() {
  const nbKanap = localStorage.length;
  for (let i = 0; i < nbKanap; i++) {
    // Recuperation du kanap depuis le localstorage
    const item = localStorage.getItem(localStorage.key(i)) || "";
    const itemObj = JSON.parse(item); // notre canapé est dans la variable itemObj
    //console.log("key : " + localStorage.key(i));
    cart.push(itemObj); //ajouté id et quantité cart
  }
  //recuperer infos sur le kanap depuis l'API
  fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((data) => {
      return affiche(data);
    });
}

init();

function affiche(products) {
  cart.forEach((product) => {
    let productapi = products.find((item) => item._id == product.id);
    product.imageUrl = productapi.imageUrl;
    product.altTxt = productapi.altTxt;
    product.name = productapi.name;
    product.description = productapi.description;
    product.price = productapi.price;
    const article = makeArticle(product);
    const div = makeImage(product);
    const cart = cartItemContent(product);
    appendArticle(article);
    article.appendChild(div);
    article.appendChild(cart);
    //console.log(article);
    totalprice(product);
    totalQuantity(product);
  });
}
function totalQuantity() {
  let total = 0;

  cart.forEach((item) => {
    const totalQuantity = item.quantity;
    total += totalQuantity;
  });
  document.getElementById("totalQuantity").textContent = total;
}
function totalprice() {
  let total = 0;

  cart.forEach((item) => {
    const totalprice = item.price * item.quantity;
    total += totalprice;
  });
  document.getElementById("totalPrice").textContent = total;
}
function appendArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}
function makeArticle(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;

  return article;
}
function makeImage(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");
  const image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.altTxt;
  div.appendChild(image);
  return div;
}

function cartItemContent(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content");
  const description = cartDescription(item);
  div.appendChild(description);
  const setting = cartsettings(item);
  div.appendChild(setting);
  const delet = cartDelete(item);
  div.appendChild(delet);
  return div;
}
function cartDescription(item) {
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");
  const h2 = document.createElement("h2");
  h2.textContent = item.name;
  const p = document.createElement("p");
  p.textContent = item.color;
  const p2 = document.createElement("p");
  p2.textContent = item.price + "€";
  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(p2);
  return description;
}
function cartsettings(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings");
  const d = document.createElement("div");
  d.classList.add("cart__item__content__settings__quantity");
  const p = document.createElement("p");
  p.textContent = "Qté :";
  div.appendChild(d);
  d.appendChild(p);
  const input = document.createElement("input");
  input.classList.add("itemQuantity");
  input.type = "Number";
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;
  input.addEventListener("input", () =>
    modifierPriceQauntity(item.id, input.value, item)
  );
  d.appendChild(input);

  return div;
}
function cartDelete(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");
  div.addEventListener("click", () => deleteItem(item));
  const p = document.createElement("p");
  p.classList.add("deleteItem");
  p.textContent = "Supprimer";
  div.appendChild(p);
  return div;
}
function deleteItem(item) {
  const itemDlette = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  );

  cart.splice(itemDlette, 1);

  totalprice();
  totalQuantity();
  deleteDataKanap(item);
  deleteArticle(item);
}
//delete article de page panier
function deleteArticle(item) {
  const deleteArticl = document.querySelector(
    ` article[data-id="${item.id}"][data-color= "${item.color}"]`
  );
  deleteArticl.remove();
}
//delete article de lacalstorage
function deleteDataKanap(item) {
  const key = item.id + "_" + item.color;
  localStorage.removeItem(key);
}
//modifier la quantity
function modifierPriceQauntity(id, nouvValue, item) {
  const itemModifier = cart.find(
    (item) => item.id === id && item.color === color
  );
  itemModifier.quantity = Number(nouvValue);
  item.quantity = itemModifier.quantity;
  totalprice();
  totalQuantity();
  saveNewDataKanap(item);
}
//save la modifier a localstorage
function saveNewDataKanap(item) {
  let dataSave = JSON.stringify(item);
  const key = item.id + "_" + item.color;
  localStorage.setItem(key, dataSave);
}
const buttonCommande = document.querySelector("#order");
buttonCommande.addEventListener("click", (e) => submitFrom(e));

function submitFrom(e) {
  e.preventDefault(); //ne pas rafraîchir la page
  if (cart.length === 0) {
    alert("entrez un produits");
    return;
  }
  if (invalidateForm()) return;
  if (emailInvalide()) return;
  if (NOMInvalide()) return;
  if (PrenomInvalide()) return;
  if (adresseInvalide()) return;
  if ( cityInvalide()) return;
  
 
  function invalidateForm() {
    const form = document.querySelector(".cart__order__form");
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.value === "") {
         alert("remplir tous les champs");
        return true;
      }
      return false;
    });
  }
  function emailInvalide() {
    const emailErrField = document.getElementById("emailErrorMsg");
    const email = document.querySelector("#email").value;
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email) === false) {
      emailErrField.innerHTML = "Merci de saisir une adresse email valide.";
      return true;
    }
    return false;
  }
  function NOMInvalide() {
    const firstNameErrField = document.getElementById("firstNameErrorMsg");
    const nom = document.querySelector("#firstName").value;
    const regex = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/;
    if (regex.test(nom) === false) {
      firstNameErrField.innerHTML = "Merci de saisir un prénom valide.";

      return true;
    }
    return false;
  }
  function cityInvalide() {
    const cityErrField = document.getElementById('cityErrorMsg')
    const city = document.querySelector("#city").value;
    const regex =/^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/;
    if (regex.test(city) === false) {
      cityErrField.innerHTML = 'Merci de saisir un nom de ville valide.'

      return true;
    }
    return false;
  }
  function PrenomInvalide() {
    const lastNameErrField = document.getElementById("lastNameErrorMsg");
    const prenom = document.querySelector("#lastName").value;
    const regex = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/;
    if (regex.test(prenom) === false) {
      lastNameErrField.innerHTML = "Merci de saisir un nom valide.";

      return true;
    }
    return false;
  }
  function adresseInvalide() {
    const addressErrField = document.getElementById('addressErrorMsg')
   const adresse = document.querySelector("#address").value;
   const regex =/([0-9]{1,}) ?([A-zÀ-ú,' -\. ]*)/
    
    if (regex.test(adresse) === false) {
      addressErrField.innerHTML = 'Merci de saisir une adresse valide.'

    return true;
    }
    return false;
  }
  
  
  const form = document.querySelector(".cart__order__form");
  const body = cartOrder();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href =
        "/front/html/confirmation.html" + "?orderId=" + orderId;
      console.log(data);
    })
    .catch((error) => console.log(error));

  //console.log(form.elements.firstName.value)
}

function cartOrder() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;

  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIds(),
  };
  return body;
}
function getIds() {
  const numberProducts = localStorage.length;
  const ids = [];
  for (let i = 0; i < numberProducts; i++) {
    const key = localStorage.key(i);
    const id = key.split("_")[0];
    ids.push(id);
    //console.log(id);
  }
  return ids;
}
