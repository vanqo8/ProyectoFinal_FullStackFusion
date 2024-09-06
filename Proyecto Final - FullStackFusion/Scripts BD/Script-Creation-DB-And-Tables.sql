CREATE DATABASE FullStackFusion;
USE FullStackFusion;

-- Crear tabla Producto
CREATE TABLE Producto(
	Id_Producto INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Precio DECIMAL(10, 3) NOT NULL,
    Referencia VARCHAR(200)
);





