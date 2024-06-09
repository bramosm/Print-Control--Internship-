import { useEffect, useState } from 'react'

// components
import UserDetails from '../components/UserDetails'

const UserCRUD = () => {
    const [users, setUsers] = useState(null)


    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users')
            const json = await response.json()

            if (response.ok){
                setUsers(json)
            }
        }

        fetchUsers()
    }, [])

    return(
        <div className="usercrud">
            <div className='users'>
                {users && users.map((user) => (
                    <UserDetails key={user._id} user = { user }/>
                ))}
            </div>
        </div>
    )
}

export default UserCRUD