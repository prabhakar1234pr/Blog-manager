import pkg from 'pg';
const {Pool} = pkg;
import dotenv from 'dotenv'

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: {
        rejectUnauthorized : false
    }
});

pool.connect((err,client,release)=>{
    if(err){
        return console.error('Error acquiring client',err.stack);
    }
    console.log('Connected to database successfully');
    release();
});

export default pool;

