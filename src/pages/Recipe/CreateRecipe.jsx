import { React, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import "./CreateRecipe.css";
import { useCookies } from "react-cookie";
import recipeImg from "../../assets/recipe.png";

const CreateRecipe = () => {
  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
    time: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const [cookies, _] = useCookies(["access_token"]);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = axios.post("http://localhost:3001/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe created");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="create-recipe-container">
     <div className="recipe-form">
      <h1>Create Recipe</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" onChange={handleChange} />
        
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" onChange={handleChange} />

        <label htmlFor="ingredients">Ingredients</label>
        <input type="text" name="ingredients" id="ingredients" onChange={handleChange} />
        <br/>
        <label htmlFor="instructions">Instructions</label>
        <br/>
        <textarea
          name="instructions"
          id="instructions"
          onChange={handleChange}
        ></textarea>
        <br/>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          onChange={handleChange}
        />

        <label htmlFor="time">Time (minutes)</label>
        <br/>
        <input type="number" name="time" id="time" onChange={handleChange} />
        <br/>
        <input type="submit" value="Create recipe" className="btn" />
      </form>
    </div>
<div>
        <img src={recipeImg} alt="recipe" className="recipe__image" />
     </div>
    </div>
  );
};

export default CreateRecipe;
