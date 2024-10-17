import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path:'../.env'})
dotenv.config({path:path.resolve(process.cwd(),'.env')})
import customItemsData from '../data/database.js'
import pg from 'pg'
//following code is similar to data/database.js I use here directly bcs it wasn't working

const config={
    // user: process.env.PGUSER,
    // password:process.env.PGPASSWORD,
    // host: process.env.PGHOST,
    // port: process.env.PGPORT,
    // database: process.env.PGDATABASE,
    //connectionString: process.env.DATABASE_URL,
    connectionString:'postgresql://postgres:vmDJSvuCZcXYgEyrOlNHWroIlMKdTVPb@junction.proxy.rlwy.net:36870/railway'
}
const pool = new pg.Pool(config);
const createCustomTable=async()=>{
    const createTableQuery=`
    DROP TABLE IF EXISTS custom_items;
    CREATE TABLE IF NOT EXISTS custom_items(
    id SERIAL PRIMARY KEY,
    exterior TEXT,
    roof TEXT,
    wheels TEXT,
    interior TEXT
    )

    `;
    try{
       await pool.query(createTableQuery);
       console.log('events table created successfuly')
    }catch (err){
        console.error('Error creating events table:',err);
    }
};
//seed custom_items
const seedCustomTable=async()=>{
    await createCustomTable();
    for(const data of customItemsData ){
        const insertQuery =`
        INSERT INTO custom_items(exterior,roof,wheels, interior)
        VALUES ($1,$2,$3,$4);
        `;
        const values =[data.exterior,data.roof,data.wheels,data.interior];
        try{
            await pool.query(insertQuery,values);
            console.log(`✅ Custom items has added successfully`);
        } catch (err) {
            console.error(`⚠️ Error inserting Custom items:`, err);
        }
    }
}
seedCustomTable();