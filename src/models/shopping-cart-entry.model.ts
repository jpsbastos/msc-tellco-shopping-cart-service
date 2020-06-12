import * as mongoose from 'mongoose';
import {configuration} from "../../configuration";
import Product from './product.model';

const Schema = mongoose.Schema;

const ShoppingCartEntrySchema = new Schema({
    quantity: {
        default: 1,
        type: Number,
        required: true
    },
    entryTotalPrice: {
        default: 0,
        required: 'Specify entry total price!',
        type: Number
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    },
    shoppingCartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'ShoppingCart'
    },
    creationDate: {
        default: Date.now,
        immutable: true,
        type: Date
    }
});

const ShoppingCartEntry = mongoose.model('ShopppingCartEntry', ShoppingCartEntrySchema, 'shopping-cart-entries');

export default ShoppingCartEntry;


