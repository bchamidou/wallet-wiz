const router = require('express').Router();
const withAuth = require('../utils/auth');
const helpers = require('../utils/helpers');

router.get('/transactions', withAuth, async (req, res) => {
    try {
        const accessToken = req.session.access_token;
        const { startDate, endDate } = helpers.getDates();

        const plaidData = await plaidClient.getTransactions(
            accessToken,
            startDate,
            endDate
        );
        res.status(200).json({ transactions: plaidData.data });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch transaction data.' });
    }
});

module.exports = router;