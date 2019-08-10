const router = require('express').Router();

const acts = require('../models/accounts');

router.get('/', async (req, res) => {
  try {
    const accounts = await acts.list();

    if (!accounts.length) {
      return res.status(404).json({
        message: "err: no accounts",
        success: false
      });
    }

    return res.status(200).json({
      accounts,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "err: could not retrieve `accounts`",
      success: false
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [ account ] = await acts.list(id);

    if (!account) {
      return res.status(404).json({
        message: `err: account ${id} does not exist`,
        success: false
      });
    }

    return res.status(200).json({
      account,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: `err: could not retrieve account ${id}`,
      success: false
    });
  }
});

router.post('/', async (req, res) => {
  const data = req.body;
  const { name, budget } = data;

  if (!name || !budget) {
    return res.status(400).json({
      message: "err: name and budget required but missing",
      success: true
    });
  }

  if (isNaN(budget)) {
    return res.status(400).json({
      message: "err: budget is not a number",
      success: false
    });
  }

  try {
    let account = await acts.new(data);

    if (account) {
      const [ id ] = account;

      [ account ] = await acts.list(id);

      return res.status(201).json({
        account,
        success: true
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
      message: "err: could not be saved",
      success: false
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await acts.remove(id);

    if (!deleted) {
      return res.status(400).json({
        message: `err: account ${id} does not exist`,
        success: false
      });
    }

    return res.status(200).json({
      message: `account ${id} deleted`,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "err: could not be deleted",
      success: false
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const data = req.body;
  const { budget } = data;

  if (budget && isNaN(budget)) {
    return res.status(400).json({
      message: "err: budget is not a number",
      success: false
    });
  }

  try {
    let updated = await acts.update(id, data);

    if (!updated) {
      return res.status(404).json({
        message: `err; account ${id} does not exist`,
        success: false
      });
    }

    const [ account ] = await acts.list(id);

    return res.status(200).json({
      account,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "err: could not be updated",
      success: false
    });
  }
});

module.exports = router;