export default function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        message: 'something unexpected happend',
        error: err.message
    });
}