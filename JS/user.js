function saveId (key) {
  Cookies.set = 'person', key
}

let personId = Cookies.get('id');

axios.get(`http://localhost:3333/person/${personId}`)
.then(response => {
  const person = response.data
  document.querySelector('.usuario-info').innerHTML = `
  <h3>Bem-Vindo, ${person.name}</h3>
  <p>${person.email}</p>
  `
  let date = person.birth_dt;
  let dates = new Date(date).toLocaleDateString();
  const name = document.querySelector('#name')
  name.placeholder = person.name;

  const cpf = document.querySelector('#cpf')
  cpf.placeholder = person.cpf;

  const email = document.querySelector('#email')
  email.placeholder = person.email;

  const data = document.getElementById('dataNasc')
  data.placeholder = dates;

  const telefone = document.querySelector('#telefone')
  telefone.placeholder = person.phone;
})

