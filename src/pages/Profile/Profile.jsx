import { React, useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import "./Profile.css";
import { Link } from "react-router-dom";
const Profile = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userId = useGetUserID();

  useEffect(() => {
    const fetchCreatedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/creator/${userId}`
        );
        setCreatedRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userId}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedRecipes();
    fetchCreatedRecipes();
  }, []);

  const removeRecipe = async (recipeId) => {
    try {
      await axios.delete("http://localhost:3001/recipes", {
        data: { recipeId, userId, created: false },
      });
      setSavedRecipes((prevSavedRecipes) =>
        prevSavedRecipes.filter((recipe) => recipe._id !== recipeId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeCreatedRecipe = async (recipeId) => {
    try {
      await axios.delete("http://localhost:3001/recipes", {
        data: { recipeId, userId, created: true },
      });
      setCreatedRecipes((prevCreatedRecipes) =>
        prevCreatedRecipes.filter((recipe) => recipe._id !== recipeId)
      );
      if (savedRecipes.find((recipe) => recipe._id === recipeId)) {
        setSavedRecipes((prevSavedRecipes) =>
          prevSavedRecipes.filter((recipe) => recipe._id !== recipeId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const username = window.localStorage.getItem("username");
  return (
    <div>
      <h2>Created Recipes</h2>
        {createdRecipes.length === 0 && <p className="status">You haven't created any recipes </p>}
      <div className="recipes-container">
        {createdRecipes.map((recipe) => {
          return (
            <div className="recipe-card" key={recipe._id}>
              <div className="imgBox">
                <Link to={`/recipes/${recipe._id}`}>
                  <img src={recipe.imageUrl} alt="" />
                </Link>
              </div>
              <div className="info">
                <div>
                  <Link to={`/recipes/${recipe._id}`}>
                    <h3>{recipe.title}</h3>
                  </Link>
                  <div className="icons">
                    <Link to={`/recipes/edit/${recipe._id}`}>
                      <span className="material-symbols-rounded">edit</span>
                    </Link>
                    <span
                      className="material-symbols-rounded"
                      onClick={() => removeCreatedRecipe(recipe._id)}
                    >
                      delete
                    </span>
                  </div>
                </div>
                <p>{recipe.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <h2>Saved Recipes</h2>
      {savedRecipes.length === 0 && <p className="status">You haven't saved any recipes </p>}
      <div className="recipes-container">
        {savedRecipes.map((recipe) => {
          return (
            <div className="recipe-card" key={recipe._id}>
              <div className="imgBox">
                <Link to={`/recipes/${recipe._id}`}>
                  <img src={recipe.imageUrl} alt="" />
                </Link>
              </div>
              <div className="info">
                <div>
                  <Link to={`/recipes/${recipe._id}`}>
                    <h3>{recipe.title}</h3>
                  </Link>
                  <span
                    className="material-symbols-rounded"
                    onClick={() => removeRecipe(recipe._id)}
                  >
                    delete
                  </span>
                </div>
                <p>{recipe.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
