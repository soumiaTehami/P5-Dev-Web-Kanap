const cart=[]
affichagePanier()
cart.forEach((item) => affiche(item))
function affichagePanier() {
const numbItem=localStorage.length
for (let i = 0; i < numbItem ; i++) {
    const item=localStorage.getItem(localStorage.key(i)) ||"";
    const itemObj=JSON.parse(item)
    cart.push(itemObj)
 }
 console.log(cart)
}
function affiche(item){
const article = makeArticle(item);
const div = makeImage(item);
const cart= cartItemContent(item)
appendArticle(article)
article.appendChild(div)
article.appendChild(cart)
console.log(article)

}
function appendArticle(article){
    document.querySelector("#cart__items").appendChild(article)
    
    
}
function makeArticle(item){
 const article = document.createElement("article");
 article.classList.add("cart__item")
 article.dataset.id=item.id
 article.dataset.color=item.color 

 return article
}

function makeImage(item) {
    const div = document.createElement("div"); 
    div.classList.add("cart__item__img")
    const image = document.createElement("img");
    image.src = item.imageUrl;
    image.alt = item.altTxt;
    div.appendChild(image)
    return div;
  }
  function cartItemContent(item){
    const div = document.createElement("div"); 
    div.classList.add("cart__item__content")
    const description=cartDescription (item)
    div.appendChild(description)
    const setting=cartsettings(item)
    div.appendChild(setting)
    return div
  }
 function cartDescription (item){
    const description=document.createElement("div");
    description.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2"); 
    h2.textContent=item.name
    const p = document.createElement("p"); 
    p.textContent=item.color
    const p2 = document.createElement("p"); 
    p2.textContent=item.price + "€"
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
    
  }
  function cartsettings(item){
    const div = document.createElement("div"); 
    div.classList.add("cart__item__content__settings")
    const d=document.createElement("div");
    d.classList.add("cart__item__content__settings__quantity")
    const p= document.createElement("p"); 
    p.textContent="Qté :"
    div.appendChild(d)
    d.appendChild(p)
    const input = document.createElement("input"); 
    input.classList.add("itemQuantity")
    input.type="Number"
    input.name="itemQuantity"
    input.min="1"
    input.max="100"
    input.value=item.quantity
    d.appendChild(input)


    return div

  }
