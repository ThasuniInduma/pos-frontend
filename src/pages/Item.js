import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    const[isEdit, setIsEdit] = useState(false);
    const[editItemId, setEditItemId] = useState(null);
    const[isOpen, setIsOpen] = useState(false);
    
    
    useEffect(() => {
        getItems();
        getCategories();
    },[])

    const getItems = async () => {
        try{
            const response = await axios.get("http://localhost:8080/items");
            setItems(response.data);  
        } catch (error) {
            if(error.response.status === 401) {
                return "error";
            }
        }
    }

    const getCategories = async () => {

        try {
            const response = await axios.get("http://localhost:8080/categories");
            setCategories(response.data);
        } catch (error) {
            if(error.response.status === 401) {
                return "error";
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
                    <h1 className="item">Item</h1>
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
                            <select required onChange={handleCategory} value={categoryId}>
                                <option className="form-op1">Plese Select</option>

                                {categories && categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                                ))}

                            </select>
                        </div>
                        
                        <button type="submit" className="btn btn-secondary">{isEdit ? "Update" : "Submit"}</button>
                    </form>
                </div>
                <div className="card2" >
                    <table className="table" >
                        <thead>
                            <tr>
                                <th className="hs">Id</th>
                                <th className="hs">Description</th>
                                <th className="hs">Qty</th>
                                <th className="hs">Unit Price</th>
                                <th className="hs">Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody className="body">
                            {items && items.map((item) =>(
                                <tr key={item.id} className="row5">
                                    <td className="d">{item.id}</td>
                                    <td className="d">{item.name}</td>
                                    <td className="d">{item.qty}</td>
                                    <td className="d">{item.price}</td>
                                    <td className="d">
                                        <div className="edit"><FaEdit onClick={() => handleEdit(item.id)}/></div>
                                        <div className="delete"><MdDelete onClick={() => handleDelete(item.id)}/></div>
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