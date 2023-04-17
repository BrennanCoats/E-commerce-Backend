const Category = require('./Category');
const Product = require('./product');
const Tag = require('./Tag');
const productTag = require('./productTag');

Category.hasMany(Product, {
  foreignKey: 'Category_id',
  onDelete: 'CASCADE',
});


Product.belongsTo(Category, {
  foreignKey: 'Category_id',
});

Product.belongsToMany(Tag, {
  through: 
     productTag,
     foreignKey: "product_id",
});

Tag.belongsToMany(Product, {
  through: 
     productTag,
     foreignKey: "tag_id",
});



module.exports = { Category, Product, Tag, productTag };
