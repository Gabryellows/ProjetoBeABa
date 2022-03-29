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
    const [row] = await db.query(`
    SELECT *
    FROM schema.shop_cart
    WHERE person_id = $1
    `, [id]);

    return row;
  };

  async create ({person_id, transport, final_price, order_status, payment_id, closed}){
    const row = await db.query(`
    INSERT INTO schema.shop_cart(person_id, transport, final_price, order_status, payment_id, closed)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `, [person_id, transport, final_price, order_status, payment_id, closed]);

    return row;
  };

  async update(id, person_id, transport, final_price, order_status, payment_id, closed) {
    const row = await db.query (`
    UPDATE schema.shop_cart
    SET person_id = $2, transport = $3, final_price = $4, order_status = $5, closed = $6, payment_id = $7,
    WHERE id = $1
    RETURNING *
    `, [id, person_id, transport, final_price, order_status, payment_id, closed]);

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
