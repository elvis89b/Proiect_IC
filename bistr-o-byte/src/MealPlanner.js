import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MealPlanner.css';

function MealPlanner() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [meals, setMeals] = useState(Array(7).fill(''));

    const updateMeal = (index, value) => {
        const newMeals = [...meals];
        newMeals[index] = value;
        setMeals(newMeals);
    };

    return (
        <>
            <header className="header_planner">
                <img src="/images/logo1.png" alt="Bistr-O-Byte Logo" className="logo_planner" />
                <h1 className="header-title_planner">Bystr-O-Byte</h1>
                <nav className="buttons_planner">
                    <Link to="/homepage" className="nav-button_planner">Homepage</Link>
                    <Link to="/fridge" className="nav-button_planner">My Fridge</Link>
                    <Link to="/dish-finder" className="nav-button_planner">Dish Finder</Link>
                </nav>
            </header>

            <main className="container_planner">
                <h2 className="title_planner">Meal Planner</h2>
                <div className="week_planner">
                    {days.map((day, index) => (
                        <div className="day_planner" key={index}>
                            <h3 className="day-title">{day}</h3>
                            <textarea
                                className="textarea_planner"
                                value={meals[index]}
                                onChange={(e) => updateMeal(index, e.target.value)}
                                placeholder="Write your meal plan here..."
                            />
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}

export default MealPlanner;
