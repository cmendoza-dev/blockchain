import React from "react";
import { Link } from "react-router-dom";
import ProyectoItem from "./ProyectoItem";


function Proyectos({ proyectos }) {
  return (
    <div className="section">
      <h2>Proyectos Mineros</h2>
      {proyectos.length === 0 ? (
        <p>No hay proyectos disponibles.</p>
      ) : (
        proyectos.map((proyecto) => (
          <div key={proyecto.id} className="proyecto-card">
            <h2>{proyecto.title}</h2>
            <p>Ubicación: {proyecto.location}</p>
            <p>Viabilidad: {proyecto.viability}</p>
            <button>
              <Link to={`/proyectos/${proyecto.id}`}>Ver Detalles</Link>
            </button>
            {/* Si el proyecto tiene información adicional, puedes incluirla aquí */}
            <h3>Información Aprobada</h3>
            <ProyectoItem
              nombre={proyecto.nombre}
              empresa={proyecto.empresa}
              rentabilidad={proyecto.rentabilidad}
            />
          </div>
        ))
      )}
    </div>
  );
}


export default Proyectos;
