import { useEffect, useState } from 'react';
import './Pos.scss';
import axios from 'axios';

const Pos = () => {

    const [products, setProducts] = useState(null);
    const [orderProducts, setOrderProduct] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] =useState(0);

    const getProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/items', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            // Handle the error
        }
    }

    const createOrder = async () => {
        const productIds = orderProducts.map(obj => obj.id);
        const data = {
            products: productIds
        }

        const response = await axios.post('http://localhost:8080/items', data)
        if(response.status == 201){
            setOrderProduct([]);
            setTotal([0]);
            setTax([0]);
        }else{
            
        }
    }

   

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        setTax((total/100*15));
    }, [total])

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
                                    {products && products.map(product => (
                                    <tr>
                                        <td className="d2">{product.name} - {product.price}</td>
                                        <td className="d2"><button className="btn btn-sm btn-primary" onClick={() => {
                                            setOrderProduct([...orderProducts,product])
                                            let currentTotal = total;
                                            currentTotal = currentTotal + product.price;
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
                                {orderProducts && orderProducts.map(product => (
                                    <tr>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
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
                    </div>
                </div>
                
            </div>
        </>
    )

}

export default Pos;