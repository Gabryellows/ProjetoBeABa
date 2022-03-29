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
  const resultado = infoCart.data.map(cartDetails => {
    let totalPrice = cartDetails.price * cartDetails.quantity;
    let total = totalPrice.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })
    document.querySelector('.container-prod').innerHTML += `
    <div class="container-prod">
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
}




renderPersonData();
renderAdressData();
renderProducts();
