import { useEffect, useState } from 'react';
import './Stock.scss';
import axios from 'axios';

const Stock = () => {
    const [stocks, setStocks] = useState([]);
    const [items, setItems] = useState(null);
    const [itemId, setItemId] = useState(null);
    const [qty, setQty] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8080/items");
            setItems(response.data);
        } catch (error) {
            setError("Error fetching items");
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    const getItemName = (itemId) => {
        const item = items.find((item) => item.id === itemId);
        return item ? item.name : 'N/A';
    };

    const handleItem = (event) => {
        setItemId(event.target.value);
    }

    const handleQty = (event) =>{
        setQty(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        if (!itemId || qty <= 0) {
            setError("Please select an item and enter a valid quantity");
            return;
        }

        try {
            setLoading(true);

            const existingStock = stocks.find((stock) => stock.itemId === itemId);
            if (existingStock) {
                const updatedStock = stocks.map((stock) =>
                    stock.itemId === itemId ? { ...stock, qty: stock.qty + qty } : stock
                );
                setStocks(updatedStock);
            } else {
                const response = await axios.post(`http://localhost:8080/api/stock/add`, {
                    itemId: itemId,
                    qty: qty,
                });
                setStocks((newStocks) => [...newStocks, response.data]);

                const existingItem = items.find((item) => item.id === itemId);
                if (existingItem) {
                    const updatedItems = items.map((item) =>
                        item.id === itemId ? { ...item, qty: item.qty } : item
                    );
                    setItems(updatedItems);
                }

                await axios.put(`http://localhost:8080/items/${itemId}/update`, {
                    qty: qty,
                });
            }

            setItemId(null);
            setQty(0);
            console.log("Stock updated successfully");
        } catch (error) {
            setError("Error updating stock");
            console.error("Error updating stock:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="stock">
            <h1>Stock</h1>
            
        </div>
        <div className="stock-container">
            <div className="form-container2">
                <form className="form-stock" onSubmit={handleSubmit}>
                    <div className="form-group2 mb-3">
                        <label className="form-label">Items</label>
                            <select required onChange={handleItem} value={itemId}>
                                <option className="form-op1">Plese Select</option>

                                {items && items.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                                ))}

                            </select>
                    </div>
                    <div className="form-group2 mb-3">
                        <label className="form-label">Qty</label>
                        <input type="text" className="form-control" placeholder="Qty" required onChange={handleQty} value={qty} />
                    </div>
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </form>
            </div>
        
        <div className="card4">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="ha2">Id</th>
                            <th className="ha2">Item Id</th>
                            <th className="ha2">Item Name</th>
                            <th className="ha2">Qty</th>
                            
                        </tr>
                    </thead>
                    <tbody className="body">
                        {stocks && stocks.map((stock) => (
                        <tr key={stock.id} className="row7">
                            <td className="d2">{stock.id}</td>
                            <td className="d2">{stock.itemId}</td>
                            <td className="d2">{getItemName(stock.itemId)}</td>
                            <td className="d2">{stock.qty}</td>        
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </>
    )

}

export default Stock;