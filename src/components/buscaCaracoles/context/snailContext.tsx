import React, { createContext, useState } from 'react'
import { Casilla } from '../interfaces/interfaces';
import { LogicaContext } from '../logic/logicaContext';

interface ContextSnail {
    logicaContext: LogicaContext
}
interface props {
    children: JSX.Element | JSX.Element[]
}

export const SnailContext = createContext<LogicaContext>(LogicaContext.StartContext());

export const SnailContextProvider = ({ children }: props) => {
    const [backTrack, setBackTrack] = useState([])
    const [backTrackNumbre, setBackTrackNumbre] = useState([])
    const logicaContext: LogicaContext = LogicaContext.StartContext();
    // const totalCaracoles: number = logicaContext.getTotalCaracoles();




    return (
        <SnailContext.Provider value={
            logicaContext
        }>
            {children}
        </SnailContext.Provider>
    )
}
