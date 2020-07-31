import React, { useState } from 'react'
import './Styles/Nav.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'


const Nav = props => {
    const [active, setActive] = useState(false)

    return (
        <nav>
            <div className='content'>
                <h1>Game of Life</h1>
                <div className="links"><div className="link" onClick={() => setActive(true)}><FontAwesomeIcon icon={faQuestionCircle} /></div></div>
            </div>
            <div className="modal" style={{display: active ? "" : "none"}}>
                <div className="modalContents">
                    <div className="closeModal" onClick={() => setActive(false)}><FontAwesomeIcon icon={faTimesCircle} /></div>
                    <h3>How to Play</h3>
                    <div className="rules">
                        <p>- Any live cell with fewer than two live neighbours dies.</p>
                        <p>- Any live cell with two or three live neighbours lives.</p>
                        <p>- Any live cell with more than three live neighbours dies.</p>
                        <p>- Any dead cell with three live neighbours becomes a live cell.</p>
                    </div>
                    <div className="okay" onClick={() => setActive(false)}>Okay</div>
                </div>
            </div>
        </nav>
    )
}

export default Nav