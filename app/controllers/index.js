module.exports = (app) => {
    return {
        index: (req, res) => {
            res.json({
                "message": "Application is running"
            });
        }
    }
}