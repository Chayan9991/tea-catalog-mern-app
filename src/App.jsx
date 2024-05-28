import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import Routing from './routes/Routing.jsx';
import Navbar from './category/Navbar.jsx';
import Footer from './category/Footer.jsx';

function App() {

    return (
        <>
            <Navbar/>
            <Routing/> 
            <Footer/> 
            <a onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn btn-lg bg-secondary btn-lg-square rounded-circle back-to-top"><i class="bi bi-arrow-up"></i></a>   
        </>
    )
}

export default App
