import React, {Component} from 'react'
import './header.css'

export default class Header extends Component{
    render(){
        return(
            <header className="cep-header">
                <div className="logo-settings">
                    <h3>PESQUISA DE ENDEREÇO</h3>
                </div>
            </header>
        )
    }
}