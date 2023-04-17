const router = require('express').Router();
const { Tag, Product, productTag } = require('../../models');

  // find all tags
  router.get('/', async (req, res) => {
    try {
      const tagData = await Tag.findAll({
        include: [{ model: Product, through: productTag,}],
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // find a single tag by its `id`
  router.get('/:id', async (req, res) => {
    try { 
      const tagData = await Tag.findByPk(req.params.id, {
        include: [{ model: Product, through: productTag,}],
      });
      res.status(200).json(tagData);
    
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Create a tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update an existing Tag
router.put('/:id', async (req, res) => {
  console.log("hello")
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id
      },
    }
  )
  .then((updatedtag) => {
    res.json(updatedtag);
  })
  .catch((err) => res.json(err));
});

//Delete a Tag
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
