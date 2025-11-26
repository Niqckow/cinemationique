import LogoutButton from './components/Auth/LogoutButton'
import GuestTextDisplay from './components/guestTextDisplay';
import { useAuthContext } from './hooks/useAuthContext'

const Home =() => {
    const {user} = useAuthContext()

    return (
        <div>
            {user.role ==="guest" && <GuestTextDisplay/>}
            <p>Ce site est en construction.</p>
            <LogoutButton/>
        </div>
    )
}

export default Home;