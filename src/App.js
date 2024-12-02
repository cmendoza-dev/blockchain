import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import ColoradaDetalles from "./component/ColoradaDetalles";
import LaCapillaDetalles from "./component/LaCapillaDetalles";
import LaLimaDetalles from "./component/LaLimaDetalles";
import AguaBlancaDetalles from "./component/AguaBlancaDetalles";
import AlumbreDetalles from "./component/AlumbreDetalles";
import UserInterface from "./component/UserInterface"; // Asegúrate de que la ruta sea correcta
import AdminInterface from "./component/AdminInterface"; // Nueva interfaz de administrador
import "./styles.css";

// Componente de Inicio de Sesión
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener los usuarios registrados desde localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el usuario existe y la contraseña es correcta
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Redirigir al panel de control después del login exitoso
      navigate("/investor-dashboard");
    } else {
      // Mostrar un mensaje de error si las credenciales son incorrectas
      setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

// Componente de Registro
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar si los campos no están vacíos
    if (!email || !password) {
      setError("Por favor, completa todos los campos");
      return;
    }

    // Simular almacenamiento en localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el usuario ya está registrado
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      setError("El correo electrónico ya está registrado.");
    } else {
      // Registrar al usuario
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));

      // Redirigir al inicio de sesión después de registrarse
      navigate("/login");
    }
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

// Componente de Panel de Inversor
function InvestorDashboard() {
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchPortfolio();
    fetchTransactions();
    fetchProjects();
  }, []);

  const fetchPortfolio = () => {
    setPortfolio([
      { name: "Colorada de Newmont", value: "$5,000", roi: "12%" },
      { name: "La Capilla de Barrick", value: "$3,500", roi: "8%" },
    ]);
  };

  const fetchTransactions = () => {
    setTransactions([
      {
        id: 1,
        project: "Colorada de Newmont",
        amount: "$2,000",
        date: "2024-01-15",
      },
      {
        id: 2,
        project: "La Capilla de Barrick",
        amount: "$1,500",
        date: "2024-01-10",
      },
    ]);
  };

  const fetchProjects = () => {
    setProjects([
      { name: "Nueva Mina X", location: "Cusco, Perú", viability: "Alta" },
      { name: "Proyecto Z", location: "Arequipa, Perú", viability: "Media" },
    ]);
  };

  return (
    <div className="dashboard-container">
      <h1>Panel de Inversionista</h1>

      {/* Resumen del Portafolio */}
      <section className="portfolio-section">
        <h2>Mi Portafolio</h2>
        <ul>
          {portfolio.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong>: {item.value} (ROI: {item.roi})
            </li>
          ))}
        </ul>
      </section>

      {/* Historial de Transacciones */}
      <section className="transactions-section">
        <h2>Historial de Transacciones</h2>
        <table>
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Monto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.project}</td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Proyectos Disponibles */}
      <section className="projects-section">
        <h2>Proyectos Disponibles para Inversión</h2>
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <strong>{project.name}</strong> - Ubicación: {project.location}{" "}
              (Viabilidad: {project.viability})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// Componente Principal de la Aplicación
function App() {
  const [projects, setProjects] = useState([]); // Asegúrate de definir projects aquí
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const adminAddress = "0x6F5c428E39aE14ea3Ae60F0dA10AE9E45a502952";
  // const adminAddress = "0xe35A946111FB2f47125688c7A2fED415F95c187c";

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);

        if (accounts[0].toLowerCase() === adminAddress.toLowerCase()) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error al conectar la wallet:", error);
      }
    } else {
      alert("MetaMask no está instalada. Por favor, instálala.");
    }
  };

  useEffect(() => {
    const checkAccount = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);

          if (accounts[0].toLowerCase() === adminAddress.toLowerCase()) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      }
    };
    checkAccount();
  }, []);

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <div>
            <Link to="/">Inicio</Link>
            <Link to="/proyectos">Proyectos Mineros</Link>
            <Link to="/cartera">Mi Cartera</Link>
            <Link to="/usuario">Añadir Proyectos</Link>
            {isAdmin && <Link to="/admin">Admin</Link>}
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
            {account && <Link to="/investor-dashboard">Mi Panel</Link>}
          </div>
          {account ? (
            <span>Conectado como: {account}</span>
          ) : (
            <button className="wallet-button" onClick={connectWallet}>
              Conectar Wallet
            </button>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/proyectos/colorada" element={<ColoradaDetalles />} />
          <Route path="/proyectos/lacapilla" element={<LaCapillaDetalles />} />
          <Route path="/proyectos/lalima" element={<LaLimaDetalles />} />
          <Route
            path="/proyectos/aguablanca"
            element={<AguaBlancaDetalles />}
          />
          <Route path="/proyectos/alumbre" element={<AlumbreDetalles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/investor-dashboard" element={<InvestorDashboard />} />
          <Route
            path="/usuario"
            element={
              <UserInterface projects={projects} setProjects={setProjects} />
            }
          />{" "}
          {/* Aquí pasas projects y setProjects */}
        </Routes>
      </div>
    </Router>
  );
}

// Componente de Inicio
function Inicio() {
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const toggleInfo = () => {
    setMostrarInfo(!mostrarInfo);
  };

  return (
    <div className="inicio">
      <h1 className="titulo-mina">MINAFIN</h1>
      <h2>Bienvenido a la Plataforma de Proyectos Mineros</h2>

      <button onClick={toggleInfo} className="btn-ver-mas">
        {mostrarInfo ? "Ocultar" : "Ver más"}
      </button>

      {mostrarInfo && (
        <div className="info-adicional">
          <h3>Visión</h3>
          <p>
            Para 2027, transformaremos el acceso al financiamiento minero,
            promoviendo la inclusión y el crecimiento de las Pymes a través de
            la innovación tecnológica y la participación abierta de
            inversionistas globales, creando un entorno financiero más
            accesible, transparente y eficiente.
          </p>
          <h3>Misión</h3>
          <p>
            Brindamos financiamiento para proyectos mineros de PYMES a través de
            una plataforma blockchain que emite y comercializa tokens,
            conectando de forma segura a inversionistas globales.
          </p>
          <h3>Valores</h3>
          <ul>
            <li>Innovación</li>
            <li>Sostenibilidad</li>
            <li>Inclusión</li>
            <li>Responsabilidad</li>
          </ul>
        </div>
      )}
    </div>
  );
}

function Proyectos() {
  return (
    <div className="section">
      <h2>Proyectos Mineros</h2>

      <div className="proyecto-card">
        <h2>Colorada de Newmont Perú</h2>
        <p>Ubicación: La Libertad, Perú</p>
        <p>Viabilidad: Alta</p>
        <button>
          <Link to="/proyectos/colorada">Ver Detalles</Link>
        </button>
      </div>

      <div className="proyecto-card">
        <h2>La Capilla de Barrick Misquichilca</h2>
        <p>Ubicación: Ancash, Perú</p>
        <p>Viabilidad: Media</p>
        <button>
          <Link to="/proyectos/lacapilla">Ver Detalles</Link>
        </button>
      </div>

      <div className="proyecto-card">
        <h2>La Lima de Compañía Minera Poderosa</h2>
        <p>Ubicación: La Libertad, Perú</p>
        <p>Viabilidad: Alta</p>
        <button>
          <Link to="/proyectos/lalima">Ver Detalles</Link>
        </button>
      </div>

      <div className="proyecto-card">
        <h2>Agua Blanca de La Arena</h2>
        <p>Ubicación: Cajamarca, Perú</p>
        <p>Viabilidad: Alta</p>
        <button>
          <Link to="/proyectos/aguablanca">Ver Detalles</Link>
        </button>
      </div>

      <div className="proyecto-card">
        <h2>Alumbre de Perú Minerals</h2>
        <p>Ubicación: Áncash, Perú</p>
        <p>Viabilidad: Alta</p>
        <button>
          <Link to="/proyectos/alumbre">Ver Detalles</Link>
        </button>
      </div>
    </div>
  );
}

export default App;
