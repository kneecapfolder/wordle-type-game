import './css/App.css'
import Board from './components/Board'
import { useEffect, useState } from 'react';
import GameAlert from './components/GameAlert';

// Check if word is valid
async function wordCheck(word: string) {
    const req = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return req.ok;
}

// Generate a random valid word
function wordGen() {
    const getWord: Promise<string> = new Promise(async (res) => {
        let word = '';

        while(!await wordCheck(word)) {
            fetch('https://random-word-api.herokuapp.com/word?length=5')
            .then(req => req.json())
            .then(data => {
                word = data[0].toLocaleUpperCase();
            })
        }
        res(word);
    });

    return getWord;
}

function App() {
    const [msg, setMsg] = useState('none');
    const [word, setWord] = useState('');
    const [placed, setPlaced] = useState('');
    const [current, setCurrent] = useState('');
    const [canType, setCanType] = useState(true);

    // Gen random word on start
    useEffect(() => {
        wordGen().then(data => {
            setWord(data);
        })
    }, []);

    async function start(message: string) {
        setCurrent('');
        setCanType(false);
        setMsg(message);
        await new Promise(res => setTimeout(res, 1000));
        setPlaced('');
        await wordGen().then(data => {
            setWord(data);
        })
        setCanType(true);
    }

    onkeydown = async (e) => {
        if (placed.length >= 30 || !canType) return;
        
        // Check if the key is a letter
        if (current.length < 5 && e.key.length === 1 && /^[a-zA-Z]+$/.test(e.key))
            setCurrent(current + e.key.toLocaleUpperCase());
        // Delete the last letter from the list
        else if (e.key === 'Backspace')
            setCurrent(current.slice(0, -1))
        else if (current.length === 5 && e.key === 'Enter') {
            // check if word exists
            if (await wordCheck(current)) {
                // restart
                if (current === word) start('success!');
                else if (placed.length+5 >= 30) start(word);
                setPlaced(placed+current);
                setCurrent('');
                
            }
            else {
                setMsg('invalid word')
            }
        }
    }

    return (
        <>
            <h1>wordle</h1>
            <Board word={word} placed={placed}>
                {current}
            </Board>
            {msg !== 'none' && <GameAlert shutOff={() => setMsg('none')}>{msg}</GameAlert>}
        </>
    );
}

export default App;
