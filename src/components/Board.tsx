
interface Props {
    children: string;
    placed: string;
    word: string;
}

// Create a list of letters with the appropriate classes
function classGen(placedWord: string, word: string) {
    const classList = new Array(placedWord.length).fill('false');
    let tempWord = word;

    // Check all correct letters
    for(let i = 0; i < tempWord.length; i++)
        if (placedWord[i] === tempWord[i]) {
            classList[i] = 'correct';
            tempWord = `${tempWord.substring(0, i)} ${tempWord.substring(i + 1)}`;
        }

    // Check all close letters
    for(let i = 0; i < placedWord.length; i++) {
        if (tempWord.includes(placedWord[i])) {
            tempWord.includes('msg')
            classList[i] = 'close';
            for(let j = 0; j < tempWord.length; j++)
                if (tempWord[j] === placedWord[i]) {
                    tempWord = `${tempWord.substring(0, j)} ${tempWord.substring(j + 1)}`;
                    break;
                }
        }
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
        classGen(placedWord, word)
    );

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