exports.createOrUpdateUser = (req, res) => {

    res.json({
        data: 'hey you hit create-or-update-user api endpoint',
        name: 'Sansrit',
        address: 'Sanipalati'
    })
}
// We can have exports with multiple methods so on import must be destructred : regular var name results in ERROR