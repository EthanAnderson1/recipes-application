import { render, screen, fireEvent } from '@testing-library/react';
import {ReviewForm} from '../../components/CreateReviewForm';
import "@testing-library/jest-dom"

describe('CreateReviewForm test', () => {
    describe('create review form renders', ()=>{
      it('should renders form fields', () => {
        //Arrange
          render(<ReviewForm />);
          //Asset
          expect(screen.getByLabelText("Rating (1-5)")).toBeInTheDocument();
          expect(screen.getByLabelText("Comment")).toBeInTheDocument();
      });
    });
    
    describe('create reivew form renders', ()=>{
      it('calls onSubmit when form is submitted', () => {
      //Arrange
        const handleSubmit = jest.fn();
        render(<ReviewForm />);        
        screen.getByTestId('createReviewForm').onsubmit = handleSubmit;
        //Act
        fireEvent.change(screen.getByLabelText("Rating (1-5)"), { target: { value: 5 } });
        fireEvent.change(screen.getByLabelText("Comment"), { target: { value: "Great" } });
        const button = screen.getByText('Submit Review');
        fireEvent.click(button);
        //Assert
        expect(handleSubmit).toHaveBeenCalled();
      });
    });
  
});