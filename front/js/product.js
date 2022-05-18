//la variable params récupère l'url de la page
const queryString = window.location.search;
const Params = new URLSearchParams(queryString);
// la variable id va récupérer la valeur du paramètre _id
const Id = Params.get("id");
console.log({Id}); 