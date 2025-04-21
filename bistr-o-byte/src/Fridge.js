import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Fridge.css';

function MyFridge() {
    const [items, setItems] = useState([]);

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
                <nav className="buttons_fridge">
                    <Link to="/homepage" className="nav-button_fridge">Homepage</Link>
                    <Link to="/dish-finder" className="nav-button_fridge">Dish Finder</Link>
                    <Link to="/meal-planner" className="nav-button_fridge">Meal Planner</Link>
                </nav>
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
