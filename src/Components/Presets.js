import Cell from './Cell'

const initGrid = () => {
    let nGrid = Array.from(Array(60), () => new Array(120).fill(new Cell()));

    for (let i = 0; i < 60; i++) {
        for (let j = 0; j < 120; j++) {
            nGrid[i][j] = new Cell(false, i, j);
        }
    }

    return nGrid
}

export const presetOne = () => {
    let actives = [
        [20, 54],
        [20, 56],
        [21, 54],
        [21, 56],
        [22, 55],
        [23, 55],
        [24, 55]
    ]

    let nGrid = initGrid()

    actives.forEach(([x, y]) => {
        nGrid[x][y].active = true
    })

    return nGrid
}

export const presetTwo = () => {
    let actives = [
        [17, 4],
        [17, 5],
        [18, 6],
        [18, 7],
        [19, 6],
        [19, 7],
        [20, 4],
        [20, 5],
    ]

    let nGrid = initGrid()
    let count = 0

    const build = (actives) => {
            actives.forEach(([x, y]) => {
                nGrid[x][y].active = true
            })
            count++

            if (count !== 21){
                actives.forEach( e => {
                    e[1] = e[1] + 5
                })
                build(actives)
            }
    }

    build(actives)
    return nGrid
}

export const presetThree = () => {
    let actives = [
        [26, 25],
        [26, 26],
        [26, 27],
        [26, 28],
        [27, 27],
        [27, 28],
        [27, 25],
        [27, 26],
    ]

    let nGrid = initGrid()
    let count = 0

    const build = (actives) => {
            actives.forEach(([x, y]) => {
                nGrid[x][y].active = true
            })
            count++

            if (count !== 21){
                actives.forEach( e => {
                    e[1] += 3
                })
                build(actives)
            }
    }

    build(actives)
    return nGrid
}
