import type Review from "../models/review";

export const ReviewCard = (prop) => {

    const reviewProp: Review = prop.prop as Review;

    return (
        <div className="recipe-card border rounded">   
            <p>Rating: {reviewProp?.rating} stars</p>   
            <p>Comment: {reviewProp?.comment}</p>
            <p>Created By: {reviewProp.createdBy}</p>   
        </div>
    );
}