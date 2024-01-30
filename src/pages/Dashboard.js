import './Dashboard.scss';

const Dashboard = () => {

    return (
        <>
            <div className="Dashboard-container">
                <h1 className="Dashboard">Dashboard</h1>
                <div className="card-container">
                    <div className="card1">
                    <div className="card">
                        <h2 className="h1">Item</h2>
                        <p>Item</p>
                    </div>
                    </div>
                    <div className="card2">
                    <div className="card">
                        <h2 className="h2">Category</h2>
                        <p>Category</p>
                    </div>
                    </div>

                    <div className="card3">
                    <div className="card">
                        <h2 className="h3">Point Of Sale</h2>
                        <p>Point Of Sale</p>
                    </div>
                    </div>
                </div>
            </div> 
        </>
    )

}

export default Dashboard;