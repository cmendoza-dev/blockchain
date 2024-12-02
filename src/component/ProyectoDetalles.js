import React from "react";
import { useParams } from "react-router-dom";

const ProyectoDetalles = () => {
  const { nombre } = useParams();
  const proyectos = {
    colorada: {
      ubicacion: "La Libertad, Perú",
      etapa: "Exploración avanzada",
      recursos: "Oro, Plata",
      rentabilidad: "14%",
      descripcion:
        "El proyecto Colorada es una de las minas más prometedoras en la región...",
    },
    capilla: {
      ubicacion: "Ancash, Perú",
      etapa: "Producción",
      recursos: "Oro",
      rentabilidad: "12%",
      descripcion:
        "El proyecto La Capilla ha tenido un rendimiento sólido en la extracción de oro...",
    },
    // Agrega los demás proyectos aquí
  };

  const proyecto = proyectos[nombre.toLowerCase()];

  return (
    <div className="detalles-proyecto">
      {proyecto ? (
        <>
          <h2>
            {nombre} ({proyecto.empresa})
          </h2>
          <p>Ubicación: {proyecto.ubicacion}</p>
          <p>Etapa: {proyecto.etapa}</p>
          <p>Recursos: {proyecto.recursos}</p>
          <p>Rentabilidad esperada: {proyecto.rentabilidad}</p>
          <p>{proyecto.descripcion}</p>
          <button className="comprar-tokens">Comprar Tokens</button>
        </>
      ) : (
        <p>Proyecto no encontrado.</p>
      )}
    </div>
  );
};

export default ProyectoDetalles;
