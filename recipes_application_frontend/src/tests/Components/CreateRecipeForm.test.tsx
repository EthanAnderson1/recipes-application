import { render, screen, fireEvent } from '@testing-library/react';
import {RecipeForm} from '../../components/CreateRecipeForm';
import "@testing-library/jest-dom"

describe('CreateRecipeForm test', () => {
    describe('create recipe form renders', ()=>{
      it('should renders form fields', () => {
        //Arrange
        render(<RecipeForm />);
        //Assert
        expect(screen.getByLabelText("Title")).toBeInTheDocument();
        expect(screen.getByLabelText("Cooking Time (minutes)")).toBeInTheDocument();
        expect(screen.getByLabelText("Ingredients (comma separated)")).toBeInTheDocument();
        expect(screen.getByLabelText("Instructions")).toBeInTheDocument();
      });
    });
    
    describe('create recipe form renders', ()=>{
      it('should call onSubmit when form is submitted', () => {
        //Arrange
        const handleSubmit = jest.fn();
        render(<RecipeForm />);
        screen.getByTestId('createRecipeForm').onsubmit = handleSubmit;

        //Act
        fireEvent.change(screen.getByLabelText("Title"), { target: { value: 'Food' } });
        fireEvent.change(screen.getByLabelText("Cooking Time (minutes)"), { target: { value: 5 } });
        fireEvent.change(screen.getByLabelText("Ingredients (comma separated)"), { target: { value: 'Food' } });
        fireEvent.change(screen.getByLabelText("Instructions"), { target: { value: 'Food' } });
        const button = screen.getAllByText('Create Recipe').filter((el) => el.tagName === 'BUTTON')[0];
        fireEvent.click(button);

        //Asset
        expect(handleSubmit).toHaveBeenCalled();
      });
    });
  
});