const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const newPost = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;