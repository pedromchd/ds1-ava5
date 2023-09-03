const User = require('../models/User');

exports.home = async (req, res) => {
    const results = await User.findAll();
    req.flash('success', 'Sucesso!');
    res.render('home', { results });
};
