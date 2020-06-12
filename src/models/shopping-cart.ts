import * as mongoose from 'mongoose';
import ShoppingCartEntry from './shopping-cart-entry.model';

const Schema = mongoose.Schema;

const ShoppingCartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    cartEntries: [{ type: mongoose.Schema.Types.ObjectId, ref: ShoppingCartEntry }],
    totalItems: {
        default: 0,
        required: false,
        type: Number
    },
    cartTotalPrice: {
        default: 0,
        required: false,
        type: Number
    },
    creationDate: {
        default: Date.now,
        immutable: true,
        type: Date
    }
});

const ShoppingCart = mongoose.model('ShoppingCart', ShoppingCartSchema, 'shopping-carts');

export default ShoppingCart;


