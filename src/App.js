import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import Nav from "./Components/Nav";
import Cell from './Components/Cell'
import Controls from './Components/Controls'
import { makeDeepCopy, onCellClick, } from './Components/Handlers'

function App() {
  const [size] = useState({ columns: 120, rows: 60 });
  const [grid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [speed, setSpeed] = useState(100)
  const [initialGrid, setInitialGrid] = useState([])
  const [prevGrid, setPrevGrid] = useState([])

  let initGridStyle = {
    gridTemplateColumns: `repeat(${size.columns}, 15px)`,
    backgroundColor: "black",
  };

  let initCellStyle = {
    width: "15px",
    height: "15px",
    color: "#FFFFFF",
    borderTop: "1px dotted #4F785B",
    borderLeft: "1px dotted #4F785B",
    bordercolor: "#4F785B",
  };

  const [gridStyle, setGridStyle] = useState(initGridStyle);
  const [cellStyle, setCellStyle] = useState(initCellStyle);

  // Used to initialize a grid at startup
  useEffect(() => {
    let nGrid = Array.from(Array(size.rows), () =>
      new Array(size.columns).fill(new Cell())
    );

    for (let i = 0; i < size.rows; i++) {
      for (let j = 0; j < size.columns; j++) {
        nGrid[i][j] = new Cell(false, i, j);
      }
    }
    setGrid(nGrid);
  }, [size.columns, size.rows]);

  // Used to enable they shut down of the "run" function
  const runningRef = useRef(running);
  runningRef.current = running;

  // Used to calculate the coordiantes of a cells neighbors
  const neighbours = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];

  // Main function that runs the  game
  const run = (currentGrid, prevCount, nudge = false) => {
    let inactiveNewGrid = makeDeepCopy(currentGrid);

    // Base case
    if (!runningRef.current) {
      return;
    }

    // Reccursive Loop
    for (let i = 0; i < currentGrid.length; i++) {
      for (let j = 0; j < currentGrid[i].length; j++) {
        let neighborCount = 0;
        neighbours.forEach(([x, y]) => {
          let nextI = i + x;
          let nextJ = j + y;
          if (
            nextI >= 0 &&
            nextI < size.rows &&
            nextJ >= 0 &&
            nextJ < size.columns
          ) {
            if (currentGrid[nextI][nextJ].active) {
              neighborCount += 1;
            }
          }
        });
        if (neighborCount < 2 || neighborCount > 3) {
          inactiveNewGrid[i][j] = new Cell(false, i, j);
        }

        if (!currentGrid[i][j].active && neighborCount === 3) {
          inactiveNewGrid[i][j] = new Cell(true, i, j);
        }
      };
    };

    setPrevGrid(currentGrid)
    setGrid(inactiveNewGrid);
    setCount(prevCount + 1);

    if (nudge) {
      setRunning(false)
      runningRef.current = false;
    }
    setTimeout(() => run(inactiveNewGrid, prevCount + 1), speed);

  };

  return (
    <div className="App">
      <Nav />
      <div className="gridContainer">
        <div className="grid" style={gridStyle} draggable={true}>
          {grid.map((e, i) => {
            return e.map((r, j) => {
              return (
                <div
                  className="cell"
                  key={`${r.positionX}-${r.positionY}`}
                  id={`${r.positionX}-${r.positionY}`}
                  onClick={(e) => {
                    onCellClick(e, r, grid, setGrid);
                  }}
                  style={{
                    ...cellStyle,
                    backgroundColor: grid[i][j].active ? cellStyle.color : "",
                  }}
                ></div>
              );
            });
          })}
        </div>
      </div>

      <Controls 
        running={running} 
        setRunning={setRunning} 
        grid={grid} setGrid={setGrid} 
        prevGrid={prevGrid} 
        initialGrid={initialGrid} 
        setInitialGrid={setInitialGrid} 
        count={count}
        setCount={setCount}
        runningRef={runningRef} 
        run={run} 
        size={size}
        speed={speed}
        setSpeed={setSpeed}
        cellStyle={cellStyle}
        setCellStyle={setCellStyle}
        gridStyle={gridStyle}
        setGridStyle={setGridStyle}
      />
    </div>
  );
}

export default App;

