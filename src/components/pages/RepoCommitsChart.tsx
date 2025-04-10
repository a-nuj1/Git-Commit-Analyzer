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
import { DailyCommitActivity } from '../../lib/api.ts'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface RepoCommitsChartProps {
  repoName: string
  commits: DailyCommitActivity[]
}

export default function RepoCommitsChart({ repoName, commits }: RepoCommitsChartProps) {
  const chartData = {
    labels: commits.map(day => day.date),
    datasets: [
      {
        label: 'Commits',
        data: commits.map(day => day.count),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
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
        text: `Daily Commits for ${repoName} (Last 30 Days)`,
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
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <Bar data={chartData} options={options} height={200} />
    </div>
  )
}