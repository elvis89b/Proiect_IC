// src/pages/Fridge.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AIChat from './AIChat';
import './Fridge.css';

function MyFridge() {
    const [items, setItems] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const [quantity, setQuantity] = useState('');
    const [calories, setCalories] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }

        const loadItems = async () => {
            try {
                const response = await fetch(`http://localhost:5062/api/fridge/${userId}`);
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('Failed to load items');
            }
        };

        loadItems();
    }, [userId, navigate]);

    const addItem = async (e) => {
        e.preventDefault();
        if (!ingredient || !quantity || !calories) {
            setErrorMessage('All fields are required!');
            return;
        }

        const newItem = {
            userId: parseInt(userId),
            ingredient,
            quantity,
            calories: parseInt(calories)
        };

        try {
            const response = await fetch('http://localhost:5062/api/fridge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            });

            const data = await response.json();
            if (response.ok) {
                setItems([...items, { ...newItem, id: data.id }]);
                setIngredient('');
                setQuantity('');
                setCalories('');
                setErrorMessage('');
            } else {
                setErrorMessage(data.message || 'Error adding item');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Server error. Please try again later.');
        }
    };

    const updateItem = async (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);

        const item = updatedItems[index];

        try {
            await fetch('http://localhost:5062/api/fridge', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: item.id,
                    userId: item.userId,
                    ingredient: item.ingredient,
                    quantity: item.quantity,
                    calories: parseInt(item.calories)
                }),
            });
        } catch (error) {
            console.error('Error updating item:', error);
            setErrorMessage('Error updating item');
        }
    };

    const removeItem = async (index) => {
        const itemToRemove = items[index];

        try {
            const response = await fetch(`http://localhost:5062/api/fridge/${itemToRemove.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setItems(items.filter((_, i) => i !== index));
            } else {
                setErrorMessage('Error deleting item');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Server error. Please try again later.');
        }
    };

    return (
        <>
            <header className="header_fridge">
                <img src="/images/logo1.png" alt="Bistr-O-Byte Logo" className="logo_fridge" />
                <h1 className="header-title_fridge">Bistr-O-Byte</h1>
                <nav className="buttons_fridge">
                    <Link to="/homepage" className="nav-button_fridge">Homepage</Link>
                    <Link to="/meal-planner" className="nav-button_fridge">Meal Planner</Link>
                </nav>
            </header>

            <main className="container_fridge">
                <h2>My Fridge</h2>

                {/* AI Chat button */}
                <button
                    className="ai-chat-button"
                    onClick={() => setShowChat(true)}
                >
                    Ask AI for Dish Ideas
                </button>

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <form className="form_fridge" onSubmit={addItem}>
                    <input
                        type="text"
                        placeholder="Ingredient"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Calories"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                    />
                    <button type="submit">Add Item</button>
                </form>

                <table className="table_fridge">
                    <thead>
                        <tr>
                            <th>Ingredient</th>
                            <th>Quantity</th>
                            <th>Calories</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={item.ingredient}
                                        onChange={(e) => updateItem(index, 'ingredient', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.calories}
                                        onChange={(e) => updateItem(index, 'calories', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => removeItem(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

            {/* AI Chat Modal */}
            {showChat && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            className="close-btn"
                            onClick={() => setShowChat(false)}
                        >
                            ×
                        </button>
                        <AIChat onClose={() => setShowChat(false)} />
                    </div>
                </div>
            )}
        </>
    );
}

export default MyFridge;
