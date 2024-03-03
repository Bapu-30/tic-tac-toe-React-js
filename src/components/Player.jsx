import { useState } from 'react'

const Player = ({ name, symbol, isActive }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    function handleEditClick() {
        setIsClicked((editing) => !editing)

    }

    function handleChange(e) {
        setPlayerName(() => e.target.value)
        // console.log(e);
    }
    return (
        <li className={ isActive ? 'active' : undefined }>
            <span className="player">
                { isClicked ? (<input type='text' required value={ playerName } onChange={ handleChange } />) :
                    (<span className="player-name">{ playerName }</span>)
                }
                <span className="player-symbol">{ symbol }</span>
            </span>
            <button onClick={ handleEditClick }>{ isClicked ? "Save" : "Edit" }</button>
        </li>
    )
}

export default Player