import AuthForm from './components/Auth/AuthForm'
import Home from './Home'
import { useAuthContext } from './hooks/useAuthContext'

const Cine: React.FC = () => {
    const {isAuth} = useAuthContext()
    return <>
        {isAuth && <Home/>}
        {!isAuth && <AuthForm/>}
    </>
}

export default Cine