const db = require ('../../database');

class personsRepository {
  async findAll() {

    const rows = await db.query (
      `
      SELECT *
      FROM schema.persons
      ORDER BY id
      `);
      return rows;
  };

  async findByName(name){
    name = `%${name}%`;
    const row = await db.query(`
        SELECT *
        FROM schema.persons
        WHERE name LIKE $1
    `, [name]);

    return row;
};

  async findById(id){
    const [row] = await db.query(`
    SELECT *
    FROM schema.persons
    WHERE id = $1
    `, [id]);

    return row;
  };

  async findByCpf(cpf){
    const [row] = await db.query(`
    SELECT *
    FROM schema.persons
    WHERE "cpf" = $1
    `, [cpf]);

    return row;
  };

  async findByEmail(email){
    const [row] = await db.query(`
    SELECT *
    FROM schema.persons
    WHERE "email" = $1
    `, [email]);

    return row;
  };

  async create (name,
    password,
    cpf,
    birth_dt,
    phone,
    email
    ){
      const row = await db.query(`
      INSERT INTO schema.persons (name, password, cpf, birth_dt, phone, email)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `, [name, password, cpf, birth_dt, phone, email]);

      return row;
    }

    async update (id, {name, password, cpf, birth_dt, phone, email}) {
      const row = await db.query(`
      UPDATE schema.persons
      SET name = $1, password = $2, cpf = $3, birth_dt = $4, phone = $5, email = $6
      WHERE id = $7
      RETURNING *
      `,[name, password, cpf, birth_dt, phone, email, id]);

      return row;
    }

    async delete(id){
      const deleteOp = await db.query(`
      DELETE
      FROM schema.persons
      WHERE id = $1
      `, [id]);

      return deleteOp;
    }
}

module.exports = new personsRepository();
