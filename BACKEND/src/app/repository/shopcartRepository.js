const db = require ('../../database');

class shopcartRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT *
    FROM schema.shop_cart
    ORDER BY id;
    `);

    return rows;
  };

  async findById(id) {
    const row = await db.query(`
    SELECT *
    FROM schema.shop_cart
    WHERE id = $1
    `, [id]);

    return row;
  };

  async findByIdPerson(id) {
    const row = await db.query(`
    SELECT *
    FROM schema.shop_cart
    WHERE person_id = $1
    `, [id]);

    return row;
  };

  async getOrders(id) {
    const rows = await db.query(`
    SELECT shop_cart.id,
    shop_cart.person_id,
    shop_cart.transport,
    shop_cart.final_price,
    shop_cart.order_status,
    shop_cart.payment_id,
    shop_cart.closed,
    shop_cart.updated_at,
	    CASE
	    WHEN payments.credit_card = TRUE THEN 'Cartao de credito'
	    WHEN payments.debit_card  = TRUE THEN 'A vista'
	    WHEN payments.pix  = TRUE THEN 'Pix'
	    WHEN payments.bank_clip  = TRUE THEN 'Boleto'
	    END metodopagamento
	    FROM schema.payments
	    INNER JOIN schema.shop_cart ON payments.id = shop_cart.payment_id
      WHERE shop_cart.person_id = $1
    `, [id]);

    return rows;
  };

  async create ({person_id, transport, final_price, order_status, payment_id, closed}){
    const row = await db.query(`
    INSERT INTO schema.shop_cart(person_id, transport, final_price, order_status, payment_id, closed)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `, [person_id, transport, final_price, order_status, payment_id, closed]);

    return row;
  };

  async update(id, final_price, order_status, payment_id, closed) {
    const row = await db.query (`
    UPDATE schema.shop_cart
    SET final_price = $2, order_status = $3, payment_id = $4, closed = $5
    WHERE id = $1
    RETURNING *
    `, [id, final_price, order_status, payment_id, closed]);

    return row;
  };

  async delete(id){
    const deleteOp = await db.query(`
    DELETE
    FROM schema.shop_cart
    WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

module.exports = new shopcartRepository();
