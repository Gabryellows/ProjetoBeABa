const adressesRepository = require('../repository/adressesRepository');

class adressesController {
  async index (request, response){
    const adresses = await adressesRepository.findAll();

    response.json(adresses);
  };

  async show(request, response) {
    const { nameId } = request.params;

    if (isNaN(parseInt(nameId))) {
      const userEmail = await adressesRepository.findByName(nameId);

      if (!userEmail) {
        return response.status(404).json({ error: 'E-mail not found' });
      };

      response.json(userEmail);

    } else {
      const userId = await adressesRepository.findById(nameId);

      if (!userId) {
        return response.status(404).json({ error: 'ID not found' });
      };

      response.json(userId);
    };
  };

  async FindByIdPerson(request, response) {
    const { id } = request.params;
    const address = await adressesRepository.FindByIdPerson(id)
    response.json(address)
  }

  async store(request, response) {
    const {address, house_number, complement, district, city, states, zipcode, person_id} = request.body;

    if(!address) {
      return response.status(400).json({error: 'Field address is empty!'})
    };
    if(!house_number) {
      return response.status(400).json({error: 'Field house number is empty!'})
    };
    if(!complement) {
      return response.status(400).json({error: 'Field complement is empty!'})
    };
    if(!district) {
      return response.status(400).json({error: 'Field district is empty!'})
    };
    if(!city) {
      return response.status(400).json({error: 'Field city is empty!'})
    };
    if(!states) {
      return response.status(400).json({error: 'Field states is empty!'})
    };
    if(!zipcode) {
      return response.status(400).json({error: 'Field zip-code is empty!'})
    };
    if(!person_id) {
      return response.status(400).json({error: 'The person ID is invalid!'})
    };

    const addresses = await adressesRepository.create({address, house_number, complement, district, city, states, zipcode, person_id});
    response.json(addresses);
  };

  async update(request, response){
    const {id} = request.params;
    const {address, house_number, complement, district, city, states, zipcode, person_id} = request.body;

    const adresse = await adressesRepository.update(id, address, house_number, complement, district, city, states, zipcode, person_id);
    response.json(adresse);
  };

  async delete(request, response) {
    const {id} = request.params;
    await adressesRepository.delete(id);
    response.sendStatus(204);
  };
};

module.exports = new adressesController();
