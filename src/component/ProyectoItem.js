import React from "react";
import { Link } from "react-router-dom";

const ProyectoItem = ({ nombre, empresa, rentabilidad }) => {
  return (
    <div className="proyecto-card">
      <h3>
        {nombre} ({empresa})
      </h3>
      <p>Rentabilidad Esperada: {rentabilidad}</p>
      <Link to={`/detalles/${nombre.toLowerCase()}`}>Ver Detalles</Link>
    </div>
  );
};

export default ProyectoItem;
