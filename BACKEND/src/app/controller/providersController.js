const providersRepository = require('../repository/providersRepository');

class providersController {
  async index(request, response){
    const providers = await providersRepository.findAll();

    response.json(providers);
  };

  async show(request, response) {
    const{nameId} = request.params;

    if(isNaN(parseInt(nameId))) {
      const providerName = await providersRepository.findByName(nameId);

      if (!providerName) {
        return response.status(404).json({ error: 'Name not found!'})
      };

      response.json(providerName);

    }else {
      const providerId = await providersRepository.findById(nameId);

      if(!providerId) {
        return response.status(404).json({ error: 'ID not found!'})
      };

      response.json(providerId);
    };
  };

  async store(request, response) {
    const {name, cnpj} = request.body;

    if(!name) {
      return response.status(400).json({error: 'Name is required!'})
    } else if (!cnpj) {
      return response.status(400).json({error: 'CNPJ is required!'})
    };

    const provider = await providersRepository.create(name, cnpj);
    response.json(provider);
  };

  async delete(request, response) {
    const [id] = request.params;
    await providersRepository.delete(id);
    response.sendStatus(204);
  };
};

module.exports = new providersController();
