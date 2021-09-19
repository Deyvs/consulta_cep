const express = require('express');
const axios = require('axios');
/* const { response } = require('express'); */
const app = express();

const chamaCep = async (cep) => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
};

app.get("/consulta-cep" , async (req, res) => {
    const { cep } = req.query;

    if (!cep || cep.length < 8) {
        return res.status(400).json ({
            statusCode: 400,
            message: "Cep é obrigatório ou não atende aos critérios estabelecidos"
        })
    }

    const viaCepResponse = await chamaCep(cep);

    res.json(viaCepResponse);

});

app.listen("8888", console.log("Estou rodando na porta 8888"));
