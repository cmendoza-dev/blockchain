import React, { useState } from "react";
import { ethers } from "ethers";

// Dirección del contrato y ABI
const contractAddress = "0x26de7B4A3d6A250c5682da9F81d6d2753c503d5a"; // Reemplaza con la dirección de tu contrato desplegado
const contractABI = [
  // ABI del contrato
  "function buyTokens() public payable",
  "function precioPorToken() public view returns (uint256)",
];

const LaLimaDetalles = () => {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");

  // Conectar la wallet y obtener la cuenta
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error al conectar la wallet:", error);
      }
    } else {
      alert("MetaMask no está instalada. Por favor, instálala.");
    }
  };

  // Función para comprar tokens
  const buyTokens = async () => {
    if (!window.ethereum) {
      alert("Necesitas MetaMask para realizar esta transacción.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Calcular la cantidad de tokens a comprar
      const tokenPrice = await contract.precioPorToken();
      const maticAmount = ethers.utils.parseEther(amount); // Cantidad de MATIC a invertir

      // Verificar si el monto de MATIC es suficiente
      if (maticAmount.lt(tokenPrice)) {
        alert("Monto insuficiente para comprar tokens.");
        return;
      }

      // Ejecutar la transacción
      const tx = await contract.buyTokens({
        value: maticAmount, // Cantidad de MATIC enviada
      });

      await tx.wait(); // Esperar a que se confirme la transacción
      alert("Compra de tokens realizada con éxito.");
    } catch (error) {
      console.error("Error en la compra de tokens:", error);
      alert("Error al intentar comprar tokens.");
    }
  };

  return (
    <div>
      <h1>La Lima de Compañía Minera Poderosa</h1>
      <p>Ubicación: La Libertad, Perú</p>
      <p>Recursos: Cobre</p>
      <p>Etapa: Exploración y desarrollo</p>
      <p>Monto mínimo de inversión: $5 USD</p>
      <p>Rentabilidad esperada: 15%</p>
      <p>Riesgo: Alto</p>
      <p>
        Descripción: La Lima es un proyecto emergente con alto potencial
        aurífero. Minera Poderosa es una de las empresas auríferas más grandes
        de Perú, y se proyecta que La Lima contribuya de manera significativa a
        la producción nacional en los próximos años.
      </p>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Monto a invertir en MATIC"
      />
      <button onClick={buyTokens}>Comprar Tokens</button>
      {!account && <button onClick={connectWallet}>Conectar Wallet</button>}
    </div>
  );
};

export default LaLimaDetalles;
