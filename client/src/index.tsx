import AuthForm from './components/Auth/AuthForm'
import LogoutButton from './components/Auth/LogoutButton'
import { useAuthContext } from './hooks/useAuthContext'

const Cine: React.FC = () => {
    const {isAuth} = useAuthContext()
    return <>
        {isAuth && <p>Ce site est en construction.</p>}
        {isAuth && <LogoutButton/>}
        {!isAuth && <AuthForm/>}
    </>
}

export default Cine