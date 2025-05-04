import { CATEGORIES } from '../../constants';
import supabase from '../../supabase';

export default function Fact({ fact, setFacts, isUpdating, setIsUpdating }) {
  const isDisputed = fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from('facts')
      .update({ [columnName]: fact[columnName] + 1 })
      .eq('id', fact.id)
      .select();
    setIsUpdating(false);

    if (!error) {
      setFacts(facts => facts.map(f => (f.id === fact.id ? updatedFact[0] : f)));
    }
  }

  function speak(text){
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.rate = 1.0;
    speech.pitch = 1.0;
    speech.volume = 1.0;
    window.speechSynthesis.speak(speech);
    
  } 

  

  return (
    <li className='fact'>
      <p>
        {isDisputed && <span className='disputed'>[⛔ DISPUTED]</span>}
        {fact.text}
        <a className='source' href={fact.source} target='_blank' rel="noreferrer">
          (Source)
        </a>
      </p>
      <span
        className='tag'
        style={{ backgroundColor: CATEGORIES.find(cat => cat.name === fact.category).color }}
      >
        {fact.category}
      </span>
      <div className='vote-buttons'>
        <button onClick={() => handleVote('votesInteresting')} disabled={isUpdating}>
          {fact.votesInteresting} 👍
        </button>
        <button onClick={() => handleVote('votesMindblowing')} disabled={isUpdating}>
          {fact.votesMindblowing} 🤯
        </button>
        <button onClick={() => handleVote('votesFalse')} disabled={isUpdating}>
          {fact.votesFalse} ⛔️
        </button>
      </div>
    </li>
  );
}
