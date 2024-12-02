import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="flex flex-wrap justify-center p-4">
      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white"
        >
          <div className="w-full h-64 overflow-hidden">
            <img
              className="w-full"
              src={recipe.imageUrl}
              alt={recipe.name}
              onError={(e) => {
                e.target.onerror = null; // Prevents infinite loop if placeholder image also fails
                e.target.src = "placeholder.png"; // Replace with your placeholder image URL
              }}
            />
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{recipe.name}</div>
            <p className="text-gray-700 text-base">{recipe.description}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-green-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              Cooking Time: {recipe.cookingTime} minutes
            </span>
            <button
              onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}
              className={`inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white ${
                isRecipeSaved(recipe._id) ? "bg-blue-500" : "bg-red-500"
              }`}
            >
              {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
