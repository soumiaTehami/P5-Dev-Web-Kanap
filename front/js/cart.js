const cart=[]
affichagePanier()
cart.forEach((item) => affiche(item))
function affichagePanier() {
const numbItem=localStorage.length
for (let i = 0; i < numbItem ; i++) {
    const item=localStorage.getItem(localStorage.key(i));
    const itemObj=JSON.parse(item)
    cart.push(itemObj)
 }
 console.log(cart)
}
function affiche(item){
const article = makeArticle(item);
const div = makeImage(item);
appendArticle(article)
article.appendChild(div)

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
