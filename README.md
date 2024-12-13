# Setup B2D Venture with Docker and MongoDB

This guide outlines the steps to set up a Next.js B2D venture project with Docker, including MongoDB integration.

## Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- A code editor (e.g., [VS Code](https://code.visualstudio.com/))

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Qosanglesz/B2D.git
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup MongoDB with Docker

Create a docker-compose.yml file in the root
directory:

```yml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    container_name: mongo-container
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

Start MongoDB with Docker:

```bash
docker compose up -d
```
### 4. Create MongoDB collection like this
![image](https://github.com/user-attachments/assets/86a35887-c445-471b-afe7-52205f1bbba0)


### 5. Set Environment Variables

Create local.env inside ./frontend

```env
# AUTH0 variables
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=

AUTH0_AUDIENCE=
AUTH0_SESSION_AUTO_SAVE=false

AUTH0_MANAGEMENT_CLIENT_ID=
AUTH0_MANAGEMENT_CLIENT_SECRET=

NEXT_PUBLIC_ACCESS_TOKEN_API_KEY=


# MONGODB variables
MONGODB_URL=

# STRIPE variables
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

#NEXT
NEXT_PUBLIC_BASE_URL=

UPLOADTHING_TOKEN=

#CoinBase
COINBASE_COMMERCE_API_KEY=
COINBASE_COMMERCE_WEBHOOK_SECRET=
```

### 6. Run Development Server

```bash
npm run dev
```
