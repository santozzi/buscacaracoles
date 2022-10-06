import { Point, Casilla, Counter } from '../interfaces/interfaces';
import { LogicaContext } from './logicaContext';

export const MatrixGenerator = (
    cantSquare: Point,
    matrixPoint: Casilla[][],
    matrixCasilla: Casilla[][],
    mapeoBackTrack: Counter,
    backTrackNumber: Counter,
    spiders: Point[]

) => {
    const logicaContext: LogicaContext = LogicaContext.StartContext();

    for (let i: number = 0; i <= cantSquare.y - 1; i++) {

        matrixPoint[i] = [];
        matrixCasilla[i] = [];
        for (let j: number = 0; j <= cantSquare.x - 1; j++) {
            //este tiene la informacion
            matrixCasilla[i][j] = {
                spider: false,
                flag: false,
                numberAround: 0,
                point: { x: j, y: i },
                void: false,
                snail: true
            }
            matrixPoint[i][j] = {
                spider: false,
                flag: false,
                numberAround: 0,
                point: { x: j, y: i },
                void: true,
                snail: false
            }
            mapeoBackTrack.visited.push({ point: { x: j, y: i }, visited: false });


        }
    }
    spiders.forEach((spider: Point) => {

        //este tiene las respuestas, falta agregarle los numeros y los caracoles
        matrixCasilla[spider.y][spider.x].spider = true;
        matrixCasilla[spider.y][spider.x].snail = false;
        matrixCasilla[spider.y][spider.x].numberAround = 0;
        logicaContext?.incrementSpider();
        let x = spider.x;
        let y = spider.y;
        let spdr = false;

        //vertical horizontal
        if (x >= 0 && matrixCasilla[0].length - 1 > x) {
            //si estoy en el primer casillero si el sigiente-derecha no es spider suma uno a numberAround
            spdr = matrixCasilla[spider.y][x + 1].spider;
            if (!spdr) {
                matrixCasilla[spider.y][x + 1].numberAround = matrixCasilla[spider.y][x + 1].numberAround + 1;
            }
        }

        if (x !== 0) {
            spdr = matrixCasilla[spider.y][x - 1].spider;
            if (!spdr) {
                matrixCasilla[spider.y][x - 1].numberAround = matrixCasilla[spider.y][x - 1].numberAround + 1;
            }
        }

        if (y >= 0 && matrixCasilla.length - 1 > y) {
            //si estoy en el primer casillero si el sigiente abajo no es spider suma uno a numberAround
            spdr = matrixCasilla[y + 1][x].spider;
            if (!spdr) {
                matrixCasilla[y + 1][x].numberAround = matrixCasilla[y + 1][x].numberAround + 1;
            }

        }

        if (y !== 0 && matrixCasilla.length > 0) {
            //si estoy en el primer casillero si el sigiente abajo no es spider suma uno a numberAround
            spdr = matrixCasilla[y - 1][x].spider;
            if (!spdr) {
                matrixCasilla[y - 1][x].numberAround = matrixCasilla[y - 1][x].numberAround + 1;
            }

        }



        //diagonales
        //derecha-abajo
        if ((x >= 0 && matrixCasilla[0].length - 1 > x) && (y >= 0 && matrixCasilla.length - 1 > y)) {
            //si estoy en el primer casillero si el sigiente-derecha no es spider suma uno a numberAround
            spdr = matrixCasilla[y + 1][x + 1].spider;
            if (!spdr) {
                matrixCasilla[y + 1][x + 1].numberAround = matrixCasilla[y + 1][x + 1].numberAround + 1;
            }
        }
        //izquierda-arriba
        if (x !== 0 && y !== 0) {
            spdr = matrixCasilla[y - 1][x - 1].spider;
            if (!spdr) {
                matrixCasilla[y - 1][x - 1].numberAround = matrixCasilla[y - 1][x - 1].numberAround + 1;
            }
        }


        //izquierda-abajo
        if (x !== 0 && (y >= 0 && matrixCasilla.length - 1 > y)) {
            //si estoy en el primer casillero si el sigiente abajo no es spider suma uno a numberAround
            spdr = matrixCasilla[y + 1][x - 1].spider;


            if (!spdr) {
                matrixCasilla[y + 1][x - 1].numberAround = matrixCasilla[y + 1][x - 1].numberAround + 1;
            }

        }


        //derecha-arriba
        if ((y !== 0 && matrixCasilla.length > y) && (matrixCasilla[0].length - 1 > x)) {
            //si estoy en el primer casillero si el sigiente abajo no es spider suma uno a numberAround
            spdr = matrixCasilla[y - 1][x + 1].spider;
            if (!spdr) {
                matrixCasilla[y - 1][x + 1].numberAround = matrixCasilla[y - 1][x + 1].numberAround + 1;
            }

        }



    }




    );
    for (let i: number = 0; i <= cantSquare.y - 1; i++) {
        for (let j: number = 0; j <= cantSquare.x - 1; j++) {
            //este tiene la informacion
            if (matrixCasilla[i][j].numberAround > 0) {
                logicaContext?.incrementNumber();
                matrixCasilla[i][j].snail = false;
                backTrackNumber.visited.push({ point: { x: j, y: i }, visited: false });

            }
            if (matrixCasilla[i][j].snail) {

                logicaContext?.incrementSnail();
            }


        }
    }


}