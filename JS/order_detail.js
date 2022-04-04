async function getDetails () {
  let idOrder = Cookies.get('order');

  let showDetails = await axios.get(`http://localhost:3333/shopcartproduct/all/${idOrder}`);
  let finalPrice = 0
  showDetails.data.forEach(element => {
    let price = element.price * element.quantity;
    finalPrice += price;
    document.querySelector('.checkout').innerHTML += `
    <div class="container-order">
    <img src="${element.img_src}">
    <h4>Nome: ${element.name}</h4>
    <h7>Quantidade: ${element.quantity}</h7>
    </div>
    <div class="valores">
    <h4>Preço: ${price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })}</h4>
    </div>
    `
  });
  document.querySelector('.valorFinal').innerHTML = `
  <h5>Total: ${finalPrice.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  })}</h5>
  `
}

getDetails();
