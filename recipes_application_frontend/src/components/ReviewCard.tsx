import type Review from "../models/review";

//eslint-disable-next-line
export const ReviewCard = (prop:any) => {

    const reviewProp: Review = prop.prop as Review;

    return (
        <div className="recipe-card border rounded">   
            <p>Rating: {reviewProp?.rating} stars</p>   
            <p>Comment: {reviewProp?.comment}</p>
            <p>Created By: {reviewProp.createdBy}</p>   
        </div>
    );
}