import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        Saved Recipes
      </h1>
      <div className="flex flex-wrap justify-center">
        {savedRecipes.length === 0 ? (
          <p className="text-xl text-gray-600">No saved recipes yet.</p>
        ) : (
          savedRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden m-4 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="w-full h-64">
                <img
                  className="w-full h-full object-cover"
                  src={recipe.imageUrl}
                  alt={recipe.name}
                />
              </div>
              <div className="px-6 py-4">
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  {recipe.name}
                </h2>
                <p className="text-gray-700 mb-2">
                  <strong>Description:</strong> {recipe.description}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                </p>
                <p className="text-gray-700">
                  <strong>Instructions:</strong> {recipe.instructions}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
