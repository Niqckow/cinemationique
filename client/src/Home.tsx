import LogoutButton from './components/Auth/LogoutButton'
import GuestTextDisplay from './components/guestTextDisplay';
import { useAuthContext } from './hooks/useAuthContext'
import AddMovieForm from './components/Movies/AddMovieForm';

const Home =() => {
    const {user} = useAuthContext()

    return (
        <div>
            {user.role ==="guest" && <GuestTextDisplay/>}
            <AddMovieForm/>
            <LogoutButton/>
        </div>
    )
}

export default Home;