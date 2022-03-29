const db = require ('../../database');

class paymentsRepository {
  async findAll(){
    const rows = await db.query (
      `
      SELECT *
      FROM schema.payments
      ORDER BY id
      `,);

      return rows;
  }

  async create({credit_card, debit_card, bank_clip, pix, installment}) {
    const row = await db.query (
      `
      INSERT INTO schema.payments (credit_card, debit_card, bank_clip, pix, installment)
      VALUES ($1, $2, $3, $4, $5,)
      RETURNING *
      `, [credit_card, debit_card, bank_clip, pix, installment])

      return row;
  }
}

module.exports = new paymentsRepository();
