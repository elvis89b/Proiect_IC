import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Fridge.css';

function MyFridge() {
    const [items, setItems] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const addItem = () => {
        setItems([...items, { ingredient: '', quantity: '', calories: '' }]);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <>
            <header className="header_fridge">
            <img src="/images/logo1.png" alt="Bistr-O-Byte Logo" className="logo_fridge" />
                <h1 className="header-title_fridge">Bystr-O-Byte</h1>
                <button className="homepage-button_fridge">
                    <Link to="/">HomePage</Link>
                </button>
                <div className="login-form_fridge">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input_fridge"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input_fridge"
                    />
                    <button className="login-button_fridge">
                        <Link to="/homepage" className="login-button_fridge">Login</Link>
                    </button>
                </div>
            </header>

            <main className="container_fridge">
                <h2>My Fridge</h2>
                <table className="table_fridge">
                    <thead>
                        <tr>
                            <th className="th_fridge">Ingredients</th>
                            <th className="th_fridge">Quantity</th>
                            <th className="th_fridge">Calories</th>
                            <th className="th_fridge">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td className="td_fridge">
                                    <input 
                                        type="text" 
                                        value={item.ingredient} 
                                        onChange={(e) => updateItem(index, 'ingredient', e.target.value)}
                                    />
                                </td>
                                <td className="td_fridge">
                                    <input 
                                        type="text" 
                                        value={item.quantity} 
                                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                    />
                                </td>
                                <td className="td_fridge">
                                    <input 
                                        type="text" 
                                        value={item.calories} 
                                        onChange={(e) => updateItem(index, 'calories', e.target.value)}
                                    />
                                </td>
                                <td className="td_fridge">
                                    <button onClick={() => removeItem(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={addItem}>Add Item</button>
            </main>
        </>
    );
}

export default MyFridge;
