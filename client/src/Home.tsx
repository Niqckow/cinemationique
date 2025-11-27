import LogoutButton from './components/Auth/LogoutButton'
import GuestTextDisplay from './components/guestTextDisplay';
import { useAuthContext } from './hooks/useAuthContext'
import AddMovieForm from './components/Movies/AddMovieForm';
import WaitingBanner from './components/WaitingBanner';
import { useState } from 'react';

const Home =() => {
    const {user} = useAuthContext()
    const [isWaiting, setIsWaiting] = useState(true);

    return (
        <div>
            {user.role ==="guest" && <GuestTextDisplay/>}
            {!isWaiting && <AddMovieForm/>}
            {isWaiting && <WaitingBanner/>}
            <LogoutButton/>
        </div>
    )
}

export default Home;