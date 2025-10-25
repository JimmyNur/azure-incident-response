import { useEffect, useState } from 'react';
import { Download, FileText, Clock } from 'lucide-react';
import { api } from '../services/apiClient';

export default function Reports() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.listReports('farm_001');
        setReports(response.data.data.reports || []);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      const response = await api.generateReport({
        farm_id: 'farm_001',
        report_type: 'comprehensive',
        period: {
          start_date: '2025-01-01',
          end_date: '2025-01-31',
        },
        sections: ['field_health', 'disease_incidents', 'irrigation', 'market_analysis'],
        format: 'pdf',
        email_delivery: false,
      });
      
      // Add new report to list
      setReports([
        {
          report_id: response.data.data.report_id,
          farm_id: 'farm_001',
          report_type: 'comprehensive',
          created_at: new Date().toISOString(),
          status: 'processing',
        },
        ...reports,
      ]);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate and manage farm reports</p>
        </div>
        <button
          onClick={handleGenerateReport}
          disabled={generating}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <FileText className="w-5 h-5" />
          {generating ? 'Generating...' : 'Generate New Report'}
        </button>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReportTypeCard
          title="Comprehensive Report"
          description="Full farm analysis with all metrics"
          features={['Field Health', 'Disease Analysis', 'Market Data', 'Recommendations']}
        />
        <ReportTypeCard
          title="Health Report"
          description="Focused on crop and field health"
          features={['NDVI Analysis', 'Soil Metrics', 'Disease Incidents', 'Alerts']}
        />
        <ReportTypeCard
          title="Market Report"
          description="Market trends and pricing analysis"
          features={['Price History', 'Forecasts', 'Demand Analysis', 'Recommendations']}
        />
      </div>

      {/* Recent Reports */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Recent Reports
        </h2>
        {reports.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No reports generated yet. Click "Generate New Report" to create one.
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => (
              <ReportCard key={report.report_id} report={report} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReportTypeCard({ title, description, features }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-2 border-transparent hover:border-primary-500 transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReportCard({ report }: { report: any }) {
  const statusColors: any = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
          <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white capitalize">
            {report.report_type?.replace('_', ' ')} Report
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(report.created_at).toLocaleDateString()}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                statusColors[report.status] || statusColors.processing
              }`}
            >
              {report.status}
            </span>
          </div>
        </div>
      </div>
      {report.status === 'completed' && (
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download
        </button>
      )}
    </div>
  );
}
