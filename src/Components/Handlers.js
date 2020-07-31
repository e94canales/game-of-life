import { presetOne, presetTwo, presetThree } from './Presets';

export const makeDeepCopy = (array) => {
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

export const onCellClick = (e, cell, grid, setGrid) => {
    e.preventDefault();
    let newGrid = makeDeepCopy(grid);
    newGrid[cell.positionX][cell.positionY] = {
        ...newGrid[cell.positionX][cell.positionY],
        active: !grid[cell.positionX][cell.positionY].active,
    };
    setGrid(newGrid);
    console.log(cell);
};

export const gridBg = (e, gridStyle, setGridStyle) => {
    const value = e.target.value;

    setGridStyle({
        ...gridStyle,
        backgroundColor: `${value}`,
    });
};

export const cellStyleHandler = (e, cellStyle, setCellStyle, gridStyle, setGridStyle, size) => {
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
    if (name === "incrementSize") {
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

    if (name === "decrementSize") {
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

export const resetGrid = (e, initialGrid, setGrid, setCount) => {
    e.preventDefault()

    setGrid(initialGrid)
    setCount(0)
}

export const speedHandler = (e, speed, setSpeed) => {
    e.preventDefault()

    const name = e.target.name

    if (name === "speedUp") {
        setSpeed(speed - 100)
    }
    if (name === "speedDown") {
        setSpeed(speed + 100)
    }
}

export const presetHandler = (e, setGrid) => {
    const value = e.target.value

    switch (value) {
        case "presetOne":
            setGrid(presetOne())
            break;

        case "presetTwo":
            setGrid(presetTwo())
            break;

        case "presetThree":
            setGrid(presetThree())
            break;

        default:
            break;
    }

}

