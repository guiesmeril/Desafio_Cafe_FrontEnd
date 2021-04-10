import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logo from '../../assents/logo.png';

export default function Profile() {
    const nameCollaborator = localStorage.getItem('@name')
    const [responseData, setResponseData] = useState([]);
    const history = useHistory();

    useEffect(() => {

        loadingData();

    }, [])

    async function loadingData() {

        const response = await api.get('items');
        setResponseData(response.data);

    }
    function logout() {

        localStorage.removeItem('@cpf');
        localStorage.removeItem('@name');
        localStorage.removeItem('@id');

        history.push('/');

    }
    async function deleteItem(cpf,id) {
        const cpfLogado = localStorage.getItem('@cpf');
        if(cpfLogado == cpf) {
            await api.delete(`items/${id}`);
            loadingData();
            return;
        }

        alert('Voce so pode excluir o item que voce cadastrou')

    }
    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Nosso café da manhã" />
                <span>Bem vindo, {nameCollaborator}</span>

                <Link className="button" to="/newitems/new">Cadastrar novos itens do café</Link>
                <button type="button" onClick={() => { logout() }}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>O QUE VAMOS TER NO NOSSO CAFÉ?</h1>

            <ul>

                {responseData.map((item) => (


                    <li key={item.id}>
                        <strong>INFORMAÇÕES SOBRE O CAFÉ: </strong>
                        <strong>Nome: {item.collaborator.name}, CPF: {item.collaborator.cpf}, Descrição: {item.description} </strong>

                        <button onClick={() => {deleteItem(item.collaborator.cpf, item.id) }} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                        </button>
                    </li>

                ))}
            </ul>

        </div>
    );
}