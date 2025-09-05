import { render, screen } from '@testing-library/react';
import {ReviewCard} from '../../components/ReviewCard.tsx';
import type Review from '../../models/review.ts';

const mockReview = {id: 1,comment: "comment",rating: 1,createdBy: "Fake User",recipeId: 1} as Review;

describe('CreateRecipeForm', () => {
  it('test runs', () => {
    
    });
  it('renders form fields', () => {
    //Arrange
    render(<ReviewCard prop={mockReview}/>);
    //Assert
    expect(screen.getByText(`Rating: ${mockReview?.rating} stars`)).toBeInTheDocument();
    expect(screen.getByText(`Comment: ${mockReview?.comment}`)).toBeInTheDocument();
    expect(screen.getByText(`Created By: ${mockReview.createdBy}`)).toBeInTheDocument();
  });
});