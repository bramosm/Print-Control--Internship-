import { useEffect, useState } from 'react'

// components
import PrintDetails from '../components/PrintDetails'

const Home = () => {
    const [prints, setPrints] = useState(null)


    useEffect(() => {
        const fetchPrints = async () => {
            const response = await fetch('/api/prints')
            const json = await response.json()

            if (response.ok){
                setPrints(json)
            }
        }

        fetchPrints()
    }, [])

    return(
        <div className="home" class='bg-gray-100'>
            <div className='prints'>
                {prints && prints.map((print) => (
                    <PrintDetails key={print._id} print = { print }/>
                ))}
            </div>
        </div>
    )
}

export default Home