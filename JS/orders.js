async function renderOrder() {
  let id_person = Cookies.get('id');
  let newOrder = []
  let idOrder = await axios.get(`http://localhost:3333/shopcart/order/${id_person}`);
  idOrder.data.map(item =>{
    if (item.closed == true) {
      newOrder.push(item)
      console.log(newOrder);
    }
  })
  const resultOrder = newOrder.map(orderDetails => {
    let date = orderDetails.updated_at;
    let dates = new Date(date).toLocaleDateString();

    document.querySelector('.container-pedido').innerHTML += `
    <div class="info-pedido">
      <h3>Número do pedido</h3>
      <h4>#${orderDetails.id}</h4>
    </div>

    <div class="info-pedido">
      <h3>Status</h3>
      <h4>${orderDetails.order_status}</h4>
    </div>

    <div class="info-pedido">
      <h3>Data</h3>
      <h4>${dates}</h4>
    </div>

    <div class="info-pedido">
      <h3>Pagamento</h3>
      <h4>${orderDetails.metodopagamento}</h4>
    </div>

    <div class="info-pedido">
      <h3>Detalhes do pedido</h3>
      <button onclick="setCookies(${orderDetails.id})" data-toggle="modal">Exibir detalhes</button>
    </div>
    `

  })
}
function setCookies(id) {
  Cookies.set('order', id)
  window.location.href='/HTML/ordersDetails.html'
}
renderOrder();
