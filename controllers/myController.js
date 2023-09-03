const User = require('../models/User');

exports.home = async (req, res) => {
    const results = await User.findAll();
    res.render('home', { results });
};
