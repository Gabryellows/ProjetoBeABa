function renderProductCart() {
  console.log('aqui')
  let cartId = Cookies.get('idShopCart')
  if (!isNaN(cartId)) {
    axios.get(`http://localhost:3333/shopcartproduct/all/${cartId}`)
      .then(response => {
        let pc = document.getElementById('products')
        let totalPrice = 0
        response.data.map(product => {
          let total = 0
          total += product.price * product.quantity;
          totalPrice += product.price * product.quantity;
          total = total.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          });
          console.log(total)
          pc.innerHTML += `
        <div id="products">
        <button onclick="removeItemsCart(${product.id})" id="remove">X</button>
          <div id="productInfo">
            <img src="${product.img_src}">
            <h1 id="name">${product.name}</h1>
          </div>
          <h1 id="price">${product.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}</h1>
          <h1 id="quantity">${product.quantity}</h1>
          <h1 id="final_price">${total}</h1>
        </div>
        `
        })
        let shop = document.querySelector('#totalprice')
        shop.innerHTML = `
          <h1>Total : ${totalPrice.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
          <div>
          <button onclick="location.href='/HTML/checkout.html'">Checkout</button>
          </div>
          `
      })
  }
}


function removeItemsCart(id) {
  axios.delete(`http://localhost:3333/shopcartproduct/${id}`);
  window.location.reload(true);
}

renderProductCart();
