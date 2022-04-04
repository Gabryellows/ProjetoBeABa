const db = require ('../../database');

class productsRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT *
    FROM schema.products
    ORDER BY id;
    `);
  return rows;
  };

  async findByCategories(id) {
    const rows = await db.query (`
    SELECT *
    FROM schema.products p
    WHERE p.category_id = $1
    `, [id])

    return rows;
  }

  async findById(id) {
    const row = await db.query(`
    SELECT *
    FROM schema.products
    WHERE id = $1
    `, [id]);

    return row;
  };

  async findByName(name) {
    const row = await db.query(`
    SELECT *
    FROM schema.products
    WHERE name = $1
    `, [name]);

    return row;
  };

  async create(name, quantity_in_stock, price, img_src, description, sale, category_id, provider_id) {
    const row = await db.query(`
    INSERT INTO schema.products(name, quantity_in_stock, price, img_src, description, sale, category_id, provider_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `, [name, quantity_in_stock, price, img_src, description, sale, category_id, provider_id]);

    return row;
  };

  async update(id, name, quantity_in_stock, price, img_src, description, sale, category_id, provider_id) {
    const row = await db.query(`
    UPDATE schema.products
    SET name = $2, quantity_in_stock = $3, price = $4, img_src = $5, description = $6, sale = $7, category_id = $8, provider_id = $9
    WHERE id = $1
    RETURNING *
    `, [id, name, quantity_in_stock, price, img_src, description, sale, category_id, provider_id])

    return row;
  };

  async delete(id) {
    const deleteOp = await db.query(`
    DELETE
    FROM schema.products
    WHERE id = $1
    `, [id]);

    return deleteOp;
  };
};

module.exports = new productsRepository();
