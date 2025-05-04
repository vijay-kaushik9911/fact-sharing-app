export default function RandomFact({ randomFact, onClose }) {
    return (
        <>
            <div className='fact-form' style={{ position: 'relative', padding: '1rem' }}>
                <h2 style={{ fontSize: '1.8rem' }}>{randomFact}</h2>
                <button 
                    className="fact-form-close-btn" 
                    onClick={onClose}
                    aria-label="Close random fact"
                    style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        fontSize: '2rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#333'
                    }}
                >
                    <span style={{fontSize: '2.6rem'}}>x</span>
                </button>
            </div>
        </>
    )
}
