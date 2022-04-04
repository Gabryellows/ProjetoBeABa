function robotActions (){
  const robo = document.querySelector(".robo_cart");
  const roboLegend = document.querySelector(".legend_robo");
  robo.addEventListener("mouseenter", openLegend);

  function openLegend () {
    let legendStatus = roboLegend.style.display;
    if (legendStatus == "block") {
      roboLegend.style.display = "none";
    } else {
      roboLegend.style.display = "block";
    }
  }

  robo.addEventListener("click", openInput);
  const modalRobo = document.querySelector(".modal_robo");
  modalRobo.style.display = "none";
  function openInput(){
    let modalRoboStatus = modalRobo.style.display;
    if (modalRoboStatus == 'none') {
      modalRobo.style.display = "flex";
    }
    else {
      modalRobo.style.display = "none";
    }
  }
}

async function uploadFile() {
  const formData = new FormData();
  const idPerson = Cookies.get('id');
  const idShop = Cookies.get('idShopCart');
  const csvFile = document.querySelector("#file")
  formData.append("csvFile", csvFile.files[0]);
  await axios.post("http://localhost:3333/auto-purchase", formData, {
    headers: {
      'id': idPerson,
      'idshopcart': idShop,
      "Content-Type": "multipart/form-data",
    },
  });
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2000);
}


let usuario = Cookies.get("id")


if (!usuario || usuario == undefined) {
    const robo = document.querySelector(".robo_cart");
    const modalRobo = document.querySelector(".modal_robo");
    robo.style.display = "none";
    modalRobo.style.display = "none";



}
else {
    robotActions()
}
