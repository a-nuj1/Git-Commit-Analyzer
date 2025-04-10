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
}

export default function CommitsChart({ commitsData, repoName }: CommitsChartProps) {
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
        No commit data available for this repository
      </div>
    )
  }

  // Group commits by week
  const groupedByWeek = commitsData.reduce((acc, commit) => {
    const date = new Date(commit.date)
    const year = date.getFullYear()
    const weekNumber = getWeekNumber(date)
    const weekKey = `${year}-W${weekNumber.toString().padStart(2, '0')}`
    
    if (!acc[weekKey]) {
      acc[weekKey] = {
        weekStart: getStartOfWeek(date),
        commits: 0
      }
    }
    acc[weekKey].commits += commit.count
    
    return acc
  }, {} as Record<string, { weekStart: Date, commits: number }>)

  // Convert to array and sort by date
  const weeklyData = Object.entries(groupedByWeek)
    .map(([week, data]) => ({
      week,
      weekStart: data.weekStart,
      commits: data.commits
    }))
    .sort((a, b) => a.weekStart.getTime() - b.weekStart.getTime())

  // Format for chart
  const chartData = {
    labels: weeklyData.map(item => `Week ${item.week.split('-W')[1]}`),
    datasets: [
      {
        label: 'Commits',
        data: weeklyData.map(item => item.commits),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Commit Activity for ${repoName}`,
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const weekData = weeklyData[context.dataIndex]
            const startDate = weekData.weekStart.toLocaleDateString()
            const endDate = new Date(weekData.weekStart)
            endDate.setDate(endDate.getDate() + 6)
            return [
              `Week ${weekData.week.split('-W')[1]}`,
              `${startDate} - ${endDate.toLocaleDateString()}`,
              `Commits: ${context.raw}`
            ]
          }
        }
      }
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
          text: 'Week Number',
        },
        ticks: {
          autoSkip: false
        }
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 h-[400px]">
      <Bar data={chartData} options={options} />
    </div>
  )
}


function getWeekNumber(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
  const week1 = new Date(d.getFullYear(), 0, 4)
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

function getStartOfWeek(date: Date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff))
}