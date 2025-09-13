const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
  try {
    const { type, amount, currency, category, date, notes } = req.body;
    if (!type || !amount) return res.status(400).json({ msg: 'Type and amount required' });

    const tx = new Transaction({
      user: req.user.id,
      type,
      amount,
      currency: currency || process.env.BASE_CURRENCY || 'USD',
      category: category || 'General',
      date: date ? new Date(date) : Date.now(),
      notes: notes || ''
    });

    await tx.save();
    res.status(201).json(tx);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    // optional query filters: type, startDate, endDate, category
    const { type, startDate, endDate, category } = req.query;
    const filter = { user: req.user.id };
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const txs = await Transaction.find(filter).sort({ date: -1 });
    res.json(txs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ msg: 'Transaction not found' });
    if (tx.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    const updates = req.body;
    const updated = await Transaction.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ msg: 'Transaction not found' });
    if (tx.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await tx.remove();
    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
