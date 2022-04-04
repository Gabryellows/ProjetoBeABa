const Multer = require('multer');
const path = require('path');
const AutoPurchaseController = require('../controller/AutoPurchaseController');
const upload = Multer({
  storage: Multer.diskStorage({
    destination: path.resolve('C:/Users/leals/Desktop/$ProjetoBEABA/BACKEND/API_Python/public'),
    filename: (request, file, callback) => {
      let data = new Date();
      const { id, idshopcart } = request.headers;
      const fileName = `${id}_${idshopcart}_${Date.parse(data)}${path.extname(file.originalname)}`;
      callback(null, fileName);

      AutoPurchaseController.store(request, fileName);
    },
  }),
});

module.exports = upload;
