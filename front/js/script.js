function addproducts(data) {
  for (i = 0; i < data.length; i++) {
    const _id = data[i]._id;
    const imageUrl = data[i].imageUrl;
    const altTxt = data[i].altTxt;
    const name = data[i].name;
    const description = data[i].description;
    const hr = makeHr(_id);
    const h3 = makeH3(name);
    const p = makeParagraphe(description);
    const image = makeImage(imageUrl, altTxt);
    const article = document.createElement("article");
    appendElementtoHr(hr, article);
    appendElementtoArticle(article, image, h3, p);
  }
}
function init() {
  fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
      return addproducts(data);
    });
}

init();

function makeHr(_id) {
  const hr = document.createElement("a");
  hr.href = "./product.html?id=" + _id;
  return hr;
}
function makeH3(name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}
function makeParagraphe(description) {
  const p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
}
function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}
function appendElementtoHr(hr, article) {
  const items = document.querySelector("#items");
  if (items != null) {
    items.appendChild(hr);
    hr.appendChild(article);
  }
}

function appendElementtoArticle(article, image, h3, p) {
  article.appendChild(image);
  article.appendChild(h3);
  article.appendChild(p);
}
