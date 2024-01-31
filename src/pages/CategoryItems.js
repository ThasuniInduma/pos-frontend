/*import axios from 'axios';
import './CategoryItems.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CategoryItems = () => {

    const[itemsByCategory, setItemsByCategory] =useState(null);
    const[items, setItems] = useState(null);
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');
    

    useEffect(() => {

        const fetchData = async () => {
            try {
                const itemResponse = await axios.get("http://localhost:8080/items");
                setItems(itemResponse.data);
                if(id){
                    const categoryResponse = await axios.get(`http://localhost:8080/categories/${id}/items`);
                    setItemsByCategory(categoryResponse.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    },[id]);

    /*const getItems = async () => {
        try{
            const response = await axios.get("http://localhost:8080/items");
            setItems(response.data);  
        } catch (error) {
            if(error.response.status === 401) {
                return "error";
            }
        }
    }

    const getItemsByCategory = async (categoryId) => {

        try {
            const response = await axios.get(`http://localhost:8080/categories/${categoryId}/items`);
            setItemsByCategory(response.data);
        } catch (error) {
            if(error.response.status === 401) {
                return "error";
            }
        }

    }


    return (

        <div className="card4">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="hs">Id</th>
                            <th className="hs">Description</th>
                            <th className="hs">Qty</th>
                            <th className="hs">Unit Price</th>
                        </tr>
                    </thead>
                    <tbody className="body">
                    {(id ? itemsByCategory : items) && (id ? itemsByCategory : items).map((item) =>(
                        <tr key={item.id} className="row5">
                            <td className="d">{item.id}</td>
                            <td className="d">{item.name}</td>
                            <td className="d">{item.qty}</td>
                            <td className="d">{item.price}</td>
                            
                        </tr>
                    ))}  
                    </tbody>
                </table>
            </div>

    )

}

export default CategoryItems;
*/