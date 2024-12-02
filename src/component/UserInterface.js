import React, { useState } from "react";

function UserInterface({ projects, setProjects }) {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [files, setFiles] = useState({}); // Para almacenar archivos subidos

  const handleFileChange = (e, key) => {
    setFiles({
      ...files,
      [key]: e.target.files[0], // Solo permite un archivo por requisito
    });
  };

  const handleSubmit = () => {
    // Crear nuevo proyecto con la estructura de archivos
    const newProject = {
      title: projectTitle,
      description: projectDescription,
      status: "En revisión",
      requirementsMet: true, // Simulación de requisitos cumplidos
      files: Object.keys(files).map((key) => ({
        name: key, // El nombre del requisito (ej: "RUC", "Licencia de Explotación")
        file: files[key], // El archivo subido por el usuario
      })),
    };

    // Añadir proyecto a la lista de proyectos
    setProjects([...projects, newProject]);
    setProjectTitle("");
    setProjectDescription("");
    setFiles({});
    alert("Proyecto enviado para revisión.");
  };

  return (
    <div>
      <h2>Añadir Proyecto</h2>
      <form id="add-project-form">
        <input
          type="text"
          placeholder="Título del proyecto"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
        <textarea
          placeholder="Descripción del proyecto"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        ></textarea>

        {/* Requisitos y botones para subir archivos */}
        <h3>Documentación Requerida</h3>
        <div>
          <label>RUC:</label>
          <input type="file" onChange={(e) => handleFileChange(e, "RUC")} />
        </div>
        <div>
          <label>Licencia de Explotación:</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "Licencia de Explotación")}
          />
        </div>
        <div>
          <label>Autorización Ambiental:</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "Autorización Ambiental")}
          />
        </div>
        <div>
          <label>Estados Financieros:</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "Estados Financieros")}
          />
        </div>
        <div>
          <label>Plan de Responsabilidad Social:</label>
          <input
            type="file"
            onChange={(e) =>
              handleFileChange(e, "Plan de Responsabilidad Social")
            }
          />
        </div>

        <button type="button" onClick={handleSubmit}>
          Enviar para Revisión
        </button>
      </form>

      <h2>Explorar Proyectos</h2>
      {projects.length === 0 ? (
        <p>No hay proyectos.</p>
      ) : (
        projects.map((project, index) => (
          <div key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Estado: {project.status}</p>
            {/* Muestra los archivos subidos */}
            <p>Documentos Subidos:</p>
            {project.files.map((file, i) => (
              <p key={i}>
                {file.name}: {file.file.name}
              </p>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default UserInterface;
