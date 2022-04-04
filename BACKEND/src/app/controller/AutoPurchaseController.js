const axios = require('axios');

class AutoPurchaseController {
  async store(request, fileName) {
    const { idshopcart } = request.headers;
    await axios.post(`http://localhost:3001/autopurchase/${idshopcart}/${fileName}`).catch((error) => console.log(error));
  }
}

module.exports = new AutoPurchaseController();
