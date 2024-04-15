
interface Props {
    children: string;
    shutOff: () => void;
}

function GameAlert({ children, shutOff }: Props) {
    
    setTimeout(
        () => shutOff()
    , 1000);

    return (
        <div id="alert">
            {children}
        </div>
    );
}

export default GameAlert;