import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import Routing from './routes/Routing.jsx';
import Navbar from './category/Navbar.jsx';

function App() {

    return (
        <>
            <Navbar/>
            <Routing/>    
        </>
    )
}

export default App
