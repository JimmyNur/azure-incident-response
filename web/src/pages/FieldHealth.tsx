import { useEffect, useState } from 'react';
import { TrendingUp, Droplets, Thermometer, AlertCircle } from 'lucide-react';
import { api } from '../services/apiClient';

export default function FieldHealth() {
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await api.getFieldHealth('farm_001');
        setHealthData(response.data.data);
      } catch (error) {
        console.error('Error fetching health data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHealthData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading field health data...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Field Health Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {healthData?.farm_name} - Overall Score: {healthData?.overall_health_score}/100
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="NDVI Index"
          value={healthData?.metrics?.ndvi?.current}
          status={healthData?.metrics?.ndvi?.status}
          trend={healthData?.metrics?.ndvi?.trend}
        />
        <MetricCard
          icon={<Droplets className="w-6 h-6" />}
          title="Soil Moisture"
          value={`${healthData?.metrics?.soil_moisture?.current}%`}
          status={healthData?.metrics?.soil_moisture?.status}
          trend={healthData?.metrics?.soil_moisture?.trend}
        />
        <MetricCard
          icon={<Thermometer className="w-6 h-6" />}
          title="Temperature"
          value={`${healthData?.metrics?.temperature?.current}°C`}
          status={healthData?.metrics?.temperature?.status}
          trend={healthData?.metrics?.temperature?.trend}
        />
      </div>

      {/* NDVI History Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          NDVI History
        </h2>
        <div className="space-y-2">
          {healthData?.metrics?.ndvi?.history?.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.date}</span>
              <div className="flex items-center gap-2">
                <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ width: `${item.value * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      {healthData?.alerts && healthData.alerts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Active Alerts
          </h2>
          <div className="space-y-3">
            {healthData.alerts.map((alert: any) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{alert.message}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {new Date(alert.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {healthData?.recommendations && healthData.recommendations.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Recommendations
          </h2>
          <div className="space-y-3">
            {healthData.recommendations.map((rec: any, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{rec.type}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    Priority: {rec.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ icon, title, value, status, trend }: any) {
  const statusColors: any = {
    good: 'text-green-600 dark:text-green-400',
    optimal: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    critical: 'text-red-600 dark:text-red-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-primary-600 dark:text-primary-400">{icon}</div>
        <span className={`text-sm font-medium ${statusColors[status] || 'text-gray-600'}`}>
          {status}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 capitalize">
        Trend: {trend}
      </p>
    </div>
  );
}
