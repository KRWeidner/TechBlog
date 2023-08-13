const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }))

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;