# Login System

## About the project
A login system, including all the security logic behind it and other functionalities, as well as to create and implement such a system. It includes features like token generation and refresh, user registration, password reset, and recovery.

## Project demonstration video
[![Login System Demo](https://img.youtube.com/vi/grnNSNoWz-4/0.jpg)](https://www.youtube.com/watch?v=grnNSNoWz-4)

## Used technologies
- [NodeJS](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [NestJS](https://github.com/nestjs/nest)
- [Prisma](https://www.prisma.io)
- [NextJS](https://nextjs.org/)

## Installation
It's important to note that the commands described here are specified for the Linux operating system. However, the concept is the same.

### Project clone

```
git clone https://github.com/GustavoHenriqueSchmitz/LoginSystem.git
```

### Install NodeJS V20.11.1

**1.** First, check if you already have Node installed by running the following commands:

```
node -v
npm -v
```

If the result is something like:
```
v20.11.1
v10.2.4
```

You can skip this installation step.

**2.** Open a terminal and run the following commands:
```
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

**3.**
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

**4.** Close the current terminal and open a new one, then proceed by running the following command:
```
nvm install v20.11.1
```
### Install docker-compose:

**1.** First, check if you already have Docker installed by running:
```
docker-compose -v
```
If the version is returned successfully, you can skip this step.

**2.** Run the following commands:
```
sudo apt-get update            
sudo apt install docker-compose
```

**2. (Alternative)** Install Docker directly from its website:
https://www.docker.com

### Install dependencies:

**1.** Navigate to the project's client root folder and run:

```
npm install
```

**2.** Navigate to the project's server root folder and run:

```
npm install
```

### 4 - Initialize Prisma (Database):

**1.** Create a .env file in the project's server root folder and set the Database URL, which will likely be something like:
```
#Database
DATABASE_URL="mysql://root:root@localhost:3306/Login?schema=public"
```

**2.** Open a terminal, and in the project's server root folder, run:
```
sudo docker-compose up
```

**3.** Open a terminal and navigate to the /src folder inside the server root folder.

**4.** Run the command:
```
npx prisma generate
```

**5.** Deploy the migrations and create the database:
```
npx prisma migrate deploy
```

## Running the application server:

**1.** Open a terminal, and in the project's server root folder, run (if you haven't already done so when initializing Prisma):
```
sudo docker-compose up
```

**2.** In the server root folder’s .env file (if you haven’t created it when initializing the database, create it now), add your secret key:
```
#Token JWT
JWT_SECRET="secret_key_here"
```

**3.** After that, access the file at /server/src/auth/auth.module.ts and configure the application's email for sending emails:

**4.** Right after, open another terminal in the project's server root folder. Run one of the following commands according to the desired mode:

```
# development mode
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Running the application client:

**1.** Open a terminal in the project's client root folder. Run one of the following commands according to the desired mode:

```
nvm use 20.11.1
```

```
# development mode
npm run dev

# production mode
npm run build
npm run start
``` 

## Author
**Gustavo Henrique Schmitz**

**Linkedin:** https://www.linkedin.com/in/gustavo-henrique-schmitz  
**Portfolio:** https://gustavohenriqueschmitz.com  
**Email:** gustavohenriqueschmitz568@gmail.com  
