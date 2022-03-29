
async function getProducts() {
  let containerProd = document.querySelector('#prod-container');
  const response = await axios.get('http://localhost:3333/product')
  const result = response.data.map(product => {
    containerProd.innerHTML += `
  <div class="card">
    <div class="wrapper-img">
      <img src="${product.img_src}">
    </div>
    <h3><a onclick="saveIdProduct(${product.id})" href="/HTML/single-product.html">${product.name}</a></h3>
    <p>${product.price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })}</p>
    <button onclick="productCart(${product.id})"><i data-feather="shopping-cart"></i>Comprar</button>
  </div>
    `
  })
}
getProducts();

// axios.get('http://localhost:3333/product/placa').then((response) => {
//   const resultado = response.data;
//   console.log(response.data);
// }
