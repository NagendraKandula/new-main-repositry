// frontend/pages/Analytics.tsx
import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from '../styles/Analytics.module.css';
import axios from '../lib/axios';
import { withAuth } from '../utils/withAuth';
import { GetServerSideProps } from 'next';

interface AnalyticsRow {
  day: string;
  views: number;
  likes: number;
  comments: number;
  subscribers: number;
}

interface SummaryTotals {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalSubscribers: number;
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsRow[]>([]);
  const [summary, setSummary] = useState<SummaryTotals>({
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    totalSubscribers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedRange, setSelectedRange] = useState<'7d' | '28d' | '90d' | '365d' | 'lifetime' | 'month'>('7d');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // 1-12

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Build query params for backend
      const params: Record<string, any> = { range: selectedRange };
      if (selectedRange === 'month') {
        params.year = selectedYear;
        params.month = selectedMonth;
      }

      const response = await axios.get('/youtube-analytics', { params });

      const formattedData: AnalyticsRow[] = response.data.rows.map(
        (row: (string | number)[]) => ({
          day: new Date(row[0] as string).toLocaleDateString(),
          views: row[1] as number,
          likes: row[2] as number,
          comments: row[3] as number,
          subscribers: row[4] as number,
        })
      );

      // Calculate totals
      const totals: SummaryTotals = formattedData.reduce(
        (acc: SummaryTotals, row: AnalyticsRow) => {
          acc.totalViews += row.views;
          acc.totalLikes += row.likes;
          acc.totalComments += row.comments;
          acc.totalSubscribers += row.subscribers;
          return acc;
        },
        { totalViews: 0, totalLikes: 0, totalComments: 0, totalSubscribers: 0 }
      );

      setAnalyticsData(formattedData);
      setSummary(totals);
      setError('');
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(
        'Failed to load analytics data. Please ensure your YouTube account is connected.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch analytics on component mount or when range changes
  useEffect(() => {
    fetchAnalytics();
  }, [selectedRange, selectedYear, selectedMonth]);

  if (loading) return <p className={styles.message}>Loading Analytics...</p>;
  if (error) return <p className={styles.errorMessage}>{error}</p>;

  return (
    <div className={styles.analyticsContainer}>
      <h1 className={styles.header}>📊 YouTube Channel Analytics</h1>

      {/* Range selector */}
      <div className={styles.rangeSelector}>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value as any)}
        >
          <option value="7d">Last 7 Days</option>
          <option value="28d">Last 28 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="365d">Last 365 Days</option>
          <option value="month">Specific Month</option>
          <option value="lifetime">Lifetime</option>
        </select>

        {selectedRange === 'month' && (
          <div className={styles.monthSelector}>
            <input
              type="number"
              min="2000"
              max={new Date().getFullYear()}
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            />
            <input
              type="number"
              min="1"
              max="12"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            />
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Total Views</h3>
          <p className={styles.statValue}>{summary.totalViews.toLocaleString()}</p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Total Likes</h3>
          <p className={styles.statValue}>{summary.totalLikes.toLocaleString()}</p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Total Comments</h3>
          <p className={styles.statValue}>{summary.totalComments.toLocaleString()}</p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Subscribers Gained</h3>
          <p className={styles.statValue}>{summary.totalSubscribers.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart */}
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={analyticsData}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorViews)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Protect SSR page with withAuth HOC
export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
  return { props: {} };
});

export default Analytics;
