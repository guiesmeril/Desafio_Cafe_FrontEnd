import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import heroesImg from '../../assents/heroes.png';

import logo from '../../assents/logo.png';

export default function Logon() {

  const [cpf, setCpf] = useState('');


  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();



    const response = await api.get(`collaborators/${cpf}`);

    if (response.data == "") {

      alert(`Nao existe cadastro com esse cpf!`);
      return;
    }

    localStorage.setItem('@cpf', response.data.cpf); 
    localStorage.setItem('@id', response.data.id); 
    localStorage.setItem('@name', response.data.name); 


    history.push('/home');
 

  }


  return (
    <div className="logonContainer">
      <section className="form">
        <img src={logo} alt="Nosso café da manhã" />
        <form onSubmit={handleRegister}>
          <h1>Faça o seu logon</h1>
          <input
            placeholder="Digite seu CPF"
            maxLength="11"
            type='number'
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            required />
          <button className="button" type="submit">Login</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
                Não tenho cadastro!
            </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}