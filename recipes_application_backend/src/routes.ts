import { Router } from 'express';
import { signup, login } from './controllers/AuthController.ts';
import { findRecipe, findAllRecipes, saveRecipe, removeRecipe, editRecipe, usersRecipies, getReviews, leaveReview } from './controllers/RecipeContoller.ts';
import {verifyToken} from './middleware/Auth.ts';

const router = Router();

router.get('/', verifyToken,(req, res) => {
    res.send('Hello, World!');
});

router.post('/signup', signup);
router.post('/login',login);

router.get('/recipes',verifyToken,findAllRecipes);
router.get('/recipe/:id',verifyToken,findRecipe);
router.post('/recipe',verifyToken,saveRecipe);
router.delete('/recipe/:id',verifyToken,removeRecipe);
router.put('/recipe',verifyToken,editRecipe);
router.get('/recipesByUsername/:username',verifyToken,usersRecipies);

router.post('/review',verifyToken,leaveReview);
router.get('/reviews/:id',verifyToken,getReviews);
export default router;