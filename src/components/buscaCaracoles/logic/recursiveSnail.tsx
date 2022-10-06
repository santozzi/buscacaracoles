import { Casilla, Counter, Point, Visited } from '../interfaces/interfaces';
import { LogicaContext } from './logicaContext';
const logicaContext: LogicaContext = LogicaContext.StartContext();
let visited: Counter;
let visitedNumber: Counter;
//verifica si la coordenada x,y es un cararcol
const isCaracol = (x: number, y: number, matriz: Casilla[][]): boolean => {
    return matriz[y][x].snail;
}

//verifica si el caracol fue visitado
const isVisited = (point: Point): boolean => {
    return visited.visited.some((square: Visited) => {
        return square.point.x === point.x && square.point.y === point.y && square.visited;
    })
}
//modifica a true la visita al caracol
const visit = (point: Point) => {
    //square es la casilla actual
    const square = visited.visited.find(casilla => casilla.point.x === point.x && casilla.point.y === point.y);
    //verifico que la casilla exista
    if (square === undefined) {
        throw { toString() { return "Error de coordenadas"; } };
    }
    square.visited = true;
    logicaContext.decrementSnail();

}

//verifica si el caracol fue visitado
const isVisitedNumber = (point: Point): boolean => {
    return visitedNumber.visited.some((square: Visited) => {
        return square.point.x === point.x && square.point.y === point.y && square.visited;
    })
}
//modifica a true la visita al caracol
const visitNumber = (point: Point) => {
    //square es la casilla actual
    const square = visitedNumber.visited.find(casilla => casilla.point.x === point.x && casilla.point.y === point.y);
    //verifico que la casilla exista
    if (square === undefined) {
        throw { toString() { return "Error de coordenadas"; } };
    }
    square.visited = true;
    visitedNumber.count = visitedNumber.count + 1;
    logicaContext.decrementNumber();
}

let cantidadCaracoles: number = 1;
//funcion de reconocimiento recursivo.
export const RecursiveSnail = (x: number, y: number, backTrack: Counter, setBackTrack: React.Dispatch<React.SetStateAction<Counter>>, matrizCopy: Casilla[][], matriz: Casilla[][], startSnail: number, backTrackNumber: Counter, setBackTrackNumber: React.Dispatch<React.SetStateAction<Counter>>) => {
    cantidadCaracoles = startSnail;
    //para que no vuelva a visitar los mismos caracoles
    visited = { ...backTrack };
    visitedNumber = { ...backTrackNumber };
    recuCaracol(x, y, matriz, matrizCopy);
    setBackTrack(visited);
    setBackTrackNumber(visitedNumber);

}

const recuCaracol = (x: number, y: number, matriz: Casilla[][], matrizCopy: Casilla[][]) => {
    //verifica que la coordenada x,y no se salga del tablero
    if ((x >= 0 && matriz[0].length > x) && (y >= 0 && matriz.length > y)) {
        //matrizCopy es la matriz que luego sera estado del tablero
        //matriz es la matriz donde esta todo la información del juego, donde estan las arañas, los números y los caracoles.
        matrizCopy[y][x].void = false;

        if (isCaracol(x, y, matriz)) {
            matrizCopy[y][x].snail = true;

            //verifico si fue visiada         
            if (!isVisited({ x, y })) {
                visited.count = visited.count + 1;
                //cantSnail(cantidadCaracoles++);

                //visito
                visit({ x, y });
                //arriba
                recuCaracol(x, y - 1, matriz, matrizCopy);
                //derecha-arriba
                recuCaracol(x + 1, y - 1, matriz, matrizCopy);
                //derecha
                recuCaracol(x + 1, y, matriz, matrizCopy);
                //derecha-abajo
                recuCaracol(x + 1, y + 1, matriz, matrizCopy);
                //abajo
                recuCaracol(x, y + 1, matriz, matrizCopy);
                //izquierda-abajo
                recuCaracol(x - 1, y + 1, matriz, matrizCopy);
                //izquierda
                recuCaracol(x - 1, y, matriz, matrizCopy);
                //izquierda-arriba
                recuCaracol(x - 1, y - 1, matriz, matrizCopy);
            }

        } else {
            matrizCopy[y][x].numberAround = matriz[y][x].numberAround;
            if (!isVisitedNumber({ x, y })) {
                visitNumber({ x, y });
            }



        }
    }
}