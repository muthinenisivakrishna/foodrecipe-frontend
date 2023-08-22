import React from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css";
import axios from "axios";
import { useEffect, useState } from "react";

const RecipePage = () => {
  const url = "https://food-recipe-backend.vercel.app"
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(`${url}/recipes/${recipeId}`);
      setRecipe(res.data);
    };
    fetchRecipe();
  }, []);

  return (
    <div className="recipe-container">
      <div className="recipe-img">
        <img src={recipe.imageUrl} alt="img" />
        <div>
          <h4>Recipe Name: </h4>
          <p>{recipe.title}</p>
        </div>
        <div>
          <h4>Recipe Description: </h4>
          <p>{recipe.description}</p>
        </div>
        <div>
          <h4>Cooking Time: </h4>
          <p>{recipe.time} minutes</p>
        </div>
      </div>
      <div className="recipe-details">
        <h4>Recipe Ingredients: </h4>
        <p>{recipe.ingredients}</p>

        <h4>Recipe Instructions: </h4>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipePage;
