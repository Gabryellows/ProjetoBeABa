document.querySelector('.acoes').onchange = toggleBilling;
function toggleBilling() {
  let billingItems = document.querySelectorAll('.endereco input[type="text"]');

  for (let i = 0; i < billingItems.length; i++) {
    billingItems[i].disabled = !billingItems[i].disabled;
  }
}

function registerAdress() {
  let rua = document.querySelector("#adress").value;
  let numero = document.querySelector("#houseNum").value;
  let complemento = document.querySelector("#complement").value;
  let bairro = document.querySelector("#district").value;
  let cidade = document.querySelector("#city").value;
  let estado = document.querySelector("#states").value;
  let cep = document.querySelector("#zipcode").value;
  let idperson = Cookies.get('id')
      axios.post("http://localhost:3333/adresse", {
      address: rua,
      house_number: numero,
      complement: complemento,
      district: bairro,
      city: cidade,
      states: estado,
      zipcode: cep,
      person_id: idperson
    }).then((response)=>{
      console.log(response);
    }).catch((response) => {
      console.log(response);
      alert('Erro ao realizar o cadastro de endereço, tente novamente.')
    }) ;
  }


async function renderAdresses () {
  let personId = Cookies.get('id');

  let infoAdress = await axios.get(`http://localhost:3333/adresse/findByPerson/${personId}`)
  infoAdress = infoAdress.data

  let rua = document.querySelector("#adress");
  let numero = document.querySelector("#houseNum");
  let complemento = document.querySelector("#complement");
  let bairro = document.querySelector("#district");
  let cidade = document.querySelector("#city");
  let estado = document.querySelector("#states");
  let cep = document.querySelector("#zipcode");

  rua.value = infoAdress.address;
  numero.value = infoAdress.house_number;
  complemento.value = infoAdress.complement;
  bairro.value = infoAdress.district;
  cidade.value = infoAdress.city;
  estado.value = infoAdress.states;
  cep.value = infoAdress.zipcode;
}


function prevent(e){
  e.preventDefault()
}

renderAdresses();
toggleBilling()
