import React, { useState } from "react";
import AccountCreate from "./components/AccountCreate";
import CoinSelector from "./components/CoinSelector";

interface Account {
  privateKey: string;
  address: string;
  balance: string;
}

const App: React.FC = () => {
  const [wallet, setWallet] = useState<{ account: Account; seedPhrase: string } | null>(null);

  const handleAccountCreate = (account: { account: Account; seedPhrase: string }) => {
    setWallet(account);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Pixel Web3 Wallet</h1>
              <CoinSelector />
            </div>
            <div className="border-t border-gray-200 pt-8">
              <AccountCreate onAccountCreate={handleAccountCreate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
