const router = require('express').Router();
const { Blog } = require('../../models');

router.get('/:id', async (req, res) => {

  try {
    console.log("hpop");
      const blogData = await Blog.findByPk(req.params.id);

      const blogs = blogData.map((blog) => blog.get({ plain: true }))

      res.render('editPost', {
          blogs,
          logged_in: req.session.logged_in
      });
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  console.log("route");
  console.log(req.body);
  try {
    const existingBlog = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!existingBlog) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }
    console.log(existingBlog);
    res.status(200).json(existingBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog trend found with that id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
