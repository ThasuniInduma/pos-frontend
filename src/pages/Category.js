import { useEffect } from 'react';
import './Category.scss';

const Category = () => {

    

    return (
        <>
        <div className="category-container">
            <div className="form-container1">
                <h1 className="category">Category</h1>
                <form className="form-category">
                    <div className="form-group1 mb-3">
                        <label className="form-label">Category Name</label>
                        <input type="text" className="form-control" placeholder="Category Name" required />
                    </div>
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </form>
            </div>
        </div>
        
        </>
    )

}

export default Category;