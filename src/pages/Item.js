import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Item.scss';

const Item = () => {

    const[items, setItems] = useState(null);
    const[categories, setCategories] =useState(null);
    const[name, setName] = useState(null);
    const[price, setPrice] = useState(null);
    const[qty, setQty] = useState(0);
    const[categoryId, setCategoryId] = useState(null);
    const[editItem, setEditItem] = useState(null);
    
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:8080/items', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setItems(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Handle unauthorized access
                    console.error('Unauthorized access');
                } else {
                    // Handle other errors
                    console.error('Error fetching categories:', error);
                }
            }
        };
    
        fetchItems();
    }, [token]);

    

    const getItems = async () => {

        try {
            const response = await axios.get("http://localhost:8081/items");
            setItems(response.data);
        } catch (error) {
            if(error.response.status === 401) {
                navigate("/login");
            }
        }
        
    }

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8081/categories");
            setCategories(response.data);
        }catch (error) {
            if(error.response.status === 401) {
                navigate("/login");
            }
        }
        
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleQty = (event) =>{
        setQty(event.target.value);
    }

    const handleCategory = (event) => {
        setCategoryId(event.target.value);
    }


    const handleSubmit = async (event) => {
        event.preventDefalt();
        const data = {
            "name": name,
            "price": price,
            "qty": qty,
            "categoryId": categoryId
        }

        fetch("http://localhost:8080/items", {
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setItems([...items, data]);
            setName(null);
            setPrice(null);
            setQty(null);
            setCategoryId(null);
            console.log(items)
        }).catch((error) => {
            console.log(error);
        })

    }
    
    return (
            <div className="item-container">
                <div className="form-container">
                    <h1>Item</h1>
                    <form className="form-item" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control" placeholder="Description" required onChange={handleName} value={name} />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Unit Price</label>
                            <input type="text" className="form-control" placeholder="Unit Price" required onChange={handlePrice} value={price} />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Qty On Hand</label>
                            <input type="number" className="form-control" placeholder="Qty On Hand" required onChange={handleQty} value={qty} />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Category</label>
                            <select required onChange={handleCategory}>
                                <option className="form-op1">Plese Select</option>

                                {categories && categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                                ))}

                            </select>
                        </div>
                        
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </form>
                </div>
                <div className="card2">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="th1">Id</th>
                                <th className="th2">Description</th>
                                <th className="th3">Qty</th>
                                <th className="th4">Unit Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items && items.map((item) =>(
                            <tr key={item.id}>
                                <Link to={`/items/${item.id}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.qty}</td></Link>
                            </tr>
                            ))} 
                        </tbody>
                    </table>
                </div>
            </div>
        )    

}

export default Item;