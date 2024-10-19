import React from 'react'
import '../App.css'
// src/pages/CarDetails.jsx
import { useState, useEffect } from 'react';
import { getCustomItemById } from '../services/CarsAPI';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            const fetchedItem = await getCustomItemById(id);
            setItem(fetchedItem);
        };
        fetchItem();
    }, [id]);

    if (!item) return <p>Loading...</p>;

    return (
        <div>
            <h1>Car Details</h1>
            <p>Exterior: {item.exterior}</p>
            <p>Roof: {item.roof}</p>
            <p>Wheels: {item.wheels}</p>
            <p>Interior: {item.interior}</p>
        </div>
    );
};

export default CarDetails;
