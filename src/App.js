import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import Nav from "./Components/Nav";

function App() {
  const [size] = useState({ columns: 120, rows: 60 });
  const [grid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [speed, setSpeed] = useState(800)
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

  const makeDeepCopy = (array) => {
    let newArrayMain = [];
    array.forEach((array) => {
      newArrayMain.push(
        array.map((child) => {
          return child;
        })
      );
    });
    return newArrayMain;
  };

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

  const onCellClick = (e, cell) => {
    e.preventDefault();
    let newGrid = makeDeepCopy(grid);
    newGrid[cell.positionX][cell.positionY] = {
      ...newGrid[cell.positionX][cell.positionY],
      active: !grid[cell.positionX][cell.positionY].active,
    };
    setGrid(newGrid);
  };

  const runningRef = useRef(running);
  runningRef.current = running;

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

  const run = (currentGrid, prevCount, nudge = false) => {
    let inactiveNewGrid = makeDeepCopy(currentGrid);

    if (!runningRef.current) {
      return;
    }
    currentGrid.forEach((arrays, i) => {
      arrays.forEach((value, j) => {
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
      });
    });

    setPrevGrid(currentGrid)
    setGrid(inactiveNewGrid);
    setCount(prevCount + 1);

    if (nudge){
      setRunning(false)
      runningRef.current = false;
    }
    setTimeout(() => run(inactiveNewGrid, prevCount + 1), speed);
    
  };

  const gridBg = (e) => {
    const value = e.target.value;

    setGridStyle({
      ...gridStyle,
      backgroundColor: `${value}`,
    });
  };

  const cellStyleHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "cellactive") {
      setCellStyle({
        ...cellStyle,
        color: value,
      });
    }
    if (name === "gridlines") {
      setCellStyle({
        ...cellStyle,
        borderTop: `1px dotted ${value}`,
        borderLeft: `1px dotted ${value}`,
        bordercolor: `${value}`,
      });
    }
    if (name === "incrementSize"){
      setCellStyle({
        ...cellStyle,
        width: `${parseInt(cellStyle.width) + 1}px`,
        height: `${parseInt(cellStyle.height) + 1}px`,
      });
      setGridStyle({
        ...gridStyle,
        gridTemplateColumns: `repeat(${size.columns}, ${cellStyle.width})`,
      });
    }

    if (name === "decrementSize"){
      setCellStyle({
        ...cellStyle,
        width: `${parseInt(cellStyle.width) - 1}px`,
        height: `${parseInt(cellStyle.height) - 1}px`,
      });
      setGridStyle({
        ...gridStyle,
        gridTemplateColumns: `repeat(${size.columns}, ${cellStyle.width})`,
      });
    }
  }

  const resetGrid = e => {
    e.preventDefault()

    setGrid(initialGrid)
    setCount(0)
  }

  const speedHandler = e => {
    e.preventDefault()

    const name = e.target.name

    if (name === "speedUp"){
      setSpeed(speed - 100)
    }
    if (name === "speedDown"){
      setSpeed(speed + 100)
    }
  }

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
                    onCellClick(e, r);
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
      <button
        onClick={() => {
          setInitialGrid(grid)
          setRunning(true);
          runningRef.current = true;
          run(grid, count);
        }}
      >
        Start
      </button>

      <button onClick={() => {
        if (grid === prevGrid){
          alert("You can only go back once!")
        }
        else {
          setGrid(prevGrid)
          setCount(count - 1)
        }
      }}>Prev</button>
      <button onClick={() => {
        setRunning(true);
        runningRef.current = true;
        run(grid, count, true)
      }}>Next</button>

      <button
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
            setCount(0)
          }
          setRunning(false);
          runningRef.current = false;
        }}
      >
        {running ? "Pause" : "Clear"}
      </button>
      <button onClick={resetGrid}>Reset</button>
      <button onClick={speedHandler} name="speedDown">Speed Down</button>
      <button onClick={speedHandler} name="speedUp">Speed Up</button>

      <div className="count">{count}</div>
      <div className="cellStyleContainer">
        <div>
          Cell Size:
          <input
            type="text"
            value={cellStyle.width}
            readOnly
            disabled={true}
          ></input>
          <button onClick={cellStyleHandler} name="incrementSize">+</button>
          <button onClick={cellStyleHandler} name="decrementSize">-</button>
        </div>
        <input onChange={gridBg} type="color" name="grid" />
        <input
          onChange={cellStyleHandler}
          type="color"
          name="cellactive"
          value={cellStyle.color}
        />
        <input
          onChange={cellStyleHandler}
          type="color"
          name="gridlines"
          value={cellStyle.bordercolor}
        />
      </div>
    </div>
  );
}

export default App;

class Cell {
  constructor(active = false, positionX = 0, positionY = 0) {
    this.active = active;
    this.positionX = positionX;
    this.positionY = positionY;
  }
}
