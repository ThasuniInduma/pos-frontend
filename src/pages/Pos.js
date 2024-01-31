import { useEffect, useState } from 'react';
import './Pos.scss';
import axios from 'axios';

const Pos = () => {

    const [items, setItems] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] =useState(0);
    const [orders, setOrders] = useState([]);
    
    const getItems = async () => {
        const response = await axios.get('http://localhost:8080/items');
        setItems(response.data);
    }

    const createOrder = async () => {
        const itemIds = orderItems.map(obj => obj.id);
        const data = {
            items: itemIds
        };
    
        try {
            const response = await axios.post("http://localhost:8080/orders", data);
    
            if (response.status === 201) {
                setOrderItems([]);
                setTotal(0);
                setTax(0);
                // Optionally, fetch the updated list of orders
                fetchOrders();
            } else {
                // Show error message
                console.error('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error creating order:', error);
            // Show error message
        }
    };
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };


    useEffect(() => {
        getItems();
        fetchOrders();
    }, []);

    useEffect(() => {
        setTax( (total/100) * 15 );
    },[total]);

     const isValidDate = (dateString) => {
    const dateObject = new Date(dateString);
    return !isNaN(dateObject.getTime());
};
    

   /*const getItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/items', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            // Handle the error
        }
    }

    /*const createOrder = async () => {
        try{
            const token = localStorage.getItem('token');
            const userId = /* Extract userId from the token or wherever you store it ;
            const productIds = orderProducts.map((obj) => obj.id);
            const data = {
              userId,
              products: productIds,
            };  
            const response = await axios.post('http://localhost:8080/orders', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setOrderProduct([]);
        setTotal(0);
        setTax(0);
        // Optionally, you can fetch the updated list of orders and display them
        // or update the state with the created order.
        // Example:
        // fetchOrders();
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  
        /*const itemIds = orderItems.map(obj => obj.id);
        const data = {
            items: itemIds
        }

        const response = await axios.post('http://localhost:8080/items', data)
        if(response.status == 201){
            setOrderItems([]);
            setTotal([0]);
            setTax([0]);
        }else{
            //show error message
        }*/
    //}

   /* const createOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const itemIds = orderItems.map(obj => obj.id);
            const data = {
                items: itemIds
            };
    
            const response = await axios.post('http://localhost:8080/orders', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 201) {
                const newOrder = response.data;
    
                // Format the date using the Date object
                const formattedDate = new Date(newOrder.date).toLocaleString();
    
                // Update orders with the formatted date
                setOrders([...orders, { ...newOrder, date: formattedDate }]);
    
                setOrderItems([]);
                setTotal(0);
                setTax(0);
            } else {
                console.error('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };*/
    /*const getItems = async () => {
        const response = await axios.get('http://localhost:8080/items');
        setItems(response.data);
    }
    const createOrder = async () => {
        const itemIds = orderItems.map(obj => obj.id);
        const data = {
            items: itemIds
        };
    
        try {
            const response = await axios.post('http://localhost:8080/orders', data);
    
            if (response.status === 201) {
                const newOrder = response.data;
                setOrders([...orders, newOrder]);
    
                setOrderItems([]);
                setTotal(0);
                setTax(0);
            } else {
                console.error('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
    
        fetchOrders();
    }, []);

    useEffect(() => {
        getItems();
    }, []);

    useEffect(() => {
        setTax((prevTotal) => prevTotal / 100 * 15);
    }, [total]);*/

    return (
        <>
            <div className="container-fluid">
                <h1>Point Of Sale</h1>
                <div className="row">
                    <div className="col-md-6">
                        <h2>Products</h2>
                        <div className="card5">
                            <table className="table5">
                                <thead>
                                    <tr>
                                        <th className="hd">Items</th>
                                        <th className="hd"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items && items.map(item => (
                                    <tr>
                                        <td className="d2">{item.name} - {item.price}</td>
                                        <td className="d2"><button className="btn btn-sm btn-primary" onClick={() => {
                                            setOrderItems([...orderItems,item])
                                            let currentTotal = total;
                                            currentTotal = currentTotal + item.price;
                                            setTotal(currentTotal);

                                        }}>Add to Order</button></td>
                                    </tr>))}
                                </tbody>
                            </table>
                        </div>
                        
                    </div>

                    <div className="col-md-6">
                        <h2 className="ordername">Order</h2>
                        <table className="table table-stripped">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems && orderItems.map(item => (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))}
                                
                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan={2}>
                                        Total
                                    </th>
                                    <th>
                                        {total}
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan={2}>
                                        Tax
                                    </th>
                                    <th>
                                        {tax}
                                    </th>
                                </tr>
                            </thead>
                        
                        <button className="btn btn-secondary" onClick={createOrder}>Complete Order</button>
                    </table>
                    <div className='sss'>
                    <table className="table">
                            <thead>
                                <tr>
                                    <th className="o">Id</th>
                                    <th className="o">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td className="g">{order.id}</td>
                                    <td className="g">{isValidDate(order.date)
                                                ? new Date(order.date).toLocaleString()
                                                : 'Invalid Date'}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table></div>
                    </div>
                </div>
                
            </div>
        </>
    )

}

export default Pos;