import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './MealPlanner.css';

const MealPlanner = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState({});
  const [plannerId, setPlannerId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Nu am găsit userId în localStorage!");
      return;
    }

    // 1) Obține plannerId pe baza userId-ului
    fetch(`http://localhost:5062/api/plannerRecipe/byUser/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("Nu am putut încărca planner-ul");
        return res.json();
      })
      .then(data => {
        setPlannerId(data.id);
      })
      .catch(err => {
        console.error(err);
        alert("Eroare la încărcarea planner-ului");
      });

    // 2) În paralel adu rețetele
    fetch("http://localhost:5062/api/recipe")
      .then(res => {
        if (!res.ok) throw new Error("Nu am putut încărca rețetele");
        return res.json();
      })
      .then(data => setRecipes(data))
      .catch(err => {
        console.error(err);
        alert("Eroare la încărcarea rețetelor");
      });
  }, []);

  const handleRecipeSelection = (day, recipeId) => {
    setSelectedRecipes(prev => ({ ...prev, [day]: recipeId }));
  };

  const addRecipeToPlanner = async (recipeId, dayOfWeek) => {
    if (!plannerId) {
      alert("Planner-ul încă nu este încărcat.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5062/api/plannerRecipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plannerId: plannerId,
          recipeId: recipeId,
          dayOfWeek: dayOfWeek,
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt);
      }
      alert("Rețeta a fost adăugată cu succes în planner!");
    } catch (e) {
      console.error(e);
      alert("Eroare: " + e.message);
    }
  };

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  return (
    <>
      <header className="header_planner">
        <img src="/images/logo1.png" alt="Bistr-O-Byte Logo" className="logo_planner" />
        <h1 className="header-title_planner">Bistr-O-Byte</h1>
        <nav className="buttons_planner">
          <Link to="/homepage" className="nav-button_planner">Homepage</Link>
          <Link to="/fridge" className="nav-button_planner">My Fridge</Link>
          <Link to="/dish-finder" className="nav-button_planner">Dish Finder</Link>
        </nav>
      </header>

      <main className="container_planner">
        <h2 className="title_planner">Meal Planner</h2>
        <div className="week_planner">
          {days.map(day => (
            <div className="day_planner" key={day}>
              <h3 className="day-title">{day}</h3>

              <select
                className="select-recipe"
                value={selectedRecipes[day] || ""}
                onChange={e => handleRecipeSelection(day, +e.target.value)}
              >
                <option value="">Select Recipe</option>
                {recipes.length === 0
                  ? <option disabled>No recipes available</option>
                  : recipes.map(recipe => (
                      <option key={recipe.id} value={recipe.id}>
                        {recipe.name}
                      </option>
                    ))
                }
              </select>

              <button
                className="add-button"
                onClick={() => addRecipeToPlanner(selectedRecipes[day], day)}
                disabled={!selectedRecipes[day]}
              >
                Add Recipe
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default MealPlanner;