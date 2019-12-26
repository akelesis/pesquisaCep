import React, {Component} from 'react'
import './pesquisaCep.css'
import axios from 'axios'

export default class PesquisaCep extends Component{

    constructor(props){
        super(props)

        this.state = {cep: '', endereco: '', uf: ''}

        this.getCEP = this.getCEP.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getLocal = this.getLocal.bind(this)
        this.transformaLocal = this.transformaLocal.bind(this)
    }

    getCEP() {
        axios.get(`https://viacep.com.br/ws/${this.state.cep}/json`)
            .then(res => {
                console.log(res.data)
                this.setState(state => {
                    return {
                        endereco: `${res.data.logradouro} - Bairro ${res.data.bairro}, ${res.data.localidade} - ${res.data.uf}, ${res.data.cep}, Brasil`,
                    }
                })
            })
    }

    getLocal(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.transformaLocal)
        }
        else{
            alert('Este navegador não tem suporte para geolocalização!')
        }
    }

    transformaLocal(local){
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${local.coords.latitude},${local.coords.longitude}&key=AIzaSyBUzTymXXri50Wo62RLkwfRBT-EYDy6x3g`)
            .then(res => {
                this.setState(state => {
                    return{endereco: res.data.results[0].formatted_address}
                })
                
            })
    }

    handleChange(e) {
        this.setState({ ...this.state, cep: e.target.value })
    }
    render(){
        return(
            <div className="principal">
                <div className="pesquisa">
                    <div className="pesquisa-cep">
                        <label className="pesquisa-label">Insira o CEP: </label>
                        <input type="text" id="cep" onChange={this.handleChange} value={this.state.cep} />
                        <button className="botao-pesquisa" onClick={this.getCEP}>Pesquisar</button>
                    </div>
                    <div className="pesquisa-local">
                        <button className="btn-pesquisa" onClick={this.getLocal}>Capturar Localização</button>
                    </div>
                </div>
                    <hr />
                <div className="resultado">
                    <p>{this.state.endereco}</p>
                </div>
            </div>
        )
    }
}