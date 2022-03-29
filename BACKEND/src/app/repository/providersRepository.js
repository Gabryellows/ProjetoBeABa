const db = require ('../../database');

class providersRepository {

  async findAll() {
    const rows = await db.query(`
    SELECT *
    FROM schema.products
    ORDER BY id
    `);

    return rows;
  };

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

  async create ({name, cnpj}) {
    const row = await db.query(`
    INSERT INTO schema.products (name, cnpj)
    VALUES ($1, $2)
    RETURNING *
    `, [name, cnpj])

    return row;
  };

  async delete (id) {
    const deleteOp = await db.query(`
    DELETE
    FROM schema.products
    WHERE id = $1
    `, [id]);

    return deleteOp;
  };
};

module.exports = new providersRepository();
