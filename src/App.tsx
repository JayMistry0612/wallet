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
  const [showWallet, setShowWallet] = useState(false);

  const handleAccountCreate = (account: { account: Account; seedPhrase: string }) => {
    setWallet(account);
    setShowWallet(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {!showWallet ? (
        // First Screen - Logo and Account Options
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-7xl">
            <div className="backdrop-blur-lg rounded-[2.5rem] shadow-2xl p-12 border border-white/20">
              <div className="flex flex-col items-center mb-20">
                <div className="relative">
                  <h1 className="text-7xl font-bold text-white mb-4 tracking-tight">PedalUps</h1>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-30"></div>
                </div>
                <p className="text-xl text-white/80 font-medium">Your Web3 Wallet Solution</p>
              </div>
              <div className="border-t border-white/10 pt-12">
                <div className="max-w-3xl mx-auto">
                  <AccountCreate onAccountCreate={handleAccountCreate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Second Screen - Wallet Information
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-5xl">
            <div className="bg-white/10 backdrop-blur-lg rounded-[2.5rem] shadow-2xl p-12 border border-white/20">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center space-x-4">
                  <h1 className="text-4xl font-bold text-white">PedalUps Wallet</h1>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">W</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowWallet(false)}
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
              </div>

              {/* Wallet Address Section */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Wallet Address</h2>
                  <button
                    onClick={() => copyToClipboard(wallet?.account.address || '')}
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
                <p className="text-white/80 font-mono text-sm break-all">{wallet?.account.address}</p>
              </div>

              {/* Recovery Phrase Section */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Recovery Phrase</h2>
                  <button
                    onClick={() => copyToClipboard(wallet?.seedPhrase || '')}
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {wallet?.seedPhrase.split(' ').map((word, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-2 text-center">
                      <span className="text-white/60 text-sm">{index + 1}.</span>
                      <span className="text-white/80 ml-1">{word}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <CoinSelector />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
