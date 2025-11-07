import { useAuthContext } from "../../hooks/useAuthContext"

const LogoutButton: React.FC = () => {
    const {logout} = useAuthContext()
    
    const handleClick = () => {
        console.log("logout button clicked")
        logout();
    }

    return <button onClick={handleClick} >Se deconnecter</button>
}

export default LogoutButton