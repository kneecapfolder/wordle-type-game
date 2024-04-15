import './css/App.css'
import Board from './components/Board'
import { useEffect, useState } from 'react';

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
    const [word, setWord] = useState('');
    const [placed, setPlaced] = useState('');
    const [current, setCurrent] = useState('');

    // Gen random word on start
    useEffect(() => {
        wordGen().then(data => {
            setWord(data);
        })
    }, []);

    onkeydown = async (e) => {
        // Check if the key is a letter
        if (current.length < 5 && e.key.length === 1 && /^[a-zA-Z]+$/.test(e.key))
            setCurrent(current + e.key.toLocaleUpperCase());
        // Delete the last letter from the list
        else if (e.key === 'Backspace')
            setCurrent(current.slice(0, -1))
        else if (current.length === 5 && e.key === 'Enter') {
            // check if word exists
            if (await wordCheck(current)) {    
                setPlaced(placed+current);
                setCurrent('');
            }
            else console.log('Not a valid word')
        }
    }

    return (
        <>
            <h1>wordle</h1>
            <Board word={word} placed={placed}>
                {current}
            </Board>
        </>
    );
}

export default App;
