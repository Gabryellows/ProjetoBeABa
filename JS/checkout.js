async function renderPersonData() {
  let person_id = Cookies.get('id')

  let infoPerson = await axios.get(`http://localhost:3333/person/${person_id}`);
  infoPerson.data
  let date = infoPerson.data.birth_dt;
  let dates = new Date(date).toLocaleDateString();

  document.querySelector('#infoPerson').innerHTML = `
  <div class="info">
    <div>
      <h3>Dados Pessoais</h3>
      <p> <strong>Nome : </strong>${infoPerson.data.name}</p>
      <p> <strong>CPF : </strong> ${infoPerson.data.cpf}</p>
      <p> <strong>Data Nascimento : </strong> ${dates}</p>
      <p> <strong>Telefone : </strong> ${infoPerson.data.phone}</p>
      <p> <strong>Email : </strong> ${infoPerson.data.email}</p>
    </div>
  </div>
  `

}

async function renderAdressData() {
  let personId = Cookies.get('id');

  let infoAdress = await axios.get(`http://localhost:3333/adresse/findByPerson/${personId}`)
  infoAdress.data

  document.querySelector('#infoAdress').innerHTML = `
  <div class="info">
    <div id="infoAdress">
      <h3>Endereço de entrega</h3>
      <p> <strong>Rua :</strong> ${infoAdress.data.address}</p>
      <p> <strong>Bairro :</strong> ${infoAdress.data.district}</p>
      <p> <strong>Número :</strong> ${infoAdress.data.house_number}</p>
      <p> <strong>Complemento :</strong> ${infoAdress.data.complement}</p>
      <p> <strong>CEP :</strong> ${infoAdress.data.zipcode}</p>
    </div>
  </div>
  `
}

async function renderProducts() {
  let cartShop = Cookies.get('idShopCart');
  let infoCart = await axios.get(`http://localhost:3333/shopcartproduct/all/${cartShop}`);
  let precoFinal = 0
  const resultado = infoCart.data.map(cartDetails => {
    precoFinal += cartDetails.price * cartDetails.quantity;
    let totalPrice = cartDetails.price * cartDetails.quantity;
    let total = totalPrice.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })
    document.querySelector('.container-prod').innerHTML += `
    <div class="card-item-prod">
      <div class="card-img">
        <img src="${cartDetails.img_src}">
      </div>
      <div class="info-prod">
        <p><strong>Nome:</strong> ${cartDetails.name}</p>
        <p><strong>Quantidade:</strong> ${cartDetails.quantity}</p>
        <p><strong>Preço Total:</strong> ${total}</p>
      </div>
    </div>
    `

  })
    Cookies.set('finalPrice', precoFinal);
    precoFinal = precoFinal.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  })
  console.log(precoFinal);
  document.querySelector('#precoTotal').innerHTML = `
  <h4>Preco total : ${precoFinal}</h4>
  `
}

async function finishPurch() {
  let carts = document.querySelector('input[name="pag"]:checked').value;
  if (carts == 1) {
    credit_card = true;
    debit_card = false;
    bank_clip = false;
    pix = false;
    installment = 1;
  } else if (carts == 2) {
    credit_card = false;
    debit_card = true;
    bank_clip = false;
    pix = false;
    installment = 1;
  } else if (carts == 3) {
    credit_card = false;
    debit_card = false;
    bank_clip = true;
    pix = false;
    installment = 1;
  } else if (carts == 4) {
    credit_card = false;
    debit_card = false;
    bank_clip = false;
    pix = true;
    installment = 1;
  }

  const idPayment = await axios.post(`http://localhost:3333/payment`,{
    credit_card,
    debit_card,
    bank_clip,
    pix,
    installment
  })
  let idCart = Cookies.get('idShopCart');
  let final_price = Cookies.get('finalPrice');
  await axios.put(`http://localhost:3333/shopcart/${idCart}`, {
    final_price,
    order_status: "Concluido",
    payment_id : idPayment.data[0].id,
    closed : true
  });
  let id = Cookies.get('id')
  axios.get(`http://localhost:3333/shopcart/porusuario/${id}`)
  .then(response => {
    response.data.map(items => {
      if (items.closed == false) {
        Cookies.set('idShopCart', items.id)
      }
    })
  })
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2000);
    }

renderPersonData();
renderAdressData();
renderProducts();

