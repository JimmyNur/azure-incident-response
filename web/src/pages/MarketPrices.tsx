import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { api } from '../services/apiClient';

export default function MarketPrices() {
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState('wheat');

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await api.getMarketPrices(selectedCrop, 'riyadh', 30);
        setMarketData(response.data.data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarketData();
  }, [selectedCrop]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading market data...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Market Prices</h1>
        <p className="text-gray-600 dark:text-gray-400">Real-time crop pricing and trends</p>
      </div>

      {/* Crop Selector */}
      <div className="flex gap-2">
        {['wheat', 'tomato', 'dates', 'corn'].map((crop) => (
          <button
            key={crop}
            onClick={() => setSelectedCrop(crop)}
            className={`px-4 py-2 rounded-lg capitalize ${
              selectedCrop === crop
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {crop}
          </button>
        ))}
      </div>

      {/* Current Price */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {marketData?.crop}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{marketData?.region}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {marketData?.currency} {marketData?.current_price}
            </p>
            <div className="flex items-center justify-end gap-2 mt-1">
              {marketData?.price_change?.direction === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span
                className={`text-sm ${
                  marketData?.price_change?.direction === 'up'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {marketData?.price_change?.percentage}% ({marketData?.price_change?.amount}{' '}
                {marketData?.currency})
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Market Status: <span className="capitalize">{marketData?.market_status}</span>
          </p>
        </div>
      </div>

      {/* Price History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Price History (30 days)
        </h2>
        <div className="space-y-3">
          {marketData?.historical_data?.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.date}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Volume: {item.volume}t
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {marketData?.currency} {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Forecast</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ForecastCard
            title="Next 7 Days"
            prediction={marketData?.forecast?.next_7_days}
            confidence={marketData?.forecast?.confidence}
          />
          <ForecastCard
            title="Next 30 Days"
            prediction={marketData?.forecast?.next_30_days}
            confidence={marketData?.forecast?.confidence}
          />
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Confidence Level
            </p>
            <p className="text-2xl font-bold text-primary-600">
              {(marketData?.forecast?.confidence * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {marketData?.recommendations && marketData.recommendations.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Recommendations
          </h2>
          <div className="space-y-3">
            {marketData.recommendations.map((rec: any, index: number) => (
              <div key={index} className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <p className="font-medium text-gray-900 dark:text-white capitalize">
                  Action: {rec.action}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{rec.reasoning}</p>
                {rec.potential_gain_percentage && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Potential Gain: +{rec.potential_gain_percentage}%
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Demand Indicators */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Market Indicators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <IndicatorCard
            title="Local Demand"
            value={marketData?.demand_indicators?.local_demand}
          />
          <IndicatorCard
            title="Export Opportunities"
            value={marketData?.demand_indicators?.export_opportunities ? 'Yes' : 'No'}
          />
          <IndicatorCard
            title="Competition Level"
            value={marketData?.demand_indicators?.competition_level}
          />
        </div>
      </div>
    </div>
  );
}

function ForecastCard({ title, prediction, confidence }: any) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{title}</p>
      <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
        {prediction?.replace('_', ' ')}
      </p>
    </div>
  );
}

function IndicatorCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
      <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{value}</p>
    </div>
  );
}
