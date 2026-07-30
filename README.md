# 🔔 Notification Management System API

Sistema Backend full-stack/API RESTful para la creación, gestión y envío asíncrono multicanal de notificaciones (EMAIL, SMS, PUSH).

## Tecnologías Utilizadas

- **Lenguaje:** TypeScript
- **Framework:** Express.js
- **ORM:** Prisma
- **Base de Datos:** SQLite
- **Autenticación:** JWT (JSON Web Tokens) & Bcrypt
- **Patrones de Diseño:** Strategy Pattern (para canales de notificación)

## Arquitectura y Patrones

El proyecto utiliza una estructura por capas (Controller - Service - Strategy - Data Access) separando las responsabilidades de forma limpia:

- **Strategy Pattern:** Permite desacoplar el envío de notificaciones. Cada canal (`EMAIL`, `SMS`, `PUSH`) implementa una interfaz común `NotificationStrategy`, haciendo que añadir un nuevo proveedor sea tan simple como agregar una nueva clase sin modificar la lógica central.
- **Procesamiento Asíncrono:** La creación de notificaciones retorna de inmediato una respuesta al cliente (`201 Created`) mientras el procesamiento del envío se ejecuta en segundo plano.

## Instalación y Ejecución

1. **Clonar repositorio e instalar dependencias:**
   ```bash
   git clone https://github.com/leysanchezb92/take_home_challenge.git
   cd notification-system
   npm install
   ```

2. **Crea un archivo .env en la raíz del proyecto y define las siguientes variables:**
```
# Puerto del servidor
PORT=3000

# Para SQLite usa: DATABASE_URL="file:./dev.db"

# Clave secreta para la firma de Tokens JWT
JWT_SECRET="tu_clave_secreta_super_segura"
```

3. **Para generar las tablas en tu base de datos y sincronizar el esquema de Prisma, ejecuta:**
- Aplicar migraciones en entorno de desarrollo:
```
npx prisma migrate dev --name init
```
- (Opcional) Generar el cliente de Prisma si hiciste cambios en schema.prisma
```
npx prisma generate
```
- (Opcional) Abrir Prisma Studio para ver los datos de forma visual
```
npx prisma studio
```
4. **Para levantar el servidor en modo desarrollo con recarga automática (hot-reload):**
```
npm run dev
```
El servidor estará corriendo en: http://localhost:3000



