import { useEffect, useState } from 'react'

// components
import PrinterDetails from '../components/PrinterDetails'

const PrinterCRUD = () => {
    const [printers, setPrinters] = useState(null)


    useEffect(() => {
        const fetchPrinters = async () => {
            const response = await fetch('/api/printers')
            const json = await response.json()

            if (response.ok){
                setPrinters(json)
            }
        }

        fetchPrinters()
    }, [])

    return(
        <div className="printercrud">
            <div className='printers'>
                {printers && printers.map((printer) => (
                    <PrinterDetails key={printer._id} printer = { printer }/>
                ))}
            </div>
        </div>
    )
}

export default PrinterCRUD