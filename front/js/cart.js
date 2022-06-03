const cart = [];
affichagePanier();
cart.forEach((item) => affiche(item));
function affichagePanier() {
  const numbItem = localStorage.length;
  for (let i = 0; i < numbItem; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || "";
    const itemObj = JSON.parse(item);
    cart.push(itemObj);
  }
  console.log(cart);
}
function affiche(item) {
  const article = makeArticle(item);
  const div = makeImage(item);
  const cart = cartItemContent(item);
  appendArticle(article);
  article.appendChild(div);
  article.appendChild(cart);
  console.log(article);
  totalprice(item);
  totalQuantity(item);
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
  deleteNewDataKanap(item);
  deleteArticle(item);
}
function deleteArticle(item) {
  const deleteArticl = document.querySelector(
    ` article[data-id="${item.id}"][data-color= "${item.color}"]`
  );
  deleteArticl.remove();
}
function deleteNewDataKanap(item) {
  const key = item.id + "_" + item.color;
  localStorage.removeItem(key);
}
function modifierPriceQauntity(id, nouvValue, item) {
  const itemModifier = cart.find((item) => item.id === id);
  itemModifier.quantity = Number(nouvValue);
  item.quantity = itemModifier.quantity;
  totalprice(item);
  totalQuantity(item);
  saveNewDataKanap(item);
}
function saveNewDataKanap(item) {
  let dataSave = JSON.stringify(item);
  const key = item.id + "_" + item.color;
  localStorage.setItem(key, dataSave);
}
