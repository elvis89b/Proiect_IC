import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MealPlanner.css";

const API_BASE = "http://localhost:5062/api";

const MealPlanner = () => {
  const [recipes, setRecipes] = useState([]);
  const [plannedRecipes, setPlannedRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState({});
  const [expandedDays, setExpandedDays] = useState({});
  const [plannerId, setPlannerId] = useState(null);

  const [showNewRecipeModal, setShowNewRecipeModal] = useState(false);
  const [newRecipeName, setNewRecipeName] = useState("");
  const [newRecipeDesc, setNewRecipeDesc] = useState("");
  const [newRecipeError, setNewRecipeError] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const init = async () => {
      if (!userId) {
        navigate("/login");
        return;
      }
      try {
        setLoading(true);

        // Get or create planner
        const pRes = await fetch(`${API_BASE}/plannerRecipe/byUser/${userId}`);
        if (!pRes.ok) throw new Error("Failed to load your planner");
        const { id } = await pRes.json();
        setPlannerId(id);

        //Load all recipes
        const rRes = await fetch(`${API_BASE}/recipe`);
        if (!rRes.ok) throw new Error("Failed to load recipes");
        setRecipes(await rRes.json());

        //Load existing planned recipes
        const prRes = await fetch(`${API_BASE}/plannerRecipe/${id}`);
        if (!prRes.ok) throw new Error("Failed to load planned recipes");
        setPlannedRecipes(await prRes.json());
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [userId, navigate]);

  const days = [
    "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const handleSelect = (day, recipeId) => {
    setSelectedRecipes(prev => ({ ...prev, [day]: recipeId }));
  };

  const addRecipe = async (recipeId, day) => {
    if (!plannerId || !recipeId) return;
    try {
      const res = await fetch(`${API_BASE}/plannerRecipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plannerId, recipeId, dayOfWeek: day }),
      });
      if (!res.ok) throw new Error(await res.text());
      const updated = await (await fetch(`${API_BASE}/plannerRecipe/${plannerId}`)).json();
      setPlannedRecipes(updated);
    } catch (e) {
      console.error(e);
      alert("Error adding recipe: " + e.message);
    }
  };

  const deleteRecipe = async (plannerRecipeId) => {
    try {
      const res = await fetch(`${API_BASE}/plannerRecipe/${plannerRecipeId}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete");
      const updated = await (await fetch(`${API_BASE}/plannerRecipe/${plannerId}`)).json();
      setPlannedRecipes(updated);
    } catch (e) {
      console.error(e);
      alert("Error deleting recipe: " + e.message);
    }
  };

  const toggleView = (day) => {
    setExpandedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    if (!newRecipeName.trim()) {
      setNewRecipeError("Name is required");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newRecipeName, description: newRecipeDesc }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create recipe");
      }
      const all = await (await fetch(`${API_BASE}/recipe`)).json();
      setRecipes(all);
      setNewRecipeName("");
      setNewRecipeDesc("");
      setNewRecipeError("");
      setShowNewRecipeModal(false);
    } catch (err) {
      console.error(err);
      setNewRecipeError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading your meal planner…</div>;
  if (error)   return <div className="error-message">{error}</div>;

  return (
    <>
      <header className="header_planner">
        <img src="/images/logo1.png" alt="Logo" className="logo_planner" />
        <h1 className="header-title_planner">Bistr-O-Byte</h1>
        <nav className="buttons_planner">
          <Link to="/homepage" className="nav-button_planner">Homepage</Link>
          <Link to="/fridge"    className="nav-button_planner">My Fridge</Link>
          <Link to="/login" className="nav-button_fridge">Logout</Link>
        </nav>
      </header>

      <main className="container_planner">
        <h2 className="title_planner">Meal Planner</h2>
        <div className="week_planner">
          {days.map(day => {
            const forDay = plannedRecipes.filter(pr => pr.dayOfWeek === day);
            return (
              <div className="day_planner" key={day}>
                <h3 className="day-title">{day}</h3>

                <select
                  className="select-recipe"
                  value={selectedRecipes[day] || ""}
                  onChange={e => handleSelect(day, Number(e.target.value))}
                >
                  <option value="">Select Recipe</option>
                  {recipes.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>

                <button
                  className="add-button"
                  onClick={() => addRecipe(selectedRecipes[day], day)}
                  disabled={!selectedRecipes[day]}
                >
                  Add Recipe
                </button>

                <button
                  className="view-button"
                  onClick={() => toggleView(day)}
                >
                  {expandedDays[day] ? "Hide" : "View"} Recipes
                </button>

                {expandedDays[day] && (
                  <ul className="planned-list">
                    {forDay.length === 0
                      ? <li className="no-planned">No recipes planned.</li>
                      : forDay.map(pr => {
                          const found = recipes.find(r => r.id === pr.recipeId);
                          return (
                            <li key={pr.id}>
                              {found ? found.name : `#${pr.recipeId}`}
                              <button
                                className="planned-delete-btn"
                                onClick={() => deleteRecipe(pr.id)}
                                title="Delete"
                              >
                                ×
                              </button>
                            </li>
                          );
                        })
                    }
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <button
          className="open-create-recipe-btn"
          onClick={() => setShowNewRecipeModal(true)}
        >
          + Create New Recipe
        </button>
      </main>

      {showNewRecipeModal && (
        <div className="modal-overlay" onClick={() => setShowNewRecipeModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setShowNewRecipeModal(false)}
            >
              ×
            </button>
            <h3>Create New Recipe</h3>
            <form onSubmit={handleCreateRecipe}>
              <input
                type="text"
                placeholder="Recipe Name"
                value={newRecipeName}
                onChange={e => setNewRecipeName(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                value={newRecipeDesc}
                onChange={e => setNewRecipeDesc(e.target.value)}
                rows={4}
              />
              {newRecipeError && <div className="error-message">{newRecipeError}</div>}
              <button type="submit" className="modal-submit-btn">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MealPlanner;
