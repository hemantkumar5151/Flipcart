const mongoose  = require('mongoose');
const slugify = require('slugify')

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter the name'],
        minlength: [3, 'Name  is too short'],
        maxlength: [120, 'Name is too long']
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase: true
    },
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Please select the category']
    }
}, {
    timestamps: true
})

subCategorySchema.pre('save', async function(next){
    this.slug = await slugify(this.name, { lower: true})
    next();
})

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
