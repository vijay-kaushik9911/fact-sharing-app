import { useState } from 'react';
import supabase from '../../supabase';
import Fact from './Fact';
import { CATEGORIES } from '../../constants';

export default function FactList({ facts, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);

  if (facts.length === 0) {
    return (
      <p className='message'>
        No facts for this category yet! Create the first one.
      </p>
    );
  }

  return (
    <section>
      <ul className='facts-list'>
        {facts.map(fact => (
          <Fact 
            key={fact.id} 
            fact={fact} 
            setFacts={setFacts}
            isUpdating={isUpdating}
            setIsUpdating={setIsUpdating}
          />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}
