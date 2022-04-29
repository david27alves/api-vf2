const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const api = require('./services/api')
const cors = require('cors')

app.use(cors())
app.set("view engine", "jade")
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const portariaRouter = require('./routes/portariaRouter')
const createdbRouter = require('./routes/createdbRouter')

app.use('/portaria', portariaRouter)
app.use('/createdb', createdbRouter)


/*
app.get('/conferencias', async(req, res) => {

    try {
        
        const conferencias = await api.get('v1/compra/conferencias')
        res.render('conferencias', {
            title: 'Portaria', 
            message: 'Controle de portaria', 
            conferencias: conferencias.data.items
        })
        
    } catch(error) {
        console.error(error)
    }

})



app.post('/conferencias', (req, res) => {
    console.log(req.body)
    res.status(200).json({"status":"success"});

})

app.get('/insereportaria', async(req, res) => {
    
    try {

        const lojas = await api.get('v1/pessoa/lojas')
        res.render('index', {
            title: 'Portaria', 
            message: 'Controle de portaria', 
            lojas: lojas.data.items
        })

    } catch (error) {
        console.error(error)    
    }
        
})
*/
app.get('/lojas', async(req, res) => {

    try {

        const idLoja = req.query.id
        //const lojas = await api.get(`v1/pessoa/lojas?q=id==${idLoja}`)    
        const lojas = await api.get(`v1/pessoa/lojas`)
        res.json(lojas.data.items)

    } catch (error) {
        console.log(error)
    }

})

app.get('/consultanfe', async(req, res) => {

    try {

        const chave = req.query.chave
        const nfe = await api.get(`v1/compra/notas-fiscais?q=chaveDaNfe==${chave};situacao!=EXCLUIDA`)
        res.json(nfe.data.items)

    } catch (error) {
        console.log(error)
    }

})

app.get('/produtos', async(req, res) => {

    try {

        var codigo = req.query.codigo
        var produtos = []

        //nessa linha caso o ean não tenha 14 digitos ele preenche com 0 a esquerda
        const produtosean = await api.get(`v1/produto/codigos-auxiliares?q=id==${("00000000000000" + codigo).slice(-14)}`)
                
        if (produtosean.data.items.length >= 1) {
            var {id, produtoId} = produtosean.data.items[0]
            const produtosplu = await api.get(`v1/produto/produtos?q=id==${produtoId}`)
            var {descricao, itensEmbalagem, unidadeDeCompra} = produtosplu.data.items[0]
            produtos.push({
                "id": produtoId,
                "ean": id,
                "descricao": descricao,
                "itensEmbalagem": itensEmbalagem,
                "unidadeDeCompra": unidadeDeCompra
            })
            
        } else {

            const produtosplu = await api.get(`v1/produto/produtos?q=id==${codigo}`)
            //console.log(produtosplu.data.items[0])

            if (produtosplu.data.items.length >= 1) {
                var {id, descricao, itensEmbalagem, unidadeDeCompra} = produtosplu.data.items[0]
                const produtosean = await api.get(`v1/produto/codigos-auxiliares?q=produtoId==${id}`)
                
                if (produtosean.data.items.length >= 1) {
                    var ean = produtosean.data.items[0].id
                } else {
                    var ean = null
                }
                
                produtos.push({
                    "id": id,
                    "ean": ean,
                    "descricao": descricao,
                    "itensEmbalagem": itensEmbalagem,
                    "unidadeDeCompra": unidadeDeCompra
                })
            }            
        }
        res.json(produtos)        

    } catch (Error) {
        console.log(Error)    }

})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})


