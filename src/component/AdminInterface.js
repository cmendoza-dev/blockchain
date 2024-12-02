import React, { useState } from "react";


// Iconos para los checks y X
const CheckIcon = ({ fulfilled }) => (
  <span style={{ color: fulfilled ? "green" : "red" }}>
    {fulfilled ? "✔️" : "❌"}
  </span>
);


function AdminInterface({ projects, setProjects }) {
  const toggleRequirement = (index, key) => {
    const updatedProjects = [...projects];
    updatedProjects[index][key] = !updatedProjects[index][key]; // Cambia el estado del requisito
    setProjects(updatedProjects);
  };


  const approveProject = (index) => {
    const updatedProjects = [...projects];
    const project = updatedProjects[index];


    updatedProjects[index].status = "Aprobado";
    alert(`El proyecto ${project.title} ha sido aprobado.`);
    setProjects(updatedProjects);
  };


  const cancelProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };


  return (
    <div>
      <h2>Revisión de Proyectos</h2>
      {projects.length === 0 ? (
        <p>No hay proyectos para revisar.</p>
      ) : (
        projects.map((project, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{project.title}</h3>
            <p>Estado: {project.status}</p>


            {/* Mostrar los requisitos con checkboxes para que el admin los marque */}
            <div>
              <p>Requisitos:</p>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    checked={project.formalizacionLegal}
                    onChange={() =>
                      toggleRequirement(index, "formalizacionLegal")
                    }
                  />
                  Formalización Legal:{" "}
                  <CheckIcon fulfilled={project.formalizacionLegal} />
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={project.licenciasPermisosMineros}
                    onChange={() =>
                      toggleRequirement(index, "licenciasPermisosMineros")
                    }
                  />
                  Licencias y Permisos Mineros:{" "}
                  <CheckIcon fulfilled={project.licenciasPermisosMineros} />
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={project.historialOperacion}
                    onChange={() =>
                      toggleRequirement(index, "historialOperacion")
                    }
                  />
                  Historial de Operación:{" "}
                  <CheckIcon fulfilled={project.historialOperacion} />
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={project.transparenciaFinanciera}
                    onChange={() =>
                      toggleRequirement(index, "transparenciaFinanciera")
                    }
                  />
                  Transparencia Financiera:{" "}
                  <CheckIcon fulfilled={project.transparenciaFinanciera} />
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={project.compromisoSocialAmbiental}
                    onChange={() =>
                      toggleRequirement(index, "compromisoSocialAmbiental")
                    }
                  />
                  Compromiso Social y Ambiental:{" "}
                  <CheckIcon fulfilled={project.compromisoSocialAmbiental} />
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={project.capacidadEscalamiento}
                    onChange={() =>
                      toggleRequirement(index, "capacidadEscalamiento")
                    }
                  />
                  Capacidad de Escalamiento:{" "}
                  <CheckIcon fulfilled={project.capacidadEscalamiento} />
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={project.compromisoInnovacion}
                    onChange={() =>
                      toggleRequirement(index, "compromisoInnovacion")
                    }
                  />
                  Compromiso con la Innovación:{" "}
                  <CheckIcon fulfilled={project.compromisoInnovacion} />
                </li>
                <li>
                  <input
                    type="checkbox"
                    checked={project.seguridadSalud}
                    onChange={() => toggleRequirement(index, "seguridadSalud")}
                  />
                  Cumplimiento de Seguridad y Salud:{" "}
                  <CheckIcon fulfilled={project.seguridadSalud} />
                </li>
              </ul>
            </div>


            {/* Mostrar archivos subidos */}
            <div>
              <h4>Documentación Subida:</h4>
              {project.files && project.files.length > 0 ? (
                <ul>
                  {project.files.map((file, i) => (
                    <li key={i}>
                      {file.name}
                      <a
                        href={URL.createObjectURL(file.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver PDF
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No se han subido documentos.</p>
              )}
            </div>


            {/* Botones para aprobar o cancelar el proyecto */}
            <button onClick={() => approveProject(index)}>
              Aprobar Proyecto
            </button>
            <button onClick={() => cancelProject(index)}>
              Cancelar Proyecto
            </button>
          </div>
        ))
      )}
    </div>
  );
}


export default AdminInterface;
