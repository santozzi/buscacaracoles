import React, { useContext, useEffect } from 'react'
import './buscaCaracoles.css';
import { Casilla, Point } from './interfaces/interfaces';
import spider from './images/spider.png';
import snail from './images/snail.png';
import flag from './images/flag.png';
import { Number } from './numbers/number';
import { SnailContext } from './context/snailContext';

interface Props {
    cantSquare: Point;
    matrizPoint: Casilla[][];
    banderin: any;
    isSpaider: any;
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>
}


export const BuscaCaracoles = (props: Props) => {

    const { cantSquare, matrizPoint, banderin, isSpaider, setLoaded } = props;
    const gridGarden = {
        display: 'grid',
        justifyContent: 'center',
        gridTemplateColumns: `repeat(${cantSquare.x},50px)`
    }

    const logicaContext = useContext(SnailContext);



    return (
        <div className='busca-caracoles-container'>
            <p className='busca-caracoles-title'>Busca caracoles</p>
            <div style={gridGarden} >
                {
                    matrizPoint.map(
                        (array: Array<Casilla>) =>
                        (array.map(
                            (casillero: Casilla, index) =>
                            (<button
                                className='busca-caracoles-casilla'
                                key={index}
                                onContextMenu={(e) => { banderin(casillero.point, e) }}
                                onClick={(e) => { isSpaider(casillero.point, e) }}
                            >
                                {
                                    !casillero.void ? (
                                        casillero.spider
                                            ? <img src={spider} alt='araña' style={{ width: '50px', height: '50px' }} />
                                            : casillero.snail
                                                ? <img src={snail} alt='caracol' style={{ width: '50px', height: '50px' }} />
                                                : <Number number={casillero.numberAround} />
                                    ) : casillero.flag &&
                                    <img src={flag} alt='banderin' style={{ width: '25px', height: '25px' }} />

                                }
                            </button>))
                        ))
                }

            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',

            }}>
                <button
                    onClick={() => { setLoaded(false) }}
                    className='busca-caracores-button-reset'>Reset</button>
            </div>
            <div>{`Caracoles: ${logicaContext?.getTotalCaracoles()}`}</div>
            <div>{`Números: ${logicaContext?.getTotalNumeros()}`}</div>
            <div>{`Arañas: ${logicaContext?.getTotalSpiders()}`}</div>

        </div>
    )
}
