import React, { useState } from "react";
import { ethers } from "ethers";

const contractAddress = "0x26de7B4A3d6A250c5682da9F81d6d2753c503d5a"; // Dirección del contrato
const contractABI = [
  "function buyTokens() public payable",
  "function precioPorToken() public view returns (uint256)",
];

const WalletInteraction = () => {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");

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
      alert("Por favor, instala MetaMask.");
    }
  };

  const buyTokens = async () => {
    if (!window.ethereum) {
      alert("Necesitas MetaMask para realizar esta transacción.");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tokenPrice = await contract.precioPorToken();
      const maticAmount = ethers.utils.parseEther(amount);

      if (maticAmount.lt(tokenPrice)) {
        alert("Monto insuficiente para comprar tokens.");
        return;
      }

      const tx = await contract.buyTokens({ value: maticAmount });
      await tx.wait();
      alert("Compra de tokens realizada con éxito.");
    } catch (error) {
      console.error("Error al comprar tokens:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Interactuar con MetaMask</h1>
      <button
        onClick={connectWallet}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Conectar Wallet
      </button>
      {account && <p>Cuenta conectada: {account}</p>}
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Monto a invertir en MATIC"
        className="border p-2 mt-4"
      />
      <button
        onClick={buyTokens}
        className="bg-green-500 text-white p-2 rounded mt-4"
      >
        Comprar Tokens
      </button>
    </div>
  );
};

export default WalletInteraction;
