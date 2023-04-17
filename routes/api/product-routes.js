const router = require('express').Router();
const { Product, Category, Tag, productTag } = require('../../models');

// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category,},{ model: Tag, through: productTag}],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try { 
    const productData = await Product.findByPk(req.params.id, {
    include: [{ model: Category,},{ model: Tag, through: productTag}],
    });
    res.status(200).json(productData);
  

    if (!productData) {
      res.status(404).json({ message: 'No Product found with this id!' });
      return;
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try { 
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  console.log("hello")
  Product.update(
    {
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
    },
    {
      where: {
        id: req.params.id
      },
    }
  )
  .then((updatedProduct) => {
    res.json(updatedProduct);
  })
  .catch((err) => res.json(err));
})

// Delete Product    
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
