const axios = require("axios")

const chamaCep = async (cep) => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
};

const chamaEndereco = async (siglaEstado, estado, rua) => {    
    const response = await axios.get(`https://viacep.com.br/ws/${siglaEstado}/${estado}/${rua}/json/`);
    return response.data;
}

module.exports = {
    chamaCep,
    chamaEndereco
}