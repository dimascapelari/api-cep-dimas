'use strict'

const limparFormulario = () => {
    document.getElementById('endereco').value = ''
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = ''
}

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf
}

const eNumero = (numero) => /^[0-9]+$/.test(numero)
const cepValido = (cep) => cep.length == 8 && eNumero(cep)

const pesquisarCep = async () => {
    limparFormulario()
    const cep = document.getElementById('cep').value
    const url = `https://viacep.com.br/ws/${cep}/json/`
    //fetch(url).then(response => response.json).then(console.log)

    if (cepValido(cep)) {
        const dados = await fetch(url)
        const endereco = await dados.json()
        if (endereco.hasOwnProperty('erro')) {
            alert('CEP INEXISTENTE!')
            document.getElementById('endereco').value = 'CEP inexistente!'
            // document.getElementById('bairro').value = 'CEP inexistente!'
            // document.getElementById('cidade').value = 'CEP inexistente!'
            // document.getElementById('estado').value = 'CEP inexistente!'
        } else {
            preencherFormulario(endereco)
        }
    } else {
        alert('CEP INCORRETO!')
        document.getElementById('endereco').value = '<< CEP incorreto!'
        // document.getElementById('bairro').value = 'CEP incorreto!'
        // document.getElementById('cidade').value = 'CEP incorreto!'
        // document.getElementById('estado').value = 'CEP incorreto!'
    }

}

document.getElementById('cep')
    .addEventListener('focusout', pesquisarCep)