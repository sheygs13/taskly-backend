module.exports = (req, res, next) => {
        res.status(503).json({
                message: 'Site is under maintenance. Please try again later.',
        });
        next();
};
