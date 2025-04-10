import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { CommitActivity } from '../../lib/api.ts'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface CommitsChartProps {
  commitsData?: CommitActivity[]
  repoName?: string | null
  isOverallView?: boolean
}

export default function CommitsChart({ commitsData, repoName, isOverallView }: CommitsChartProps) {
  if (!commitsData) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        Loading commit data...
      </div>
    )
  }

  if (commitsData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No commit data available
      </div>
    )
  }

  const chartData = {
    labels: commitsData.map(item => item.date),
    datasets: [
      {
        label: 'Commits',
        data: commitsData.map(item => item.count),
        backgroundColor: isOverallView ? 'rgba(75, 192, 192, 0.7)' : 'rgba(59, 130, 246, 0.7)',
        borderColor: isOverallView ? 'rgba(75, 192, 192, 1)' : 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: isOverallView 
          ? 'Overall Commit Activity (All Repositories)'
          : `Commit Activity for ${repoName}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Commits',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Bar data={chartData} options={options} />
    </div>
  )
}