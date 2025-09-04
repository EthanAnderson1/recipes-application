import app from '../app.ts';
import request from 'supertest';
import {Recipe} from '../models/Recipe.ts';
import {create,remove,getAll,getByUsername,getById,update,getReviews,createReview} from '../repositories/RecipeRepo.ts';
import {verifyToken} from '../middleware/Auth.ts';

const mockedRecipe = {id: 1, title: "test", cookingTime: 30, instructions: "test instructions", ingredients: ["ingredient1","ingredient2"], createdBy: "testuser"} as Recipe;
jest.mock("../repositories/RecipeRepo.ts");
jest.mock('../middleware/Auth.ts');

(verifyToken as jest.Mock).mockImplementation((req,res,next)=>{
    // eslint-disable-next-line
    (req as any).user = {data:{username:"testuser"}};
    next();
});

describe("recipe tests", ()=>{ 
    test("create recipe", async()=>{
        //arrange
        (create as jest.Mock).mockResolvedValue(mockedRecipe);
        //act
        const response = await request(app).post('/recipe').send({ title: "test", cookingTime: 30, instructions: "test instructions", ingredients: ["ingredient1","ingredient2"]});
        //assert
        expect(response.status).toBe(201);
        expect(response.body.recipe).toStrictEqual(mockedRecipe);
    });

    test("get recipe",async ()=>{
        //arrange
        (getById as jest.Mock).mockResolvedValue(mockedRecipe as Recipe);
        //act
        const response = await request(app).get('/recipe/1');
        //assert
        expect(response.status).toBe(200);

        expect(response.body).toStrictEqual(mockedRecipe);
    });
    test("get all recipes",async ()=>{
        //arrange
        (getAll as jest.Mock).mockResolvedValue([mockedRecipe] as Recipe[]);
        //act
        const response = await request(app).get('/recipes');
        //assert
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([mockedRecipe]);
    });
    test("update recipe", async()=>{
        //arrange
        (update as jest.Mock).mockResolvedValue(1);
        //act
        const response = await request(app).put('/recipe').send({ id: 1, title: "updated", cookingTime: 25, instructions: "updated instructions", ingredients: ["ingredient1","ingredient3"]});
        //assert
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({ updated: true });
    });
    test("delete recipe", async ()=>{
        //arrange
        (remove as jest.Mock).mockResolvedValue(1);
        //act
        const response = await request(app).delete('/recipe/1');
        //assert
        expect(response.status).toBe(204);
    });
    test("get recipes by username", async()=>{
        //arrange
        (getByUsername as jest.Mock).mockResolvedValue([mockedRecipe] as Recipe[]);
        //act
        const response = await request(app).get('/recipesByUsername/testuser');
        //assert
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([mockedRecipe]);
    });

    test("get recipe reviews", async()=>{
        //arrange
        const mockReviews = [
            {id:1, recipeId:1, comment:"Great recipe!", rating:5, createdBy:"user1"},
            {id:2, recipeId:1, comment:"Not bad", rating:4, createdBy:"user2"}
        ];
        (getReviews as jest.Mock).mockResolvedValue(mockReviews);
        //act
        const response = await request(app).get('/reviews/1');
        //assert
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(mockReviews);
    });

    test("create review for recipe", async()=>{
        //arrange
        const mockReview = {id:1, recipeId:1, comment:"Great recipe!", rating:5, createdBy:"testuser"};
        (createReview as jest.Mock).mockResolvedValue(mockReview);
        //act
        const response = await request(app).post('/review').send({ recipeId: 1, comment: "Great recipe!", rating: 5 });
        //assert
        expect(response.status).toBe(201);
        expect(response.body.review).toStrictEqual(mockReview);
    });
});
