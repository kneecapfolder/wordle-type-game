
interface Props {
    children: string;
    placed: string;
    word: string;
}

function Board({ children, placed, word }: Props) {
    const placedArr = placed.match(/.{5}/g);

    return (
        <div id="board">
            {
                placedArr?.map(subArr =>
                    subArr.split('').map((ch, index) =>
                        <div key={index} className={
                            word[index] === ch ? 'key correct' :
                            word.includes(ch) ? 'key close' :
                            'key false'
                        }>
                            {ch}
                        </div>
                    )
                )
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