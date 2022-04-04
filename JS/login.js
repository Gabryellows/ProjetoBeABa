async function logar() {
  let email = document.getElementById("user").value;
  let password = document.getElementById("password").value;
  let listUser = [];

  let userValid = {
    name: '',
    cpf: '',
    birth_dt: '',
    phone: '',
    email: '',
    password: '',
    id: ''
  };

  const response = await fetch("http://localhost:3333/person");
  listUser = await response.json();
  listUser.forEach((item) => {
    if((email == item.email) && (password == item.password)) {
      userValid = {
        name: item.name,
        cpf: item.cpf,
        birth_dt: item.birth_dt,
        phone: item.phone,
        email: item.email,
        password: item.password,
        id: item.id
      }
      let token = Math.random().toString(16).substr(2);
      armazenaToken(token);
      Cookies.set('user', userValid.email);
      Cookies.set('id', userValid.id);
      getCart(userValid.id);
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000);
        }
      });
    }

    function prevent(e){
      e.preventDefault()
    }


// armazena token
function armazenaToken(token){
  Cookies.set('session', token);
}

function saveId (key) {
  Cookies.set = 'person', key
}


function getCart(id) {
  axios.get(`http://localhost:3333/shopcart/porusuario/${id}`)
  .then(response => {
    response.data.map(items => {
      if (items.closed == false) {
        Cookies.set('idShopCart', items.id)
      }
    })
  })
}
