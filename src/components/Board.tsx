
interface Props {
    children: string;
    placed: string;
    word: string;
}

// Create a list of letters with the appropriate classes
function placedWordGen(placedWord: string, word: string) {
    const classList = new Array(placedWord.length).fill('false');
    let tempWord = word;

    // Check all correct letters
    for(let i = 0; i < tempWord.length; i++)
        if (placedWord[i] === tempWord[i]) {
            classList[i] = 'correct';
            tempWord = `${tempWord.substring(0, i)} ${tempWord.substring(i + 1)}`;
        }

    console.log(tempWord);
        
    // Check all close letters
    for(let i = 0; i < tempWord.length; i++)
        if (tempWord.includes(placedWord[i]) && tempWord[i] != ' ') {
            classList[i] = 'close';
            tempWord = `${tempWord.substring(0, i)} ${tempWord.substring(i + 1)}`;
        }


    return placedWord.split('').map((ch, index) => 
        <div
            key={index}
            className={`key ${classList[index]}`}
        >{ch}</div>
    );
}

function Board({ children, placed, word }: Props) {
    const placedArr = placed.match(/.{5}/g);
    const placedKeys = placedArr?.map((placedWord) =>
        placedWordGen(placedWord, word)
    );
    console.log(word);

    return (
        <div id="board">
            {
                placedKeys
            }
            
            {
                children.split('').map((elm, index) => (
                    <div key={index} className="key">
                        {elm}
                    </div>
                ))
            }
            
            {
                Array.from({length:30-children.length-placed.length},
                    (x, index) => <div className="key" key={index} />
                )
            }
        </div>
    );
}

export default Board;