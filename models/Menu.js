const mongoose = require('mongoose');


const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        require: true,
    },
    isdrinks: {
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [String],
        default: [],

    },
    num_sales: {
        type: Number,
        default: 0,
    }
})

const MenuItem = mongoose.model('menu', MenuSchema);
module.exports = MenuItem