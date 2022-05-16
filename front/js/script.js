fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    return addproducts(data);
  });

function addproducts(data) {
    for(i=0;i<data.length;i++){
    

  const _id = data[i]._id;
  const imageUrl = data[i].imageUrl;
  const altTxt = data[i].altTxt;
  const name=data[i].name
  const description=data[i].description
  const hr = makehr(_id);
  const h3= makeH3(name)
  const p= makeparagraphe(description)
  const image=makeimage(imageUrl, altTxt)
  const article = document.createElement("article");
  console.log(article);
  appendElementtohr(hr, article);
  appendElementtoArticle(article,h3,p,image)
   
}}

function makehr(_id) {
  const hr = document.createElement("a");
  hr.href = "./product.html?id=" + _id;
  return hr;
}
function appendElementtohr(hr, article) {
  const items = document.querySelector("#items");
  if (items != null) {
    items.appendChild(hr);
    hr.appendChild(article);
    
  }}
 function makeimage(imageUrl, altTxt) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = altTxt;
    return image;
  }

function appendElementtoArticle(article,h3,p,image) {
    article.appendChild(image)
    article.appendChild(h3)
  article.appendChild(p)
}
function makeH3(name){
const h3=document.createElement("h3");
h3.textContent= name
h3.classList.add("productName")
return h3

}
function makeparagraphe(description){
    const p= document.createElement("p");
    p.textContent= description
    p.classList.add("productDescription") 
return (p)
 }

