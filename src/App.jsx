import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import CreateRecipe from "./pages/Recipe/CreateRecipe";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import { useCookies } from "react-cookie";
import RecipePage from "./pages/Recipe/RecipePage";
import EditRecipe from "./pages/Recipe/EditRecipe";

const App = () => {
  const [cookies, _] = useCookies(["access_token"]);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={cookies.access_token ? <CreateRecipe /> : <Auth />} />
          <Route path="/recipes/:recipeId" element={<RecipePage />} />
          <Route path="/recipes/edit/:recipeId" element={<EditRecipe />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
