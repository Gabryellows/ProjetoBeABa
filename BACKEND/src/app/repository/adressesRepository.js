const db = require ('../../database');

class adressesRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT *
    FROM schema.adresses
    ORDER BY id;
    `);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT *
      FROM schema.adresses
      WHERE id = $1
    `, [id]);

    return row;
  };

  async FindByIdPerson(id) {
    const [row] = await db.query(`
    SELECT *
    FROM schema.adresses
    WHERE person_id = $1
    `, [id]);

    return row;
  }

  async findByName(name) {
    const row = await db.query(`
      SELECT *
      FROM schema.adresses
      WHERE name = $1
    `, [name]);

    return row;
  };

  async create({address,
    house_number,
    complement,
    district,
    city,
    states,
    zipcode,
    person_id}){
      const row = await db.query(`
      INSERT INTO schema.adresses(address, house_number, complement, district, city, states, zipcode, person_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [address, house_number, complement, district, city, states, zipcode, person_id]);

    return row;
  }

  async update(id, address,
    house_number,
    complement,
    district,
    city,
    states,
    zipcode,
    person_id) {
    const row = await db.query(`
      UPDATE schema.adresses
      SET address = $1, house_number = $2, complement = $3, district = $4, city = $5, states = $6, zipcode = $7, person_id = $8
      WHERE id = $9
      RETURNING *
    `, [address, house_number, complement, district, city, states, zipcode, person_id, id]);

    return row;
  }

  async delete(id){
    const deleteOp = await db.query(`
    DELETE
    FROM schema.adresses
    WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

module.exports = new adressesRepository();
