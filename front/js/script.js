fetch('https://http//localhost:3000/back/product')
     .then(res=> res.json())
     .then(data=> console.log(data))