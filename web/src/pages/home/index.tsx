import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../assets/logo.svg';

interface HeaderProps {
    title?: string;
    //title? : "string" -> Quando utilizo ? na frente da prop, ela passa a não ser obrigatória
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <h1>
                        <img src={logo} alt="Logo" />
                    </h1>
                </header>
                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajuda as pessoas a encontrar pontos de coleta de forma eficiente.</p>
                    <Link to="/dashboard">
                        <span>
                            <strong><FiLogIn /></strong>
                        </span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </main>

            </div>
        </div>
    );
}


export default Header;