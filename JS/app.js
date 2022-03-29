
function saveIdCategory (key) {
  Cookies.set('categories', key);
}

function saveIdProduct(key) {
  Cookies.set('product', key);
}

function productCart(productId, qtd = 1) {
  let pedido = Cookies.get('idShopCart');
  axios.post('http://localhost:3333/shopcartproduct', {
    quantity: qtd,
    product_id: productId,
    shop_cart_id: pedido,
  }).then((response) => {
    checkSession();
  });
}

function logout() {
  Cookies.remove('user');
  Cookies.remove('id');
  Cookies.remove('session');
  Cookies.remove('idShopCart');
  window.location.href = "../index.html";
}

async function getDeparments() {
  let containerCategories = document.querySelector('.dropdown-content')

  if (containerCategories) {
    const response = await axios.get('http://localhost:3333/categories')
    const result = response.data.map(categories => {
      containerCategories.innerHTML += `
      <li><a id="categoriesId" key="${categories.id}" href="/HTML/categories.html" onclick="saveIdCategory(${categories.id})">${categories.name}</a></li>
      `
    })
  }
}

// verifica token
async function checkSession() {
  let quantity = 0;
  let cartId = Cookies.get('idShopCart');

  if (cartId && !isNaN(cartId)) {
    let cart = await axios.get(`http://localhost:3333/shopcartproduct/all/${cartId}`);
    cart.data.map(products => {
      quantity += products.quantity;
    })
  }

  let session = Cookies.get('session');
  if (session) {
    let client = Cookies.get('user')
    let user = document.querySelector('.menu-2');
    user.innerHTML = `<ul class="menu-2">
          <li><a href="/HTML/myacc.html">${client}</a><li>
          <li><a href="#" onclick="logout()">Sair</a><li>
          <li><a href="/HTML/cart.html">Carrinho</a><span>${quantity}</span></li>
      </ul>`;
  } else {
    let shopCartCounter = document.querySelector('.menu-2 li:last-child');
    shopCartCounter.innerHTML = `<li><a href="/HTML/cart.html">Carrinho</a><span>${quantity}</span></li>`;
  }
}

checkSession();
getDeparments();
