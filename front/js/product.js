//la variable params récupère l'url de la page
const queryString = window.location.search;
const Params = new URLSearchParams(queryString);
// la variable id va récupérer la valeur du paramètre _id
const id = Params.get("id");
console.log({id}); 
function init() {
    fetch("http://localhost:3000/api/products/"+id)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  init();