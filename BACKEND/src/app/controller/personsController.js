const personsRepository = require('../repository/personsRepository');

class personsController {
  async index(request, response) {
    const persons = await personsRepository.findAll();

    response.json(persons);
  }

  async show (request, response) {
    const {nameId} = request.params;

    if (isNaN(parseInt(nameId))) {
      const personName = await personsRepository.findByName(nameId);
      if (!personName) {
        return response.status(404).json({error: 'Invalid person name'})
      }
      response.json(personName);
    } else {
      const personId = await personsRepository.findById(nameId);

      if (!personId) {
        return response.status(404).json({ error: 'Invalid person ID'});
      }
      response.json(personId);
    }
  };

  async store (request, response) {
    const {name, cpf, birth_dt, phone, email, password} = request.body;
    console.log(request.body)
    if(!name) {
      return response.status(400).json({error: 'Field name is empty!'});
    }
    if(!password) {
      return response.status(400).json({error: 'Field last name is empty!'});
    }
    if(!cpf) {
      return response.status(400).json({error: 'Field CPF is empty!'});
    }
    if(!birth_dt) {
      return response.status(400).json({error: 'Field birthday is empty!'});
    }
    if(!phone) {
      return response.status(400).json({error: 'Field phone is empty!'});
    }
    if(!email) {
      return response.status(400).json({error: 'Field email is empty!'});
    }



    const cpfExists = await personsRepository.findByCpf(cpf);
    if (cpfExists) {
      return response.status(400).json({error: 'This CPF is already in use!'});
    }

    const emailExists = await personsRepository.findByEmail(email);
    if(emailExists) {
      return response.status(400).json({error: 'This email is already in use!'});
    }

    try {
      const person = await personsRepository.create(name, password, cpf, birth_dt, phone, email);
      return response.json(person);
    } catch (error) {
      return response.status(400).json({error: error.detail});
    }
  };

  async update (request, response) {
    const {id} = request.params;
    const {name, password, cpf, birth_dt, phone, email} = request.body;

    const person = await personsRepository.update(id, {name, password, cpf, birth_dt, phone, email});
    response.json(person);
  };

  async delete(request, response) {
    const {id} = request.params;
    await personsRepository.delete(id);
    response.sendStatus(204);
  };
}

module.exports = new personsController();
