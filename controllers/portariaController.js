const Portaria = require('../model/portaria')

exports.post = (async(req, res) => {
    const {id_loja, placa, chave_nfe} = req.body
    let chaves = chave_nfe[0]

    for (i = 1; i < chave_nfe.length; i++) {
        console.log(chave_nfe[i])
        chaves += "," + chave_nfe[i]
    }

    const portariaCreate = await Portaria.create({
        id_loja: id_loja,
        placa: placa,
        chave_nfe: chaves
    })

    res.status(200).json(portariaCreate)
})

exports.get = (async(req, res) => {

    const portarias = await Portaria.findAll({
        order: [
            ['id', 'desc']
        ]
    })
    res.status(200).json(portarias)

})