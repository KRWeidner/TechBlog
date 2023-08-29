const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Blog, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }]
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }))

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


router.get('/dashboard', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: { user_id: req.session.user_id },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }))

        res.render('dashboard', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment
                }]
        });

        if (!postData) {
            res.status(404).json({ message: 'No blog found with that id!' });
            return;
        }

        const post = postData.get({ plain: true });
        res.render('post', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/blogs/:id', async (req, res) => {
  
    try {
      console.log("hpop");
        const postData = await Blog.findByPk(req.params.id);
  
        if (!postData) {
            res.status(404).json({ message: 'No blog found with that id!' });
            return;
        }

        const post = postData.get({ plain: true });
  
        res.render('editPost', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/addpost', (req, res) => {
    res.render('addpost');
});

module.exports = router;