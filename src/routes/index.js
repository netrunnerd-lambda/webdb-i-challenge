const router = require('express').Router();

router.get('/', (req, res) => res.status(200).json({
  message: "can't touch dis",
  success: true
}));

router.use('/accounts', require('./accounts'));

module.exports = router;