import './App.css'
import Cine from '.'

import { AuthProvider} from './context/AuthContext'


function App() {

  return (
    <>
      <AuthProvider>
        <Cine></Cine>
      </AuthProvider>
    </>
  )
}

export default App
