const db = require('../../database');

class shopcartproductRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT *
    FROM schema.shop_cart_products
    ORDER BY id;
    `);

    return rows;
  };

  async findById(id) {
    const row = await db.query(`
    SELECT *
    FROM schema.shop_cart_products
    WHERE id = $1
    `, [id]);

    return row;
  };

  async findQuantityProducts({
    product_id, shop_cart_id,
  }) {
    const [row] = await db.query(`
      SELECT id, shop_cart_id, product_id, quantity
      FROM schema.shop_cart_products
      WHERE product_id = $1
      AND shop_cart_id = $2
    `, [product_id, shop_cart_id]);

    return row;
  }

  async findByShopCartId(id) {
    const rows = await db.query(`
    SELECT shop_cart_products.id, products.name, shop_cart_products.quantity , products.price , products.img_src, shop_cart.final_price
    FROM schema.products
    INNER JOIN schema.shop_cart_products
    ON shop_cart_products.product_id = products.id
    INNER JOIN schema.shop_cart
    ON shop_cart.id = shop_cart_products.shop_cart_id
    WHERE schema.shop_cart_products.shop_cart_id = $1
    `, [id]);
    return rows;
    };

  async create({shop_cart_id, product_id, quantity,}) {
    const rows = await db.query(`
    INSERT INTO schema.shop_cart_products (shop_cart_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [shop_cart_id, product_id, quantity]);

    return rows;
    };

  async update(id, shop_cart_id, product_id, quantity) {
    const row = await db.query(`
    UPDATE schema.shop_cart_products
    SET shop_cart_id = $2, product_id = $3, quantity =$4
    WHERE id = $1
    RETURNING *
    `, [id, shop_cart_id, product_id, quantity]);

    return row;
    };

  async delete(id) {
    const deleteOp = await db.query(`
    DELETE
    FROM schema.shop_cart_products
    WHERE id = $1
    `, [id]);

    return deleteOp;
    };
};

module.exports = new shopcartproductRepository();
