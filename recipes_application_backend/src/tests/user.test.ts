import User from '../models/User.ts';
import app from '../app.ts';
import request from 'supertest';
import {create, findByUsername, addfavourite, removefavourite} from '../repositories/UserRepo.ts';
import bcrypt from 'bcryptjs';
import {verifyToken} from '../middleware/Auth.ts';

jest.mock("../repositories/UserRepo.ts");
jest.mock('../middleware/Auth.ts');

(verifyToken as jest.Mock).mockImplementation((req,res,next)=>{
    // eslint-disable-next-line
    (req as any).user = {data:{username:"testuser"}};
    next();
});
const mockedUser = {username: "test", password: "password" } as User;
describe("Auth Tests",  ()=>{
    test("should create a new user",async ()=>{
        //arrange
         (create as jest.Mock).mockResolvedValue(mockedUser);
        //act
        const response = await request(app).post('/signup').send({ username: "test", password: "password" })
        //assert
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockedUser);
    })

    test("should take a loging and return a jwt token", async ()=>{
        //arrange
        const hash = await bcrypt.hash(mockedUser.password,10)
        const user = {username: mockedUser.username, password: hash} as User
        (findByUsername as jest.Mock).mockResolvedValue(user);
        //act
        const response = await request(app).post('/login').send({ username: "test", password: "password" });
        //assert
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('string');
    })

    test("should add recipe to favourites", async ()=>{
        //arrange
        (addfavourite as jest.Mock).mockResolvedValue(undefined);
        //act
        const response = await request(app).post('/favourite').send({ id: 1 });
        //assert
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ favourited: true });
    })

    test("should remove recipe from favourites", async ()=>{
        //arrange
        (removefavourite as jest.Mock).mockResolvedValue(undefined);
        //act
        const response = await request(app).delete('/unfavourite/1');
        //assert
        expect(response.status).toBe(204);
    })

});