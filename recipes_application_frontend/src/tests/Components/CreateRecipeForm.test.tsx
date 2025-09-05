import { render, screen, fireEvent } from '@testing-library/react';
import {RecipeForm} from '../../components/CreateRecipeForm';
import "@testing-library/jest-dom"

describe('CreateRecipeForm test', () => {
    describe('create recipe form renders', ()=>{
      it('should renders form fields', () => {
          render(<RecipeForm />);
          expect(screen.getByLabelText("Title")).toBeInTheDocument();
          expect(screen.getByLabelText("Cooking Time (minutes)")).toBeInTheDocument();
          expect(screen.getByLabelText("Ingredients (comma separated)")).toBeInTheDocument();
          expect(screen.getByLabelText("Instructions")).toBeInTheDocument();
      });
    });
    
    describe('create recipe form renders', ()=>{
      it('calls onSubmit when form is submitted', () => {
      
        const handleSubmit = jest.fn();
        render(<RecipeForm />);
        fireEvent.change(screen.getByLabelText("Title"), { target: { value: 'Food' } });
        fireEvent.change(screen.getByLabelText("Cooking Time (minutes)"), { target: { value: 5 } });
        fireEvent.change(screen.getByLabelText("Ingredients (comma separated)"), { target: { value: 'Food' } });
        fireEvent.change(screen.getByLabelText("Instructions"), { target: { value: 'Food' } });
        screen.getByTestId('createRecipeForm').onsubmit = handleSubmit;
        const button = screen.getAllByText('Create Recipe').filter((el) => el.tagName === 'BUTTON')[0];
        fireEvent.click(button);
        expect(handleSubmit).toHaveBeenCalled();
      });
    });
  
});