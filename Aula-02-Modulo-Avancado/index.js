// CRIAR AS INSTACIAÇÕES OU ATRIBUIÇÕES OU VARIÁVEIS
const express = require("express")
const app = express()
const PORT = 3000
const pokemons = require("./src/data/pokemons.json")


//CONFIGURO AS REQUISIÇÕES
app.get("/pokemons",(req,res)=>{
    res.json(pokemons)
})

// app.put("/",(req,res)=>{
//     res.send("Deu tudo certo, graças a Deus!!!")
// })

//STARTAR O NOSSO SERVIDOR/CONFIG SERVIDOR
app.listen(PORT,() =>{
    console.log(`Meu servidor está rodando http://localhost:${PORT}`)
})