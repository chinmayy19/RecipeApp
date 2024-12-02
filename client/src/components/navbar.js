import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <nav className="bg-green-600 text-white fixed w-full top-0 z-50 shadow-md flex items-center h-14 px-4 lg:px-8">
      <div className="flex justify-between w-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white"
              : "hover:text-gray-200 transition duration-300"
          }
        >
          <h1 className="text-xl">RecipeApp</h1>
        </NavLink>
        <div className="flex space-x-12 items-center">
          <NavLink
            to="/create-recipe"
            className={({ isActive }) =>
              isActive
                ? "text-white"
                : "hover:text-gray-200 transition duration-300"
            }
          >
            Create Recipe
          </NavLink>
          <NavLink
            to="/saved-recipes"
            className={({ isActive }) =>
              isActive
                ? "text-white"
                : "hover:text-gray-200 transition duration-300"
            }
          >
            Saved Recipes
          </NavLink>
          {!cookies.access_token ? (
            <NavLink
              to="/auth"
              className="hover:text-gray-200 transition duration-300"
            >
              Login/Register
            </NavLink>
          ) : (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 transition duration-300 px-4 py-2 rounded-md text-white font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
