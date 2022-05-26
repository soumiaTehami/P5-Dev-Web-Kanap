const cart=[]
affichagePanier()
function affichagePanier() {
const numbItem=localStorage.length
for (let i = 0; i < numbItem ; i++) {
    const item=localStorage.getItem(localStorage.key(i));
    const itemObj=JSON.parse(item)
    cart.push(itemObj)
 }
 console.log(cart)
}
