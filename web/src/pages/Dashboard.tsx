import { useEffect, useState } from 'react';
import { Activity, TrendingUp, AlertTriangle, Leaf } from 'lucide-react';
import { api } from '../services/apiClient';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.getProfile();
        setProfile(response.data.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome to AgroVision
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {profile?.name}'s Farm Dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Activity className="w-6 h-6" />}
          title="Health Score"
          value="82/100"
          trend="+5%"
          trendUp={true}
        />
        <StatCard
          icon={<Leaf className="w-6 h-6" />}
          title="Active Farms"
          value={profile?.farms?.length || 0}
          trend="Stable"
          trendUp={true}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="NDVI Index"
          value="0.72"
          trend="+0.02"
          trendUp={true}
        />
        <StatCard
          icon={<AlertTriangle className="w-6 h-6" />}
          title="Active Alerts"
          value="1"
          trend="Low"
          trendUp={false}
        />
      </div>

      {/* Farm Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Farm Overview
        </h2>
        {profile?.farms?.map((farm: any) => (
          <div key={farm.id} className="border-b pb-4 mb-4 last:border-b-0">
            <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200">
              {farm.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {farm.location.address}
            </p>
            <div className="mt-2 flex gap-4 text-sm">
              <span className="text-gray-700 dark:text-gray-300">
                Area: {farm.area_hectares} hectares
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                Crops: {farm.crops.join(', ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActionCard title="Analyze Crop" description="Upload image for disease detection" />
        <ActionCard title="View Analytics" description="Check field health metrics" />
        <ActionCard title="Generate Report" description="Create comprehensive farm report" />
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend, trendUp }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="text-primary-600 dark:text-primary-400">{icon}</div>
        <span className={`text-sm ${trendUp ? 'text-green-600' : 'text-yellow-600'}`}>
          {trend}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
    </div>
  );
}

function ActionCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
      <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
    </div>
  );
}
