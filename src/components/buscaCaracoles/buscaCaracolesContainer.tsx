import React, { useState, useEffect, useContext } from 'react'
import { Casilla, Counter, Point } from './interfaces/interfaces';
import { MatrixGenerator } from './logic/matrixGenerator';
import { RecursiveSnail } from './logic/recursiveSnail';
import { SpawnerSpiders } from './logic/spawnerSpiders';
import spider from './images/spider.png';
import snail from './images/snail.png';
import Swal from 'sweetalert2'

import { BuscaCaracoles } from './buscaCaracoles';
import { SnailContext } from './context/snailContext';
import { LogicaContext } from './logic/logicaContext';


export const BuscaCaracolesContainer = () => {
    const logicaContext: LogicaContext = useContext(SnailContext);

    const [cantSpider, setCantSpider] = useState<number>(10)


    const [startSnail, setStartSnail] = useState(0)
    const [cantSquare, setCantSquare] = useState<Point>({ x: 10, y: 10 })
    const [backTrack, setBackTrack] = useState<Counter>({ visited: [], count: 0 });
    const [backTrackNumber, setBackTrackNumber] = useState<Counter>({ visited: [], count: 0 });
    const [matrizPoint, setMatrizPoint] = useState<Casilla[][]>([]);
    const [matrizCasilla, setMatrizCasilla] = useState<Casilla[][]>([]);
    const [loaded, setLoaded] = useState(false);

    const banderin = (square: Point, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const matrizCopy = [...matrizPoint];
        matrizCopy[square.y][square.x].flag = !matrizCopy[square.y][square.x].flag;
        setMatrizPoint(matrizCopy);
    }

    const isSpaider = (square: Point, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let matrizCopy = [...matrizPoint];
        matrizCopy[square.y][square.x] = { ...matrizCasilla[square.y][square.x] };
        matrizCopy[square.y][square.x].void = false;

        if (matrizCopy[square.y][square.x].spider) {
            Swal.fire({
                title: 'Perdiste!!!',
                text: 'Te picaron!!, son los riesgos de cuidar el jardín, la próxima vez utiliza guantes!!!',
                imageUrl: spider,
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'perdiste!!',
            })
            matrizCopy = matrizCasilla;
        } else {

            //para que no vuelva a visitar los mismos caracoles
            const visited: Counter = { ...backTrack };

            RecursiveSnail(square.x, square.y, visited, setBackTrack, matrizCopy, matrizCasilla, startSnail, backTrackNumber, setBackTrackNumber);



            if (logicaContext.getTotalCaracoles() === 0 && logicaContext.getTotalNumeros() === 0) {
                Swal.fire({
                    title: 'Ganaste!!!',
                    text: 'Los caracoles salvados del jardín están en un sitio seguro, disfrutando en comunidad, ningún caracol fue maltratado o herido durante este juego. Congratulaciones!!!!!',
                    imageUrl: snail,
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: 'ganaste!!',
                })
                matrizCopy = matrizCasilla;
            }

        }
        setMatrizPoint(matrizCopy);

    }


    useEffect(() => {

        if (!loaded) {
            setStartSnail(0);
            logicaContext.reset();


            let mapeoBackTrack: Counter = { visited: [], count: 0 };
            let backTrackNumber: Counter = { visited: [], count: 0 };
            let spiders: Array<Point> = SpawnerSpiders(cantSpider, cantSquare.x - 1, cantSquare.y - 1);

            let matrixPoint: Casilla[][] = [];
            let matrixCasilla: Casilla[][] = [];
            MatrixGenerator(
                cantSquare,
                matrixPoint,
                matrixCasilla,
                mapeoBackTrack,
                backTrackNumber,
                spiders
            )

            setMatrizPoint(matrixPoint);
            setMatrizCasilla(matrixCasilla)
            setLoaded(true);
            setBackTrack(mapeoBackTrack);
            setBackTrackNumber(backTrackNumber);
        }
    }, [cantSpider, cantSquare, matrizPoint, loaded, backTrack, backTrackNumber])

    return (
        <div>

            <BuscaCaracoles
                cantSquare={cantSquare}
                matrizPoint={matrizPoint}
                banderin={banderin}
                isSpaider={isSpaider}
                setLoaded={setLoaded}

            />

        </div>
    )
}
