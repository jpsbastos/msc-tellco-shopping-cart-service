import { Application } from "express";
import { shoppingCartController } from '../controllers/shopping-cart.controller';

export class Router {       
    public routes(app: Application): void {

        app.route('/shopping-cart')
            .post(shoppingCartController.checkShoppingCartByUserId);

        app.route('/shopping-cart/:id')
            .delete(shoppingCartController.emptyBasket);

        app.route('/shopping-cart/entries')
            .post(shoppingCartController.addShoppingCartEntry);

        app.route('/shopping-cart/:id')
            .post(shoppingCartController.updateShoppingCartById);

    }
}
