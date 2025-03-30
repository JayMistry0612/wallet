import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CoinPrice {
  ethereum: {
    usd: number;
    usd_24h_change: number;
    usd_24h_vol: number;
    last_updated: string;
  };
  solana: {
    usd: number;
    usd_24h_change: number;
    usd_24h_vol: number;
    last_updated: string;
  };
}

const CoinSelector: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<'ethereum' | 'solana'>('ethereum');
  const [price, setPrice] = useState<CoinPrice>({
    ethereum: {
      usd: 0,
      usd_24h_change: 0,
      usd_24h_vol: 0,
      last_updated: ''
    },
    solana: {
      usd: 0,
      usd_24h_change: 0,
      usd_24h_vol: 0,
      last_updated: ''
    }
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,solana&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_last_updated_at=true'
        );
        setPrice({
          ethereum: {
            usd: response.data.ethereum.usd,
            usd_24h_change: response.data.ethereum.usd_24h_change,
            usd_24h_vol: response.data.ethereum.usd_24h_vol,
            last_updated: response.data.ethereum.last_updated_at
          },
          solana: {
            usd: response.data.solana.usd,
            usd_24h_change: response.data.solana.usd_24h_change,
            usd_24h_vol: response.data.solana.usd_24h_vol,
            last_updated: response.data.solana.last_updated_at
          }
        });
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(volume);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="relative">
      <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value as 'ethereum' | 'solana')}
            className="bg-white border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
          </select>
          <span className="text-xs text-gray-500">
            Updated: {formatTime(price[selectedCoin].last_updated)}
          </span>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(price[selectedCoin].usd)}
          </span>
          <span className={`text-sm ${price[selectedCoin].usd_24h_change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {price[selectedCoin].usd_24h_change >= 0 ? '↑' : '↓'} {Math.abs(price[selectedCoin].usd_24h_change).toFixed(2)}%
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Vol: {formatVolume(price[selectedCoin].usd_24h_vol)}
        </div>
      </div>
    </div>
  );
};

export default CoinSelector; 