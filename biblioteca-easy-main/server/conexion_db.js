import dotenv from "dotenv";
import mysql from "mysql2/promise"

// dotenv.config();  // Cargar variables de .env

export const pool = mysql.createPool({
    host: "localhost",
    database: "biblioteca_virt",
    port: 3306,
    user: "root",
    password: "Qwe.123*",
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
        console.error('❌ Error al conectar con la base de datos:', error.message);
    }
}