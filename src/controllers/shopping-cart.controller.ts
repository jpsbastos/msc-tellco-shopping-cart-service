const mongoose = require('mongoose');
import { Request, Response } from 'express';
import Product from '../models/product.model';
import ShoppingCart from '../models/shopping-cart';
import ShoppingCartEntry from '../models/shopping-cart-entry.model';

class ShoppingCartController {
    public checkShoppingCartByUserId (req: Request, res: Response) {
        const cart = ShoppingCart.findOneAndUpdate(
            { userId: mongoose.Types.ObjectId(req.body.userId) },
            req.body,
            { new: true, upsert: true, setDefaultsOnInsert: true });

        if(req.query.full) {
            cart.populate({
                path:'cartEntries',
                populate: {
                    path: 'product'
                }
            }).exec((err, project) => (err) ? res.send(err) : res.json(project));
        } else {
            cart.exec((err, project) => (err) ? res.send(err) : res.json(project));
        }
    }

    public updateShoppingCartById (req: Request, res: Response) {
        ShoppingCart.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true },
            (err, cart) => {
                if(err){
                    res.send(err);
                }
                res.json(cart);
            }
        );
    }

    public async addShoppingCartEntry(req: Request, res: Response) {
        const product = await Product.findById(req.body.product) as any;

        ShoppingCartEntry.findOneAndUpdate(
            { product: mongoose.Types.ObjectId(req.body.product) },
            { $set: req.body, $inc: { quantity: 1, entryTotalPrice: product.originalPrice }},
            { new: true } , async (err, cartEntry) => {
                if (err) {
                    res.send(err);
                }
                if (!cartEntry) {
                    const newEntry = new ShoppingCartEntry(req.body) as any;
                    newEntry.entryTotalPrice += product.originalPrice;
                    const addedEntry = await newEntry.save();

                    ShoppingCart.findByIdAndUpdate(
                        req.body.shoppingCartId,
                        { $inc: { cartTotalPrice: product.originalPrice, totalItems: 1}, $push: { cartEntries: mongoose.Types.ObjectId(addedEntry._id) } },
                        { new: true },
                        (err, cart) => {
                            if (err) {
                                res.send(err);
                            }
                            res.json(cart)
                        },
                    );
                } else {
                    ShoppingCart.findByIdAndUpdate(
                        req.body.shoppingCartId,
                        { $inc: { cartTotalPrice: product.originalPrice, totalItems: 1 } },
                        { new: true },
                        (err, cart) => {
                            if (err) {
                                res.send(err);
                            }
                            res.json(cart)
                        },
                    );
                }
            }
        );
    }

    public emptyBasket (req: Request, res: Response) {
        ShoppingCartEntry.remove(
        { shoppingCartId: mongoose.Types.ObjectId(req.params.id) },
        (err) => {
            if (err) {
                res.send(err);
            }
        }).then(() => {
            ShoppingCart.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(req.params.id) },
                { $set: { cartTotalPrice: 0, totalItems: 0, cartEntries: [] }},
                { new: true },
                (err, cart) => {
                    if(err) {
                        res.send(err);
                    }
                    res.send(cart);
                },
                )
        });
    }

}

export const shoppingCartController = new ShoppingCartController();
