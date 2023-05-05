const getUser = (req, res) => {
    res.status(200).json({ msg: 'User' })
}

module.exports = {
    getUser
}