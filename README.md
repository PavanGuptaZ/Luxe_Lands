# LUXE LANDS 

## Overview

Luxe Lands is a Your Gateway to Exclusive Properties website app developed using the MERN stack, which includes ReactJs, TypeScript, SCSS, and MongoDB. Discover a world of opulence and sophistication at Luxelands, where unparalleled luxury meets exceptional real estate. We curate an exquisite collection of properties, from lavish estates to prime lands, providing you with a seamless experience in finding your dream investment.


<p align="center"> Sample Images</p>

![1 (2)](https://github.com/PavanGuptaZ/Luxe_Lands/assets/144094802/2ca1b31f-dd33-4596-8343-b6b7dff6fccb)

![1 (1)](https://github.com/PavanGuptaZ/Luxe_Lands/assets/144094802/e0cbad8e-3aec-4a98-91ae-743004debf68)


## Installation:
Clone the repository to your local machine:

```bash
git clone https://github.com/PavanGuptaZ/Luxe_Lands.git
```


### Setup Environment keys
Create .env files in both the frontend and backend folders:

#### In the Backend folder add the following variables
-	DATABASE_URL (MongoDB connection string)
-	ACCESS_TOKEN (Secret Key)
-	REFRESH_TOKEN (Secret Key)

add Frontend origin in - backend/config/allowed origin.js

````JavaScript
const allowedOrigins = [
    'http://localhost:3000',
    'http://192.168.0.107:300'
    'ADD REQUIRE ORIGINS'
]

export default allowedOrigins
````

it is going to help on CORS

#### In the Frontend folder add the following variables
- VITE_BACKEND_LINK (Link to the backend server)

### ToRun
Navigate to the frontend and backend folders in the terminal and run

#### for frontend
````bash
  cd frontend
  npm install
  npm run dev
````

#### for backend
````bash
  cd backend
  npm install
  npm run dev
````

Check DATABASEURL and NEXT_PUBLIC_BACKEND_LINK in the respective .env files and update if necessary.

### Add Sample data in MongoDB

Sample data of properties "Properties.json" is avaliable in assets folder, add it to MongoDB Propety Collection

## Data_Query:
The entire project uses the Fetch API for network requests, and React Query (also known as Transatck Query) for managing asynchronous data.


## Authentication:
- Passwords are hashed using Bcrypt.
- ACCESS_TOKEN and REFRESH_TOKEN are generated using Jsonwebtoken.
- REFRESH_TOKEN is generated only during user login.
- ACCESS_TOKEN is regenerated upon expiration by checking REFRESH_TOKEN.

## Logging:
- Custom logger function records every entry in the logs folder and `console.log()` simultaneously.
