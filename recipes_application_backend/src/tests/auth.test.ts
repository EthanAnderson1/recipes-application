import User from '../models/User.ts';
import app from '../app.ts';
import request from 'supertest';
import {create} from '../repositories/UserRepo.ts';

jest.mock("../repositories/UserRepo.ts");

describe("Auth Tests",  ()=>{
    test("should create a new user",async ()=>{
        //arrange
       const mockedUser = { id: 1, username: "test", password: "password" } as User;
         (create as jest.Mock).mockResolvedValue(mockedUser);
        //act
        const response = await request(app).post('/signup').send({ username: "test", password: "password" })
        //assert
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockedUser);
    })}
);
