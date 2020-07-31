import React from "react";
import Cell from "./Cell";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight, faEraser, faPauseCircle, faUndoAlt, faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import './Styles/Controls.scss'
import {
  resetGrid,
  speedHandler,
  cellStyleHandler,
  gridBg,
  presetHandler,
} from "./Handlers";

// The bottom section or CONTROLS of the game
const Controls = (props) => {
    const {
        running, setRunning, 
        grid, setGrid, 
        prevGrid, 
        initialGrid, setInitialGrid, 
        count, setCount, 
        runningRef, 
        run, 
        size, 
        speed, setSpeed, 
        cellStyle, setCellStyle, 
        gridStyle, setGridStyle
    } = props

    const startButtonOn = {
      filter: "drop-shadow(0 0 10px rgba(253, 253, 175, 0.692)"
    }
    const startButtonOff = {
      filter: "grayscale(100%)"
    }

  return (
    <div className="controls">
      <div className="startContainer"
        disabled={running}
        onClick={() => {
          if (count === 0) {
            setInitialGrid(grid);
          }
          setRunning(true);
          runningRef.current = true;
          run(grid, count);
        }}
      >
        <img className="start" src="/onButton.png" style={running ?  startButtonOn : startButtonOff} alt="start-button"/>
      </div>

      <button className="clear"
        onClick={() => {
          if (!running) {
            let nGrid = Array.from(Array(size.rows), () =>
              new Array(size.columns).fill(new Cell())
            );

            for (let i = 0; i < size.rows; i++) {
              for (let j = 0; j < size.columns; j++) {
                nGrid[i][j] = new Cell(false, i, j);
              }
            }
            setGrid(nGrid);
            setCount(0);
          }
          setRunning(false);
          runningRef.current = false;
        }}
      >
        {running ? <FontAwesomeIcon icon={faPauseCircle} /> : <FontAwesomeIcon icon={faEraser} />}
      </button>

      <button className="prev"
        disabled={running}
        onClick={() => {
          if (grid === prevGrid) {
            alert("You can only go back once!");
          } else {
            setGrid(prevGrid);
            setCount(count - 1);
          }
        }}
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </button>

      <div className="count"><div>{count}</div></div>
      
      <button className="next"
        disabled={running}
        onClick={() => {
          setRunning(true);
          runningRef.current = true;
          run(grid, count, true);
        }}
      >
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </button>

      

      <button className="reset"
        disabled={running}
        onClick={(e) => resetGrid(e, initialGrid, setGrid, setCount)}
      >
        <FontAwesomeIcon icon={faUndoAlt} />
      </button>

      <button className="down"
        disabled={running}
        onClick={(e) => speedHandler(e, speed, setSpeed)}
        name="speedDown"
      >
        <FontAwesomeIcon icon={faAngleDoubleDown} />
      </button>

      <button className="up"
        disabled={running}
        onClick={(e) => speedHandler(e, speed, setSpeed)}
        name="speedUp"
      >
        <FontAwesomeIcon icon={faAngleDoubleUp} />
      </button>

      <div className="cellStyleContainer">
        <div>
          <input
            disabled={running}
            onChange={(e) => gridBg(e, gridStyle, setGridStyle)}
            type="color"
            name="grid"
          />
          <div className="colorText">Grid Background</div>
        </div>

        <div>
          <input
            onChange={(e) =>
              cellStyleHandler(
                e,
                cellStyle,
                setCellStyle,
                gridStyle,
                setGridStyle,
                size
              )
            }
            disabled={running}
            type="color"
            name="cellactive"
            value={cellStyle.color}
          />
          <div className="colorText">Cell Color</div>
        </div>

        <div>
          <input
            onChange={(e) =>
              cellStyleHandler(
                e,
                cellStyle,
                setCellStyle,
                gridStyle,
                setGridStyle,
                size
              )
            }
            disabled={running}
            type="color"
            name="gridlines"
            value={cellStyle.bordercolor}
          /> 

          <div className="colorText">Gridline Color</div>
        </div>

      </div>

      <div className="sizeContainer">
          Cell Size:
          <input className="size" type="text" value={cellStyle.width} readOnly disabled={true} />

          <button className="sizeBtn"
            disabled={running}
            onClick={(e) =>
              cellStyleHandler(
                e,
                cellStyle,
                setCellStyle,
                gridStyle,
                setGridStyle,
                size
              )
            }
            name="incrementSize"
          >
            +
          </button>
          
          <button className="sizeBtn"
            disabled={running}
            onClick={(e) =>
              cellStyleHandler(
                e,
                cellStyle,
                setCellStyle,
                gridStyle,
                setGridStyle,
                size
              )
            }
            name="decrementSize"
          >
            -
          </button>
        </div>


      <div className="dropDown">
        <select 
          disabled={running}
          defaultValue={"default"}
          onChange={(e) => presetHandler(e, setGrid)}
        >
          <option value="default" disabled hidden>
            Presets
          </option>
          <option value="presetOne">Preset 1</option>
          <option value="presetTwo">Preset 2</option>
          <option value="presetThree">Preset 3</option>
        </select>
      </div>

    </div>
  );
};

export default Controls;
