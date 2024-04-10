import './css/App.css'
import Board from './components/Board'
import { useState } from 'react';


function App() {
    const [current, setCurrent] = useState('');

    onkeydown = (e) => {

        // Check if the key is a letter
        if (current.length < 5 && e.key.length === 1 && /^[a-zA-Z]+$/.test(e.key))
            setCurrent(current + e.key.toLocaleUpperCase());
        // Delete the last letter from the list
        else if (e.key === 'Backspace')
            setCurrent(current.slice(0, -1))
        else if (current.length === 5 && e.key === 'Enter') {
            setCurrent('');
        }
    }

    return (
        <>
            <h1>wordle</h1>
            <Board current={current}></Board>
        </>
    );
}

export default App;
