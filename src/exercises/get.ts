import { Request, Response } from "express";
import { client } from "../../server";
import { rollback } from "../utils/rollback";

export const getAllExercises = async (request: Request, response: Response) => {
    try {
        await client.query('BEGIN TRANSACTION')
    
        const result = await client.query('SELECT * FROM exercises')
        console.log(result)

        await client.query('COMMIT TRANSACTION')
        response.status(200).json({message: 'Successful transaction', data: result.rows})
    } catch (error){
        console.log(error)
        rollback(client)
        response.json({message: 'Something went wrong', error})
    } 
}

