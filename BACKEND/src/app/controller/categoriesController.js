const categoriesRepository = require('../repository/categoriesRepository');

class categoriesController {
  async index(request, response) {
    const categories = await categoriesRepository.findAll();

    response.json(categories);
  }

  async show(request, response) {
    const { nameId } = request.params;

    if (isNaN(parseInt(nameId))) {
      const categoryName = await categoriesRepository.findByName(nameId);
      if (!categoryName) {
        return response.status(404).json({ error: 'Category not found' });
      }

      response.json(categoryName);
    } else {
      const categoryId = await categoriesRepository.findById(nameId);

      if (!categoryId) {
        return response.status(404).json({ error: 'ID not found' });
      }

      response.json(categoryId);
    }
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const nameExists = await categoriesRepository.findByName(name);
    if (nameExists) {
      return response.status(400).json({ error: 'This name is already in use' });
    }

    const category = await categoriesRepository.create({ name });

    response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const nameExists = await categoriesRepository.findByName(name);
    if (nameExists) {
      if (nameExists.id !== parseInt(id)) {
        return response.status(400).json({ error: 'This name is already in use' });
      }
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required ' });
    }

    const category = await categoriesRepository.update(id, name);

    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;
    await categoriesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new categoriesController();
