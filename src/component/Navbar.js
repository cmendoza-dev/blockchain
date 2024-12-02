// src/component/Navbar.js
import React from 'react';

const Navbar = ({ onConnect }) => {
    return (
        <nav>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Proyectos Mineros</a></li>
                <li><a href="#">Mi Cartera</a></li>
                <li><button onClick={onConnect}>Conectar Wallet</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;

