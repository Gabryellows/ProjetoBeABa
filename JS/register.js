function register() {
  let nome = document.querySelector("#name").value;
  let data = document.querySelector("#date").value;
  let cpfe = document.querySelector("#cpf").value;
  let e_mail = document.querySelector("#email").value;
  let tele = document.querySelector("#tel").value;
  let pass = document.querySelector("#pass").value;

      axios.post("http://localhost:3333/person", {
      name: nome,
      cpf: cpfe,
      birth_dt: data,
      phone: tele,
      email: e_mail,
      password: pass
    }).then((response)=>{
      alert('Cadastro realizado.')
      console.log(response);
    }).catch((response) => {
      console.log(response);
      alert('Erro aor realizar o cadastro, tente novamente.')
    }) ;
  }

function prevent(e){
  e.preventDefault()
}
