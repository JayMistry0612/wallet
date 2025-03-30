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
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState<'main' | 'token' | 'recover' | 'logout'>('main');

  const handleAccountCreate = (account: { account: Account; seedPhrase: string }) => {
    setWallet(account);
    setShowWallet(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleLogout = () => {
    setWallet(null);
    setShowWallet(false);
    setCurrentPage('main');
    
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'token':
        return (
          <div className="space-y-8 px-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Token Details</h2>
                <p className="text-white/80">View your wallet information and balance</p>
              </div>
              <button
                onClick={() => setCurrentPage('main')}
                className="text-white/90 hover:text-white transition-colors duration-200 flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back</span>
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-6">Wallet Address</h3>
                <div className="flex items-center space-x-4 bg-white/5 rounded-lg p-6">
                  <p className="text-white/90 font-mono text-base break-all flex-grow min-w-0">{wallet?.account.address}</p>
                  <button
                    onClick={() => copyToClipboard(wallet?.account.address || '')}
                    className="text-white/80 hover:text-white transition-colors duration-200 flex-shrink-0 bg-white/5 p-3 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-6">Balance</h3>
                <div className="bg-white/5 rounded-lg p-6">
                  <p className="text-white/90 text-3xl font-bold">{wallet?.account.balance} ETH</p>
                  <p className="text-white/60 text-sm mt-2">Current Balance</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6">Transaction History</h3>
              <div className="bg-white/5 rounded-lg p-6">
                <p className="text-white/60 text-center py-6">No recent transactions</p>
              </div>
            </div>
          </div>
        );
      case 'recover':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Recover Account</h2>
                <p className="text-white/80">Your 12-word recovery phrase</p>
              </div>
              <button
                onClick={() => setCurrentPage('main')}
                className="text-white/90 hover:text-white transition-colors duration-200 flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back</span>
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Recovery Phrase</h2>
                <button
                  onClick={() => copyToClipboard(wallet?.seedPhrase || '')}
                  className="text-white/80 hover:text-white transition-colors duration-200 bg-white/5 px-3 py-1 rounded-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {wallet?.seedPhrase.split(' ').map((word, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-3 text-center">
                    <span className="text-white/60 text-sm">{index + 1}.</span>
                    <span className="text-white/90 ml-1 font-medium">{word}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'main':
      default:
        return (
          <>
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl font-bold text-white">PedalUps Wallet</h1>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-white/90 hover:text-white transition-colors duration-200 flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg"
                >
                  <span>Menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-2">
                    <button
                      onClick={() => {
                        setCurrentPage('token');
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Token Details
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage('recover');
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Recover Account
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <CoinSelector />
            </div>
          </>
        );
    }
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
                <p className="text-xl text-white/90 font-medium">Your Web3 Wallet Solution</p>
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
          <div className="w-full max-w-7xl">
            <div className="bg-white/10 backdrop-blur-lg rounded-[2.5rem] shadow-2xl p-12 border border-white/20">
              {renderContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
