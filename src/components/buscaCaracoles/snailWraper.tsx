import React from 'react'
import { BuscaCaracolesContainer } from './buscaCaracolesContainer'
import { SnailContextProvider } from './context/snailContext'

export const SnailWraper = () => {
    return (
        <>
            <SnailContextProvider>
                <BuscaCaracolesContainer />
            </SnailContextProvider>
        </>
    )
}
