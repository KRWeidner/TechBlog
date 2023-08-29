const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    console.log("her3e");
    console.log(req.body);
    try {
      const newPost = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      console.log(newPost);
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;