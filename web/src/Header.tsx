import React from 'react';
import './Header.css';

interface HeaderProps {
    title: string;
    //title? : "string" -> Quando utilizo ? na frente da prop, ela passa a não ser obrigatória
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header className="header_container">
            <h1>{props.title}</h1>
        </header>
    );
}


export default Header;