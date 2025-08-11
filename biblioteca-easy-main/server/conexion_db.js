import dotenv from "dotenv";
import mysql from "mysql2/promise"

// Cargar variables de .env
dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "biblioteca_virt",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    connectionLimit: 10,        // Máximo número de conexiones activas al mismo tiempo
    waitForConnections: true,   // Si se alcanza el límite, las nuevas peticiones esperan su turno
    queueLimit: 0               // Número máximo de peticiones en espera (0 = sin límite)
})


export async function probarConexionConLaBaseDeDatos() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión a la base de datos exitosa');
        connection.release();
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', {
            code: error.code,
            errno: error.errno,
            sqlState: error.sqlState,
            message: error.message,
            address: process.env.DB_HOST || "localhost",
            database: process.env.DB_NAME || "biblioteca_virt",
            user: process.env.DB_USER || "root",
            port: Number(process.env.DB_PORT) || 3306,
        });
    }
}