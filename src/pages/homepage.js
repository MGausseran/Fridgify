import React, { useState } from 'react';
import Header from '../components/header';
import './homepage.css';

const API_KEY = 'c83016f04b93438ab72a3876bf1a2ee8';

const Homepage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const searchRecipes = async () => {
    const ingredientString = ingredients.join(','); 
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientString}&apiKey=${API_KEY}`);
      const data = await response.json();
      
      if (data.length > 0) {
        setRecipes(data);
        setError('');
        setSelectedRecipe(null);
      } else {
        setRecipes([]);
        setError('No recipes found with these ingredients.');
      }
    } catch (err) {
      setError('Error while searching for recipes.');
      console.error(err);
    }
  };

  const fetchRecipeDetails = async (recipeId) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`);
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (err) {
      setError('Error while fetching recipe details.');
      console.error(err);
    }
  };

  const cleanInstructions = (instructions) => {
    return instructions.replace(/<\/?(ol|li)>/g, '').split('. ').map((step) => step.trim());
  };

  return (
    <div>
      <Header />
      <div className="homepage">
        <div className="body">
          <h2>Welcome to Fridgify!</h2>
          <p>Let’s save those leftovers in the fridge.</p>
          <section className="main_menu">
            <h3 className="main_menu_title">What do you have on hand?</h3>
            <ul className="ingredients_list">
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    placeholder="Enter an ingredient"
                  />
                </li>
              ))}
            </ul>
            <button className="add_ingredient_button" onClick={addIngredient}>
              Add an ingredient
            </button>
            <button className="search_recipe_button" onClick={searchRecipes}>
              Search for a recipe
            </button>
            {error && <p className="error_message">{error}</p>}
          </section>
          {recipes.length > 0 && (
            <section className="recipes_results">
              <h3>Recipes found:</h3>
              <ul className="recipes_list">
                {recipes.map((recipe) => (
                  <li key={recipe.id} onClick={() => fetchRecipeDetails(recipe.id)}>
                    {recipe.title}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {selectedRecipe && (
            <section className="recipe_details">
              <h3>{selectedRecipe.title}</h3>
              <img className="recipe_picture" src={selectedRecipe.image} alt={selectedRecipe.title} />
              
              <h4>Ingredients:</h4>
              <ul className="ingredients_list">
                {selectedRecipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
              
              <div className="instructions">
                <h4>Instructions:</h4>
                {cleanInstructions(selectedRecipe.instructions).map((step, index) => (
                  <p key={index}>{step}.</p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
