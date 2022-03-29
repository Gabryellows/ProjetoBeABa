async function showProducstCategory() {
  let categoryProduct = document.querySelector('#categoryContainer');
  let cookieCategory = Cookies.get('categories');
  const response = await axios.get(`http://localhost:3333/product/productsCategories/${cookieCategory}`)
  const result = response.data.map(product =>{
    categoryProduct.innerHTML += `
    <div class="card">
      <div class="wrapper-img">
        <img src="${product.img_src}">
      </div>
      <h3><a onclick="saveIdProduct(${product.id})" href="/HTML/single-product.html">${product.name}</a></h3>
      <p>R$${product.price},00</p>
      <button onclick="productCart(${product.id})"><i data-feather="shopping-cart"></i>Comprar</button>
  </div>
    `
  })
}

showProducstCategory();
