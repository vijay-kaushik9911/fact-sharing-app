import { useEffect, useState } from 'react';
import supabase from './supabase';
import './style.css';
import { ThemeProvider } from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import NewFactForm from './components/NewFactForm';
import CategoryFilter from './components/CategoryFilter';
import FactList from './components/FactList';
import StatsPanel from './components/StatsPanel';
import Loader from './components/Loader';
import { CATEGORIES } from './constants';
import RandomFact from './components/RandomFact';
import axios from 'axios';


function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [showStats, setShowStats] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({x: 0, y: 0});
  const [randomFact, setRandomFact] = useState(null);
  const [showRandomFact, setShowRandomFact] = useState(false);

  const handleStatsToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setButtonPosition({
      x: rect.left + rect.width/2,
      y: rect.top + rect.height/2
    });
    setShowStats(!showStats);
  };

  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);
      let query = supabase.from('facts').select('*');

      if (currentCategory !== 'all') {
        query = query.eq('category', currentCategory);
      }

      query = query.order('votesInteresting', { ascending: false });

      const { data: facts, error } = await query;
      if (!error) setFacts(facts);
      else alert('There was a problem getting data');
      setIsLoading(false);
    }
    getFacts();
  }, [currentCategory]);

  const fetchRandomFact = async () => {
    try {
      const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
      setRandomFact(response.data.text);
      setShowRandomFact(true);
    } catch (error) {
      console.error('Error fetching random fact:', error);
      setRandomFact("Couldn't fetch a random fact. Please try again.");
    }
  };

  return (
    <>
        <Header 
          showForm={showForm} 
          setShowForm={setShowForm}
          showStats={showStats}
          setShowStats={handleStatsToggle}
          fetchRandomFact={fetchRandomFact}
        />
      {showForm && <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />}
      {showRandomFact && <RandomFact randomFact={randomFact} onClose={() => setShowRandomFact(false)} />}

      <main className='main'>
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        
        {isLoading ? <Loader /> : (
          <>
            <FactList facts={facts} setFacts={setFacts} />
          
            <AnimatePresence>
              {showStats && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="stats-overlay"
                    onClick={() => setShowStats(false)}
                  />
                  <motion.div
                    initial={{ 
                      opacity: 0, 
                      scale: 0.1,
                      x: buttonPosition.x - window.innerWidth/2,
                      y: buttonPosition.y - window.innerHeight/2
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x: 0,
                      y: 0
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <StatsPanel facts={facts} categories={CATEGORIES}/>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </main>
    </>
  );
}

export default function AppWithTheme() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
