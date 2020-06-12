const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Enter a description']
    },
    description: {
        alias: 'shortDescription',
        type: String,
        required: [true, 'Enter a description']
    },
    brandName: {
        type: String,
    },
    name: {
        type: String,
        required: [true, 'Enter a description']
    },
    internalId: {
        alias: 'itemId',
        type: Number,
        required: [true, 'Enter a image path']
    },
    imagePath: {
        alias: 'largeImage',
        type: String,
        required: [true, 'Enter a image path']
    },
    availability: {
        alias: 'stock',
        type: String,
        required: [true, 'Enter a description']
    },
    images: {
        type: [String],
        default: []
    },
    originalPrice: {
        alias: 'msrp',
        type: Number,
        required: [true, 'Enter a price']
    },
    rating: {
        alias: 'customerRating',
        type: Number,
    },
    nrReviews: {
        alias: 'numReviews',
        type: Number,
        default: 0,
    },
});

ProductSchema.pre('save', function (next) {
    this.images = this.images.map((r) => r.mediumImage);
    this.name = this.name.replace('"', '');
    if (!this.brandName) {
        this.brandName =  (this.name || '').split('"')[0].match(/[a-zA-Z ]+/)[0].trim() ;
    }
    next()
});

const db = mongoose.connection.useDb('msc-tellco-products');
const Product = db.model('Product', ProductSchema, 'products');

export default Product;




