import User from '../models/User.ts';
import app from '../app.ts';
import request from 'supertest';
import {create, findByUsername} from '../repositories/UserRepo.ts';
import bcrypt from 'bcryptjs';

jest.mock("../repositories/UserRepo.ts");
const mockedUser = { id: 1, username: "test", password: "password" } as User;
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
        const user = {id: mockedUser.id, username: mockedUser.username, password: hash} as User
        (findByUsername as jest.Mock).mockResolvedValue(user);
        //act
        const response = await request(app).post('/login').send({ username: "test", password: "password" });
        //assert
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('string');
    })
});


