# Notification Management System API

Backend API / RESTful service for the creation, management, and asynchronous multi-channel delivery of notifications (EMAIL, SMS, PUSH).

## 🛠️ Built With

- **Language:** TypeScript
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** SQLite
- **Authentication:** JWT (JSON Web Tokens) & Bcrypt
- **Design Patterns:** Strategy Pattern (for notification channels)

## 🏗️ Architecture & Design Patterns

The project follows a layered architecture (Controller - Service - Strategy - Data Access) ensuring a clean separation of concerns:

- **Strategy Pattern:** Decouples the notification delivery logic. Each channel (`EMAIL`, `SMS`, `PUSH`) implements a shared `NotificationStrategy` interface, making it seamless to introduce new providers by creating a new class without modifying core business logic.
- **Asynchronous Processing:** Notification creation instantly responds to the client (`201 Created`), while the actual delivery process executes in the background.

## 🚀 Installation & Setup

1. **Clone the repository and install dependencies:**
   ```bash
   git clone [https://github.com/leysanchezb92/take_home_challenge.git](https://github.com/leysanchezb92/take_home_challenge.git)
   cd notification-system
   npm install

2. **Environment Variables Configuration**
```
# Server Port
PORT=3000

# Database Connection (SQLite)
DATABASE_URL="file:./dev.db"

# JWT Secret Key
JWT_SECRET="your_super_secret_key"
```
3. **Prisma Database Setup:**
To apply migrations and sync your Prisma schema, run:

- Apply migrations in development:
```
npx prisma migrate dev --name init
```

-(Optional) Regenerate Prisma Client:
```
npx prisma generate
```
- (Optional) Open Prisma Studio to inspect data visually:
```
npx prisma studio
```

4. **Running in Development Mode:**
Start the development server with hot-reloading:
```
npm run dev
```
The server will be running at: http://localhost:3000