const { response } = require('express');
const shopcartRepository = require ('../repository/shopcartRepository')

class shopcartController {
  async index(request, response) {
    const shop_cart = await shopcartRepository.findAll();
    response.json(shop_cart);
  }

  async show(request, response) {
    const { nameId } = request.params;
    const userId = await shopcartRepository.findById(nameId);
    if (!userId) {
      return response.status(404).json({ error: 'ID not found!' });
      };

      response.json(userId);
    };

    async getShopCart(request, response) {
      const { id } = request.params;
      const shopCartId = await shopcartRepository.findByIdPerson(id);
      if (!shopCartId) {
        console.log('if')
        const person_id = id
        const transport = 0
        const final_price = 0
        const closed = false
        const payment_id = null
        const order_status = null

        const pedido = await shopcartRepository.create({
          person_id,
          transport,
          final_price,
          closed,
          payment_id,
          order_status
        });

        response.json(pedido);
      }
      else if (shopCartId.closed == false){
        console.log('elsif')
        response.json(shopCartId);
      }
      else {
        console.log('else')
        const person_id = id
        const transport = 0
        const final_price = 0
        const closed = false
        const payment_id = null
        const order_status = null

        const pedido = await shopcartRepository.create({
          person_id,
          transport,
          final_price,
          closed,
          payment_id,
          order_status
        });

        response.json(pedido);
      }
    }


    // async store (id) {
    //   const person_id = id
    //   const transport = 0
    //   const final_price = 0
    //   const closed = true
    //   const payment_id = null
    //   const order_status = ' '

    //   const pedido = await shopcartRepository.create({
    //     person_id,
    //     transport,
    //     final_price,
    //     closed,
    //     payment_id,
    //     order_status
    //   });

    //   response.json(pedido);
    // }

  // async store(request, response) {
  //   const {person_id, transport, final_price, order_status, payment_id, closed} = request.body;

  //   if(!person_id){
  //     return response.status(400).json({error: 'Person ID invalid!'})
  //   }

  //   const shopcart = await shopcartRepository.create(person_id, transport, final_price, order_status, payment_id, closed);
  //   response.json(shopcart);
  // }

  async update(request, response){
    const {id} = request.params;
    const {person_id, transport, final_price, order_status, payment_id, closed} = request.body;

    const shopcart = await adressesRepository.update(id, person_id, transport, final_price, order_status, payment_id, closed);
    response.json(shopcart);
  };

  async delete(request, response) {
    const {id} = request.params;
    await shopcartRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new shopcartController();
