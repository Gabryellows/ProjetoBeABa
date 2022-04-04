
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
      alert('Endereço cadastrado!')
      console.log(response);
    }).catch((response) => {
      console.log(response);
      alert('Erro ao realizar o cadastro de endereço, tente novamente.')
    }) ;
  }


async function renderAdresses () {
  let personId = Cookies.get('id');

  let infoAdress = await axios.get(`http://localhost:3333/adresse/findByPerson/${personId}`)
  if (infoAdress.data == false) {
    return infoAdress.data = ''
  } else {
  let rua = document.querySelector("#adress");
  let numero = document.querySelector("#houseNum");
  let complemento = document.querySelector("#complement");
  let bairro = document.querySelector("#district");
  let cidade = document.querySelector("#city");
  let estado = document.querySelector("#states");
  let cep = document.querySelector("#zipcode");
    rua.value = infoAdress.data.address;
    numero.value = infoAdress.data.house_number;
    complemento.value = infoAdress.data.complement;
    bairro.value = infoAdress.data.district;
    cidade.value = infoAdress.data.city;
    estado.value = infoAdress.data.states;
    cep.value = infoAdress.data.zipcode;
  }
}


function prevent(e){
  e.preventDefault()
}

renderAdresses();
