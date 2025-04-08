import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import '../style.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function StatsPanel({ facts, categories }) {
  // Calculate total votes
  const totalVotes = facts.reduce((sum, fact) => {
    return sum + fact.votesInteresting + fact.votesMindblowing + fact.votesFalse;
  }, 0);

  // Prepare data for charts
  const voteData = {
    labels: ['👍 Interesting', '🤯 Mindblowing', '⛔️ False'],
    datasets: [{
      data: [
        facts.reduce((sum, fact) => sum + fact.votesInteresting, 0),
        facts.reduce((sum, fact) => sum + fact.votesMindblowing, 0),
        facts.reduce((sum, fact) => sum + fact.votesFalse, 0)
      ],
      backgroundColor: ['#3b82f6', '#8b5cf6', '#ef4444'],
      borderColor: ['#2563eb', '#7c3aed', '#dc2626'],
      borderWidth: 1
    }]
  };

  const categoryData = {
    labels: categories.map(cat => cat.name),
    datasets: [{
      label: 'Total Votes',
      data: categories.map(cat => 
        facts.filter(fact => fact.category === cat.name)
          .reduce((sum, fact) => sum + fact.votesInteresting + fact.votesMindblowing + fact.votesFalse, 0)
      ),
      backgroundColor: categories.map(cat => cat.color),
    }]
  };

  const topFacts = [...facts]
    .sort((a, b) => (b.votesInteresting + b.votesMindblowing) - (a.votesInteresting + a.votesMindblowing))
    .slice(0, 5);

  return (
    <div className="stats-panel">
      <h2>📊 Fact Statistics</h2>
      <p>Total votes: {totalVotes} • Total facts: {facts.length}</p>
      
      <div className="charts-container">
        <div className="chart">
          <h3>Vote Distribution</h3>
          <Pie data={voteData} options={{ responsive: true }} />
        </div>
        <div className="chart">
          <h3>Votes by Category</h3>
          <Bar data={categoryData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="top-facts">
        <h3>🌟 Top Rated Facts</h3>
        <ol>
          {topFacts.map(fact => (
            <li key={fact.id}>
              <span className="fact-text">{fact.text}</span>
              <span className="fact-votes">
                {fact.votesInteresting + fact.votesMindblowing} votes
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
