import React from "react";
import { useParams } from "react-router-dom";
import "./EditRecipe.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import recipeImg from "../../assets/recipe.png";

const EditRecipe = () => {
  
 
  const userID = useGetUserID();
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    time: 0,
    userOwner: userID,
  });

  
  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(`http://localhost:3001/recipes/${recipeId}`);
      setRecipe({
        title: res.data.title,
        description: res.data.description,
        ingredients: res.data.ingredients,
        instructions: res.data.instructions,
        imageUrl: res.data.imageUrl,
        time: res.data.time,
        userOwner: userID,
      });
    };
    fetchRecipe();
  }, []);



  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const [cookies, _] = useCookies(["access_token"]);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.put(`http://localhost:3001/recipes/edit/${recipeId}`, recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe updated");
      navigate(`/recipes/${recipeId}`);
    } catch (error)  {
      console.log(error);
    }
  };

  return ( <div className="create-recipe-container">
  <div className="recipe-form">
   <h1>Edit Recipe</h1>
   <form onSubmit={onSubmit}>
     <label htmlFor="title">Title</label>
     <input type="text" name="title" id="title" onChange={handleChange} 
     value={recipe.title}/>
     
     <label htmlFor="description">Description</label>
     <input type="text" name="description" id="description" onChange={handleChange} value={recipe.description}/>

     <label htmlFor="ingredients">Ingredients</label>
     <input type="text" name="ingredients" id="ingredients" onChange={handleChange} value={recipe.ingredients} />
     <br/>
     <label htmlFor="instructions">Instructions</label>
     <br/>
     <textarea
       name="instructions"
       id="instructions"
       onChange={handleChange}
       value={recipe.instructions}
     ></textarea>
     <br/>
     <label htmlFor="imageUrl">Image URL</label>
     <input
       type="text"
       name="imageUrl"
       id="imageUrl"
       onChange={handleChange}
       value={recipe.imageUrl}
     />

     <label htmlFor="time">Time (minutes)</label>
     <br/>
     <input type="number" name="time" id="time" onChange={handleChange}  value={recipe.time}/>
     <br/>
     <input type="submit" value="Save recipe" className="btn" />
   </form>
 </div>
<div>
     <img src={recipeImg} alt="recipe" className="recipe__image" />
  </div>
 </div>
);
};

export default EditRecipe;
