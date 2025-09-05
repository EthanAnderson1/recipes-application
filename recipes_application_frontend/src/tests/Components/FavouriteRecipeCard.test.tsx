import { render, screen, fireEvent } from '@testing-library/react';
import {FavouriteRecipeCard} from '../../components/FavouriteRecipeCard';
import "@testing-library/jest-dom"
import Recipe from '../../models/recipe';

const recipe: Recipe = {
        id: 1,
        title: "Test Recipe",
        ingredients: ["ingredient1", "ingredient2"],
        instructions: "Test instructions",
        cookingTime: 30,
        createdBy: "Test User"};

describe('Favourite Recipe Card', () => {
  describe('Favourite Recipe Card component renders',()=>{
    it('should render Favourite Recipe Card component', () => {
      //Arrange
      render(<FavouriteRecipeCard prop={recipe} />);
      //Act
      //Assert
      expect(screen.getByText("Test Recipe")).toBeInTheDocument();
      expect(screen.getByText(`Created By: ${recipe.createdBy}`)).toBeInTheDocument();
      expect(screen.getByText(`Cooking Time: ${recipe.cookingTime} minutes`)).toBeInTheDocument();
      expect(screen.getByText("Select recipe")).toBeInTheDocument();
      expect(screen.getByText("Remove from Favourites")).toBeInTheDocument();
    });
  })
});