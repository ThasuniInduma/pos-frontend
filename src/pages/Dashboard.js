import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.scss';

const Dashboard = () => {
    const navigate = useNavigate();

    const cardStyle = {
        backgroundColor: '#52056d', 
        color: 'white', 
    };

   const gotoItem = () => {
        navigate('/items');
   }

   const gotoCategory = () => {
    navigate('/categories');
    }

    const gotoPos = () => {
        navigate("/orders");
   }
    
    return (
        <>
            
            <div className="Dashboard-container">
                <h1 className="Dashboard">Dashboard</h1>
                <div className="card-container">
                    <div className="card" style={cardStyle} onClick={gotoItem}>
                    
                        <h2 className="h1">Item</h2>
                        <p>Item</p>
                        
                    
                    </div>
                    <div className="card" style={cardStyle} onClick={gotoCategory}>
                    
                        <h2 className="h1" >Category</h2>
                        <p>Category</p>
                        
                    
                    </div>

                    <div className="card" style={cardStyle} onClick={gotoPos}>
                    
                        <h2 className="h1">Point Of Sale</h2>
                        <p>Point Of Sale</p>
                        
                    
                    </div>
            
                </div>
            </div> 
        </>
    )

}

export default Dashboard;