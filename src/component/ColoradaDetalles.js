import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "0x99E77768Fd4EFe16965c1fEBd5C67f0Ad2E9E3cF";
const contractABI = [
  "function buyTokens() public payable",
  "function precioPorToken() public view returns (uint256)",
  "function balanceOf(address) public view returns (uint256)",
  "function decimals() public view returns (uint8)",
  "function symbol() public view returns (string)"
];

// Cambiar esta constante para Amoy testnet
const POLYGON_CHAIN_ID = "0x13882"; // Amoy testnet

const ColoradaDetalles = () => {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenPrice, setTokenPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [error, setError] = useState("");

  // Verificar red actual
  const checkNetwork = async () => {
    try {
      if (!window.ethereum) return false;

      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      });

      if (chainId !== POLYGON_CHAIN_ID) {
        setNetworkError(true);
        return false;
      }

      setNetworkError(false);
      return true;
    } catch (err) {
      console.error("Error checking network:", err);
      return false;
    }
  };

  // Inicializar y verificar wallet
  const initializeWallet = async () => {
    try {
      if (!window.ethereum) {
        setError("Por favor instala MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const isCorrectNetwork = await checkNetwork();
        if (isCorrectNetwork) {
          await fetchTokenPrice();
        }
      }
    } catch (err) {
      console.error("Error initializing:", err);
    }
  };

  useEffect(() => {
    initializeWallet();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange);
      window.ethereum.on('chainChanged', handleChainChange);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountChange);
        window.ethereum.removeListener('chainChanged', handleChainChange);
      }
    };
  }, []);

  const handleAccountChange = async (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      await checkNetwork();
    } else {
      setAccount("");
    }
  };

  const handleChainChange = async () => {
    await checkNetwork();
    window.location.reload();
  };

  // Modificar la función switchToPolygon
  const switchToPolygon = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: POLYGON_CHAIN_ID }]
      });
      setNetworkError(false);
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: POLYGON_CHAIN_ID,
              chainName: 'Polygon Amoy Testnet',
              nativeCurrency: {
                name: 'POL',
                symbol: 'POL',
                decimals: 18
              },
              rpcUrls: ['https://polygon-amoy.infura.io'],
              blockExplorerUrls: ['https://www.oklink.com/amoy']
            }]
          });
          setNetworkError(false);
        } catch (error) {
          setError("No se pudo añadir la red Amoy");
        }
      } else {
        setError("Por favor cambia a la red Amoy en tu wallet");
      }
    }
  };

  const fetchTokenPrice = async () => {
    if (!window.ethereum || networkError) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const price = await contract.precioPorToken();
      setTokenPrice(ethers.utils.formatEther(price));
    } catch (err) {
      console.error("Error fetching token price:", err);
      if (err.code === 'NETWORK_ERROR') {
        setNetworkError(true);
      }
    }
  };

  const connectWallet = async () => {
    setError("");
    setLoading(true);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask no está instalada");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      setAccount(accounts[0]);

      const isCorrectNetwork = await checkNetwork();
      if (!isCorrectNetwork) {
        await switchToPolygon();
      }

      await fetchTokenPrice();
    } catch (err) {
      console.error("Connection error:", err);
      setError(err.message || "Error al conectar");
    } finally {
      setLoading(false);
    }
  };

  // Modificar la función buyTokens para manejar mejor los errores de gas
  const buyTokens = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Ingresa un monto válido");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const maticAmount = ethers.utils.parseEther(amount);

      // Agregar un margen de gas más alto para Amoy
      const gasLimit = ethers.BigNumber.from("3000000"); // Gas limit más alto
      const gasPrice = await provider.getGasPrice();

      const tx = await contract.buyTokens({
        value: maticAmount,
        gasLimit: gasLimit,
        gasPrice: gasPrice
      });

      setLoading(true);
      await tx.wait();

      alert("¡Compra exitosa!");
      setAmount("");

    } catch (err) {
      console.error("Error en la compra:", err);
      if (err.code === 'INSUFFICIENT_FUNDS') {
        setError("Fondos insuficientes de POL para completar la transacción");
      } else if (err.code === 'UNPREDICTABLE_GAS_LIMIT') {
        setError("Error al calcular el gas. Intenta con un monto más alto");
      } else if (err.message.includes("user rejected")) {
        setError("Transacción rechazada por el usuario");
      } else {
        setError(err.message || "Error en la transacción");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Colorada de Newmont Perú</h1>

      {networkError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
          <p className="text-yellow-700">
            Por favor conecta a la red Polygon
            <button
              onClick={switchToPolygon}
              className="ml-4 bg-yellow-500 text-white px-4 py-1 rounded"
            >
              Cambiar a Polygon
            </button>
          </p>
        </div>
      )}

      <div className="bg-white shadow-md rounded p-6 mb-4">
        <p className="mb-2"><strong>Ubicación:</strong> La Libertad, Perú</p>
        <p className="mb-2"><strong>Recursos:</strong> Oro, Plata</p>
        <p className="mb-2"><strong>Etapa:</strong> Exploración avanzada</p>
        <p className="mb-2"><strong>Monto mínimo:</strong> $10 USD</p>
        <p className="mb-2"><strong>Rentabilidad esperada:</strong> 14%</p>
        <p className="mb-2"><strong>Riesgo:</strong> Medio</p>
        <p className="mb-4">
          <strong>Descripción:</strong> Newmont garantiza altos estándares de sostenibilidad y
          monitoreo ambiental en sus operaciones. El proyecto tiene potencial para
          una gran producción aurífera.
        </p>
      </div>

      <div className="bg-white shadow-md rounded p-6">
        {tokenPrice && (
          <p className="mb-4">
            <strong>Precio del token:</strong> {tokenPrice} MATIC
          </p>
        )}

        {!account ? (
          <button
            onClick={connectWallet}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Conectando..." : "Conectar Wallet"}
          </button>
        ) : (
          <div>
            <p className="mb-2">
              <strong>Wallet:</strong> {account.slice(0, 6)}...{account.slice(-4)}
            </p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Cantidad en MATIC"
              className="w-full p-2 border rounded mb-4"
              min="0"
              step="0.01"
              disabled={networkError}
            />
            <button
              onClick={buyTokens}
              disabled={loading || !amount || networkError}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              {loading ? "Procesando..." : "Comprar Tokens"}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColoradaDetalles;