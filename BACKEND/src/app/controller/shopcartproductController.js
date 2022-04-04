const shopcartproductRepository = require ('../repository/shopcartproductRepository');

class shopcartproductController {
  async index (request, response) {
    const shop_cart_product = await shopcartproductRepository.findAll();
    response.json(shop_cart_product);

  };

  async show(request, response) {
    const { nameId } = request.params;
    const userId = await shopcartproductRepository.findById(nameId);
    if (!userId) {
      return response.status(404).json({ error: 'ID not found!'})
    };

    response.json(userId);
  };

  async findByShopCartId(resquest, response) {
    const { id } = resquest.params;
    const cartId = await shopcartproductRepository.findByShopCartId(id);
    if (!cartId) {
      return response.status(404).json({ error: 'Cart ID not found!'})
    };

    response.json(cartId);
  }

  async store(request, response) {
    const {
      shop_cart_id, product_id, quantity,
    } = request.body;
    console.log(request.body);
    if (!shop_cart_id) {
      return response.status(400).json({ error: 'Shop cart ID is required' });
    }

    if (!product_id) {
      return response.status(400).json({ error: 'Product ID in stock is required' });
    }

    if (!quantity) {
      return response.status(400).json({ error: 'Quantity is required' });
    }

    const productExists = await shopcartproductRepository.findQuantityProducts({ product_id, shop_cart_id });

    if (productExists) {
      productExists.quantity += quantity;
      const updateQuantity = await shopcartproductRepository.update(
        productExists.id,
        shop_cart_id,
        product_id,
        productExists.quantity,
      );

      response.json(updateQuantity);
    } else {
      const shopCartProduct = await shopcartproductRepository.create({
        shop_cart_id, product_id, quantity,
      });

      response.json(shopCartProduct);
    }
  }

  async update(request, response) {
    const {id} = request.params;
    const {shop_cart_id, product_id, quantity} = request.body;

    if (!shop_cart_id) {
      return response.status(400).json({ error: 'Shop cart ID is required' });
    } else if (!product_id) {
      return response.status(400).json({ error: 'Product ID in stock is required' });
    }else if (!quantity) {
      return response.status(400).json({ error: 'Quantity is required' });
    }

    const shopcartproduct = await shopcartproductRepository.update(id, shop_cart_id, product_id, quantity);
    response.json(shopcartproduct);
  };

  async delete(request, response) {
    const {id} = request.params;
    await shopcartproductRepository.delete(id);
    response.sendStatus(204);
  };
};

module.exports = new shopcartproductController();
