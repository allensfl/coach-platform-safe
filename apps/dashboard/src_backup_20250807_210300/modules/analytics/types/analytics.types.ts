export interface AnalyticsMetric {
  id: string
  name: string
  value: number
  previousValue?: number
  change?: number
  changeType: 'increase' | 'decrease' | 'neutral'
  unit: 'number' | 'percentage' | 'currency' | 'time'
  period: 'day' | 'week' | 'month' | 'quarter' | 'year'
}

export interface ChartData {
  id: string
  type: 'line' | 'bar' | 'pie' | 'doughnut'
  title: string
  data: any[]
  labels: string[]
  colors?: string[]
}

export interface Report {
  id: string
  title: string
  type: 'client-progress' | 'session-summary' | 'revenue' | 'performance'
  dateRange: { start: Date; end: Date }
  data: any
  generatedAt: Date
}
