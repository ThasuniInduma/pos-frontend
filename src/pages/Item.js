import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Item.scss';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Item = () => {

    const[items, setItems] = useState(null);
    const[categories, setCategories] =useState(null);
    const[name, setName] = useState(null);
    const[price, setPrice] = useState(null);
    const[qty, setQty] = useState(0);
    const[categoryId, setCategoryId] = useState(null);
    const[isEdit, setIsEdit] = useState(null);
    const[editItemId, setEditItemId] = useState(null);
    const[isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        getItems();
        getCategories();
    },[])

    const navigate = useNavigate();

    const getItems = async () => {

        try {
            const response = await axios.get("http://localhost:8080/items");
            setItems(response.data);
        } catch (error) {
            if(error.response.status === 401) {
                navigate("/login");
            }
        }
        
    }

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/categories");
            setCategories(response.data);
        }catch (error) {
            if(error.response.status === 401) {
                navigate("/login");
            }
        }
        
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

    const handleEdit = (itemId) => {
        const selectedItem = items.find(item => item.id == itemId);
        if(selectedItem){
            setIsEdit(true);
            setEditItemId(itemId);
            setName(selectedItem.name);
            setPrice(selectedItem.price);
            setQty(selectedItem.qty);
            setCategoryId(selectedItem.categoryId);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "name": name,
            "price": price,
            "qty": qty,
            "categoryId": categoryId
        }

        
        if(isEdit){
            try {
                await axios.put(`http://localhost:8080/items/${editItemId}`, data);
                const updatedItems = items.map(item => (item.id === editItemId ? {...item, ...data} : item));
                setItems(updatedItems);
                setIsEdit(false);
                setEditItemId(null);
                setName("");
                setPrice("");
                setQty(0);
                setCategoryId(null);
                console.log("Item updated successfully");
            } catch (error) {
                console.error("Error updting item:", error);
            }
        } else {
            try {
                const response = await axios.post("http://localhost:8080/items", data, {
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    }
                });
                setItems(prevItems => [...prevItems, response.data]);
                setName("");
                setPrice("");
                setQty(0);
                setCategoryId(null);
                console.log("Item created successfully");

            } catch (error) {
                console.error("Error creating item", error);
            }
        }

    }


    const handleDelete = async (itemId) => {
        try {
            await axios.delete(`http://localhost:8080/items/${itemId}`);
            const updatedItems = items.filter(item => item.id !== itemId);
            setItems(updatedItems);
            console.log("Item deleted successfully");
        } catch (error) {
            console.error("Error deleting item:",error);
        }
    }

    
    
    return (
            <div className="item-container">
                <div className="form-container">
                    <h1 className="cln">Item</h1>
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
                        
                        <button type="submit" className="btn btn-secondary">{isEdit ? "Update" : "Submit"}</button>
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
                                <th className="ha">Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items && items.map((item) =>(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.qty}</td>
                                    <td className="d1">
                                        <div className="edit2" onClick={() => handleEdit(item.id)}><FaEdit /></div>
                                        <div className="delete2" onClick={() => handleDelete(item.id)}><MdDelete /></div>
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                </div>
            </div>
        )    

}

export default Item;