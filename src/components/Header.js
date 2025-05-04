import { useTheme } from '../context/ThemeContext';

export default function Header({ showForm, setShowForm, showStats, setShowStats, fetchRandomFact }) {
  const appTitle = 'Did you know ?';
  const { theme, toggleTheme } = useTheme();

  return (
    <header className='header'>
      <div className='logo'>
        <img src='logo.png' alt='Today I learned logo' />
        <h1>{appTitle}</h1>
      </div>
      <div className='header-controls'>
        <button
          className='btn btn-large btn-stats'
          onClick={(e) => setShowStats(e)}
          title={showStats ? 'Hide stats' : 'Show stats'}
        >
          📊
        </button>
        <button
          className='btn btn-large btn-theme'
          onClick={toggleTheme}
          title={theme === 'light' ? 'Dark mode' : 'Light mode'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button
          className='btn btn-large btn-open'
          onClick={() => setShowForm(showForm => !showForm)}>
          {showForm ? 'close' : 'Share a fact'}
        </button>
        <button
          className='btn btn-large btn-open'
          onClick={fetchRandomFact}
          title='Get a random fact'
        >
          Random Fact
        </button>
      </div>
    </header>
  );
}
