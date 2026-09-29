import { useContext } from 'react'
import { DataContext } from '../components/CompA'

function UseData() {
    const context = useContext(DataContext)
    if (!context)
        throw Error("useData must be used within an DataContextProvider")

    return context
}

export default UseData
