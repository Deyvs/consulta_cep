const express = require('express');
const {chamaCep, chamaEndereco} = require('./apis/viacep')
const app = express();

app.get("/consulta-cep", async(req, res) => {
    try {
        const { cep } = req.query;
        
        if (!cep || cep.length < 8) {
            return res.status(400).json ({
                statusCode: 400,
                message: "Cep é obrigatório ou não atende aos critérios estabelecidos"
            })
        }
            
        const viaCepResponse = await chamaCep(cep);
        
        res.json(viaCepResponse);   
        
    } catch (error) {
        return res.status(500).json({
            message: "Erro inesperado noservidor. Tente novamente em alguns instatntes."
        })
    }
});

app.get("/consulta-endereco", async(req, res) => {
    try {
        const {siglaEstado, estado, rua} = req.query;
        
        if (!rua || !estado || !siglaEstado) {
            return res.status(400).json({
                statusCode: 400,
                message:"Nome da Rua e/ou Estado e/ou UF ausente(s). Por favor, insira um nome de rua e/ou Estado e/ou UF válido(s)."
            })    
        }

        const viaEnderecoResponse = await chamaEndereco(siglaEstado, estado, rua);
        return res.json(viaEnderecoResponse);
        
    } catch (error) {        
        return res.status(500).json({
            message: "Erro inesperado noservidor. Tente novamente em alguns instatntes."
        })
    }
    
})

app.listen("8888", console.log("Estou rodando na porta 8888"));
