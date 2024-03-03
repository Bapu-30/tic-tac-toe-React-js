// Log.jsx
const Log = ({ data }) => {
    return (

        <ol id="log">
            { data.map((turn, index) => (
                <li key={ index }>
                    { turn.player } selected { turn.square.row },{ turn.square.col }
                </li>
            )) }
        </ol>

    );
};

export default Log;
