import { useNavigate } from 'react-router-dom';
import './Checkout.scss'

const Checkout = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const handleCardStyle = {
        backgroundColor: '#354b85', 
        color: 'white',
    };

    return (
        <>
        <h1 className="checkname">Checkout</h1>
        <div className="card-container5">
                    <div className="card" style={handleCardStyle}>
                        <h3 className="h3">Do you want to logout?</h3>
                        <button onClick={handleLogout} type="btn btn-secondary">LogOut</button>
                    </div>
        </div>
        </>
    )

} 

export default Checkout;