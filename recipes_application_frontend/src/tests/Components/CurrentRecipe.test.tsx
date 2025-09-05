import { render, screen, fireEvent } from '@testing-library/react';
import {CurrentRecipe} from '../../components/CurrentRecipe';
import "@testing-library/jest-dom"
import Recipe from '../../models/recipe';
import { RecipeContext } from '../../services/RecipeContext';

const recipe: Recipe = {
        id: 1,
        title: "Test Recipe",
        ingredients: ["ingredient1", "ingredient2"],
        instructions: "Test instructions",
        cookingTime: 30,
        createdBy: "Test User"};

describe('Current Recipe', () => {
  describe('Current Recipe component renders',()=>{
    it('should render Current Recipe component', () => {
      //Arrange
        render(<RecipeContext value={[recipe]}>
            <CurrentRecipe />
          </RecipeContext>
        );
      //Act
      //Assert
      expect(screen.getByText("Test Recipe")).toBeInTheDocument();
      expect(screen.getByText(`Cooking Time: ${recipe.cookingTime} mins`)).toBeInTheDocument();
      recipe.ingredients.forEach(ingredient => {
        expect(screen.getByText(ingredient)).toBeInTheDocument();
      });
      expect(screen.getByText(`Instructions: ${recipe.instructions}`)).toBeInTheDocument();
    });
  })
  describe('reviews form submits',()=>{
    it('should submit on click',()=>{
      //Arrange
      const handleSubmit = jest.fn();
      render(<RecipeContext value={[recipe]}>
            <CurrentRecipe />
          </RecipeContext>
        );      
      screen.getByTestId('createReviewForm').onsubmit = handleSubmit;
      //Act
      fireEvent.change(screen.getByLabelText("Rating (1-5)"), { target: { value: 5 } });
      fireEvent.change(screen.getByLabelText("Comment"), { target: { value: "Great" } });
      const button = screen.getByText('Submit Review');
      fireEvent.click(button);
      //Assert
      expect(handleSubmit).toHaveBeenCalled();
    })
  })
});