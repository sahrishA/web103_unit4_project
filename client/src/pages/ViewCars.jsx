import React from 'react'
import '../App.css'
// src/pages/ViewCars.jsx
import { useState, useEffect } from 'react';
import { getCustomItems, deleteCustomItem } from '../services/CarsAPI';

const ViewCars = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const fetchedItems = await getCustomItems();
            setItems(fetchedItems);
        };
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        await deleteCustomItem(id);
        setItems(items.filter(item => item.id !== id)); // Update the list after deletion
    };

    return (
        <div>
            <h1>Custom Cars</h1>
            {items.map(item => (
                <div key={item.id}>
                    <p>{item.exterior}, {item.roof}, {item.wheels}, {item.interior}</p>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                    <a href={`/edit-item/${item.id}`}>Edit</a>
                </div>
            ))}
        </div>
    );
};

export default ViewCars;