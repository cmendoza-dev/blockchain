// src/components/Filtros.js
import React from 'react';

const Filtros = ({ onFilterChange }) => {
    return (
        <div className="filtros">
            <label htmlFor="viabilidad">Viabilidad:</label>
            <select id="viabilidad" onChange={onFilterChange}>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
            </select>
        </div>
    );
};

export default Filtros;
