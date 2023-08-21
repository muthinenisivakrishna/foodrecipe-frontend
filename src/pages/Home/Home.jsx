import { React, useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState("");
  const userId = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userId}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  const [cookies, _] = useCookies(["access_token"]);
  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeId,
          userId,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  const findRecipe = async () => {
    try {
      if (searchRecipe === "") {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
        return;
      }

      const response = await axios.get(
        `http://localhost:3001/recipes/search/${searchRecipe}`
      );
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Home-container">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Find your favorite recipe"
          value={searchRecipe}
          onChange={(e) => setSearchRecipe(e.target.value)}
          onKeyDown={(e) => {
            findRecipe();
          }}
        />
        <span className="material-symbols-rounded" onClick={findRecipe}>
          search
        </span>
      </div>
      <div className="recipes-container">
        {recipes.map((recipe) => {
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
                  {savedRecipes.includes(recipe._id) ? (
                    <span className="material-symbols-rounded">check_circle</span>
                  ) : (
                    <span
                      className="material-symbols-rounded"
                      onClick={() => saveRecipe(recipe._id)}
                    >
                      favorite
                    </span>
                  )}
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

export default Home;
