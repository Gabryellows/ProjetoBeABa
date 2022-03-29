const productsRepository = require ('../repository/productsRepository');

class productsController {
  async index (request, response) {
    const products = await productsRepository.findAll();

    response.json(products);
  };

  async productCategories (request, response) {
    const { id } = request.params
    const products = await productsRepository.findByCategories(id);

    response.json(products);
  };


  async show (request, response) {
    const {nameId} = request.params;

    if (isNaN(parseInt(nameId))) {
      const productName = await productsRepository.findByName(nameId);
      if(!productName) {
        return response.status(404).json({error: 'Product name not found!'})
    }
    response.json(productName);
    } else {
      const productId = await productsRepository.findById(nameId);

      if (!productId) {
        return response.status(404).json({error: 'Product ID invalid!'})
      }
      response.json(productId);
    };
  };

  async store (request, response) {
    const {name, quantity_in_stock, price, img_src, description, sale, category_id, provider_id} = request.body;

    if(!name) {
      return response.status(400).json({error: 'Name product is required!'});
    } else if (!quantity_in_stock) {
      return response.status(400).json({error: 'Quantity for stock is required!'});
    } else if (!price) {
      return response.status(400).json({error: 'Product price is required!'});
    } else if (!img_src) {
      return response.status(400).json({error: 'Product image is required!'});
    } else if (!description) {
      return response.status(400).json({error: 'Description product is required!'});
    } else if (!category_id) {
      return response.status(400).json({error: 'Category ID is invalid!'});
    } else if (!provider_id) {
      return response.status(400).json({error: 'Provider ID is invalid!'});
    }

    const product = await productsRepository.create(name, quantity_in_stock, price, img_src, description, sale, category_id, provider_id);
    response.json(product);
  };

  async update (request, response) {
    const {id} = request.params;
    const {name, quantity_in_stock, price, img_src, description, sale, category_id, provider_id} = request.body;

    const product = await productsRepository.update(id, name, quantity_in_stock, price, img_src, description, sale, category_id, provider_id);
    response.json(product);
    };

  async delete(request, response) {
    const {id} =request.params;
    await productsRepository.delete(id);
    response.sendStatus(204);
  };
};

module.exports = new productsController();
