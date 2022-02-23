const server = require('express')()

const PORT = '3000'

server.get('/', (req, res) => {
    let some_text = 'Mister WorldWide'
    res.json({some_text: some_text})
})


server.listen(PORT)