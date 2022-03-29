function renderProduct () {
  let id = Cookies.get('product')
  axios.get(`http://localhost:3333/product/${id}`)
  .then (response => {
    [product] = response.data
    console.log(product);

    document.querySelector('.container-preco-produto').innerHTML = `
    <h4 id="preco-com-desconto">${product.price.toLocaleString("pt-br", {
      style: "currency",
    currency: "BRL",})}</h4>
    <button onclick="productCart(${product.id})">Comprar</button>
    `

    document.querySelector('.container-descricao-produto').innerHTML = `
    <p>${product.description}</p>`

    document.querySelector('.container-imagem-produto').innerHTML = `
    <img src="${product.img_src}">
    `
  })
}

// function renderSimilarProduct () {
//   let id = Cookies.get('categories')
//   axios.get(`http://localhost:3333/categories/${id}`)
//   .then (response => {
//     [categories] = response.data

//     document.querySelector('.container-produtos-similiares').innerHTML = `
//     <h3>Produtos Similiares</h3>
//     <img src="${categories.img_src}">
//     `

// })
// }

renderProduct();
// renderSimilarProduct();
