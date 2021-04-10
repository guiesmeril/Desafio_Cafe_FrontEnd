import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assents/logo.png';

import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

export default function NewIncident() {
const cpfLocalStorage = localStorage.getItem('@cpf');
const id = localStorage.getItem('@id');
    const [cpf, setCpf] = useState(cpfLocalStorage);
    const [description, setDescription] = useState(''); 


    const history = useHistory();
  
    async function handleRegister(e) {
      e.preventDefault();
      const data = {  
        idCollaborator: id,
        description 
    };

   try {
         const response = await api.post('items', data);

         history.push('/home');

   } catch (err) {
         alert(err.response.data.message);
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
                    placeholder ="Digite seu CPF" 
                    disabled={true}
                    maxLength = "11"
                    type='number'
                    value ={cpf}
                    onChange ={e => setCpf(e.target.value)}
                    required/>

                    <input 
                    placeholder= "Digite a Descrição" 
                    value={description}
                    onChange ={e => setDescription(e.target.value)}
                    required/>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}