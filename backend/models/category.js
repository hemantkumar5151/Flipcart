const mongoose = require('mongoose');
const slugify = require('slugify');
const { model } = require('./users');


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the category name'],
        trim: true,
        min: [3,'Name is too short'],
        max: [120, 'Name is too long'],
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },

}, {
    timestamps: true
})

categorySchema.pre('save', async function(next){
    this.slug = await slugify(this.name, { lower: true})
    next();
})


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;