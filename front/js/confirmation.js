const orderId=getorderId()
affichageorderId(orderId)
deleteLocaleStorage()
function getorderId(){
const queryString = window.location.search;
const Params = new URLSearchParams(queryString);
const orderId = Params.get("orderId");
return orderId
}
function affichageorderId(orderId){
const orderIdElement=document.getElementById("orderId")
orderIdElement.textContent=orderId

}
function deleteLocaleStorage(){
    const delet=window.localStorage
    delet.clear()
}
