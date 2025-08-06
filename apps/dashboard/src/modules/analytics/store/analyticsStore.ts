import { create } from 'zustand'
import { AnalyticsMetric, ChartData, Report } from '../types/analytics.types'

interface AnalyticsState {
  metrics: AnalyticsMetric[]
  charts: ChartData[]
  reports: Report[]
  isLoading: boolean
  
  updateMetrics: () => void
  generateReport: (type: Report['type'], dateRange: { start: Date; end: Date }) => void
  getMetricsByPeriod: (period: AnalyticsMetric['period']) => AnalyticsMetric[]
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  metrics: [
    {
      id: '1',
      name: 'Total Clients',
      value: 15,
      previousValue: 12,
      change: 25,
      changeType: 'increase',
      unit: 'number',
      period: 'month'
    },
    {
      id: '2',
      name: 'Sessions This Month',
      value: 28,
      previousValue: 24,
      change: 16.7,
      changeType: 'increase',
      unit: 'number',
      period: 'month'
    },
    {
      id: '3',
      name: 'Client Satisfaction',
      value: 94,
      previousValue: 91,
      change: 3.3,
      changeType: 'increase',
      unit: 'percentage',
      period: 'month'
    },
    {
      id: '4',
      name: 'Monthly Revenue',
      value: 8500,
      previousValue: 7200,
      change: 18.1,
      changeType: 'increase',
      unit: 'currency',
      period: 'month'
    }
  ],
  charts: [
    {
      id: '1',
      type: 'line',
      title: 'Session Trends',
      data: [12, 15, 18, 22, 28, 25, 30],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    {
      id: '2',
      type: 'doughnut',
      title: 'Session Types',
      data: [60, 25, 15],
      labels: ['Individual', 'Group', 'Workshop'],
      colors: ['#3B82F6', '#10B981', '#F59E0B']
    }
  ],
  reports: [],
  isLoading: false,
  
  updateMetrics: () => {
    // Simulate metric updates
    set((state) => ({
      metrics: state.metrics.map(metric => ({
        ...metric,
        value: metric.value + Math.floor(Math.random() * 5)
      }))
    }))
  },
  
  generateReport: (type, dateRange) => {
    const newReport: Report = {
      id: Date.now().toString(),
      title: `${type} Report`,
      type,
      dateRange,
      data: { summary: 'Generated report data' },
      generatedAt: new Date()
    }
    set((state) => ({
      reports: [...state.reports, newReport]
    }))
  },
  
  getMetricsByPeriod: (period) => get().metrics.filter(metric => metric.period === period)
}))
