import { useEffect, useState } from 'react';
import './Category.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Category = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCategories(response.data);
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
    
        fetchCategories();
    }, [token]);

    const[name, setName] = useState("");
    const[categories, setCategories] = useState([]);
    const[editCategory, setEditCategory] = useState(null);

    const getCategories = async () => {
        const response = await axios.get('http://localhost:8080/categories')
        setCategories(response.data);
        navigate("/login");
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:8080/categories", {name}, {
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            });
            setCategories(prevCategories => [...prevCategories, response.data]);
            setName("");
            console.log("Item created successfully");

        } catch (error) {
            console.error("Error creating item", error);
        }
    }
    
    const handleEdit = (categoryId) => {
        const categoryToEdit = categories.find(category => category.id === categoryId);
        if(categoryToEdit){
            setName(categoryToEdit.name);
            setEditCategory(categoryId);
        }
    }

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8080:categories/${editCategory}`,{name},{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            });

            const updateCategories = categories.map(category => (category.id === editCategory ? {...category, name: response.data.name} : category));
            setCategories(updateCategories);
            setName("");
            setEditCategory(null);
            console.log("Category updated successfully");
        } catch (error) {
            console.error("Error updating category:",error);
        }
    }

    const handleDelete = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:8080/categories/${categoryId}`);
            const updateCategories = categories.filter(category => category.id !== categoryId);
            setCategories(updateCategories);
            console.log("Category deleted successfully");
        } catch (error) {
            console.error("Error deleting category:". error);
        }
    }

    

    return (
        <>
            <div className="categoryName">
            <h1 className="category">Category</h1>
            </div>
            <div className="category-container">
                <div className="form-container1">
                    
                    <form className="form-category" onSubmit={editCategory ?  handleUpdate : handleSubmit}>
                        <div className="form-group1 mb-3">
                            <label className="form-label">Category Name</label>
                            <input type="text" className="form-control" placeholder="Category Name" required onChange={handleName} value={name} />
                        </div>
                        <button type="submit" className="btn btn-secondary">{editCategory ? "Update" : "Submit"}</button>
                    </form>
                </div>
            </div>
            <div className="card3">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="ha">Id</th>
                            <th className="ha">Category Name</th>
                            <th className="ha">Items</th>
                            <th className="ha">Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody className="body">
                        {categories && categories.map((category) => (
                        <tr key={category.id} className="row7">
                            <td className="d1">{category.id}</td>
                            <td className="d1">{category.name}</td>
                            <td className="d1"><Link to={`/items?category=${category.id}`} className="view">View Item</Link></td>
                            <td className="d1">
                                <div className="edit2" onClick={() => handleEdit(category.id)}><FaEdit /></div>
                                <div className="delete2" onClick={() => handleDelete(category.id)}><MdDelete /></div>
                            </td>        
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        
        
        </>
    )

}

export default Category;