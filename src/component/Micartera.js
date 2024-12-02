import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

// Dirección del contrato y ABI
const contractAddress = "0x26de7B4A3d6A250c5682da9F81d6d2753c503d5a"; // Reemplaza con la dirección de tu contrato desplegado
const contractABI = [
  // ABI del contrato
  "function balanceOf(address owner) public view returns (uint256)",
  "function precioPorToken() public view returns (uint256)",
];

const MiCartera = () => {
  const [account, setAccount] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);

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

  // Obtener el balance de tokens del usuario
  const fetchTokenBalance = async () => {
    if (!account) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const balance = await contract.balanceOf(account);
    setTokenBalance(ethers.utils.formatUnits(balance, 18)); // Ajusta el decimal según sea necesario
  };

  // Obtener balance al cargar el componente
  useEffect(() => {
    if (account) {
      fetchTokenBalance();
    }
  }, [account]);

  return (
    <div>
      <h1>Mi Cartera</h1>
      {!account && <button onClick={connectWallet}>Conectar Wallet</button>}
      {account && (
        <div>
          <h2>Balance de Tokens</h2>
          <p>{tokenBalance} BPT</p> {/* Mostrar balance de tokens */}
        </div>
      )}
    </div>
  );
};

export default MiCartera;
