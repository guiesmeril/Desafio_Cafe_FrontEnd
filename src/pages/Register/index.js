import React, { useState } from 'react';
import { FiArrowLeft }  from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logo from '../../assents/logo.png';

export default function Register() {

    const[name, setName] = useState(''); 
    const[cpf, setCpf] = useState('');
  

    const history = useHistory();

   async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name, 
            cpf
        };

        try {
            const response = await api.post ('collaborators', data);
        
        alert (`Cadastro realizado, com sucesso!`);

         history.push('/');
        } catch (err) {
            alert (err.response.data.message);
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Nosso café da manhã" />
                   
                    
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Já tenho cadastro.
                    </Link>
                </section>
                
              

                <form onSubmit={handleRegister}>
                 <input 
                    placeholder= "Digite seu nome" 
                    value={name}
                    onChange ={e => setName(e.target.value)}
                    required/>

                    <input 
                    placeholder ="Digite seu CPF" 
                    maxLength = "11"
                    type='number'
                    value ={cpf}
                    onChange ={e => setCpf(e.target.value)}
                    required/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}