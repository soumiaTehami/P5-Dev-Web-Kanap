fetch("http://localhost:3000/api/products")
.then(res=> res.json())
.then(data=> {
    return addproducts(data)})

function addproducts(data){
const _id=data[0]._id
const hr=  makehr( _id)
appendElementtohr(hr)

} 

    function makehr(_id){
        const hr=document.createElement('a');
        hr.href= "./product.html?id="+_id
        return hr
    }
    function appendElementtohr(hr){
        const items=document.querySelector("#items")
        if (items !=null){
        items.appendChild(hr)
    
        }

    }