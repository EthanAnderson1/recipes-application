import { render, screen } from '@testing-library/react';
import {RecipeCard} from '../../components/RecipeCard.tsx';
import type Recipe from '../../models/recipe.ts';

const recipe: Recipe = {
        id: 1,
        title: "Test Recipe",
        ingredients: ["ingredient1", "ingredient2"],
        instructions: "Test instructions",
        cookingTime: 30,
        createdBy: "Test User"};

describe('Recipe Card', () => {
  it('should renders fields', () => {
    //Arrange
    render(<RecipeCard prop={recipe} />);
    //Assert
    expect(screen.getByText("Test Recipe")).toBeInTheDocument();
    expect(screen.getByText(`Created By: ${recipe.createdBy}`)).toBeInTheDocument();
    expect(screen.getByText(`Cooking Time: ${recipe.cookingTime} minutes`)).toBeInTheDocument();
    expect(screen.getByText("Select recipe")).toBeInTheDocument();
  });
});