import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/products/") // Django API endpoint
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map(product => (
                    <div key={product.id} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
                        <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} style={{ width: '150px', height: '150px' }} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>₹{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
