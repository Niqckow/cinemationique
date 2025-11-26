import LogoutButton from './components/Auth/LogoutButton'
import guestTextDisplay from './components/guestTextDisplay';
import { useAuthContext } from './hooks/useAuthContext'

const Home =() => {
    const {user} = useAuthContext()

    return (
        <div>
            {user.role ==="guest" && <guestTextDisplay/>}
            <p>Ce site est en construction.</p>
            <LogoutButton/>
        </div>
    )
}

export default Home;