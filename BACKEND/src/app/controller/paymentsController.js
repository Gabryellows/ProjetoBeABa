const paymentsRepository = require('../repository/paymentsRepository');

class paymentsController {
  async index(request, response) {
    const payments = await paymentsRepository.findAll();
    response.json(payments);
  }

  async store(request, response) {
    const {credit_card, debit_card, bank_clip, pix, installment } = request.body;
    const payments = await paymentsRepository.create({credit_card, debit_card, bank_clip, pix, installment});
    response.json(payments);
  }

  async update(request, response) {
    const {id} = request.params;

    const {credit_card, debit_card, bank_clip, pix, installment } = request.body;
    const formPayment = await paymentsRepository.update({id, credit_card, debit_card, bank_clip, pix, installment});
    response.json(formPayment);
  }


}

module.exports = new paymentsController();
