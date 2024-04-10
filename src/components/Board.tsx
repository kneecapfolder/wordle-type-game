
interface Props {
    current: string;
}

function Board({ current }: Props) {
    return (
        <div id="board">
            {current.split('').map((elm, index) => (
                <div key={index} className="key">{elm}</div>
            ))}
        </div>
    );
}

export default Board;