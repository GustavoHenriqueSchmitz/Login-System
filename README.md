# Login System

Aplicação desenvolvida usando: [NodeJS](https://nodejs.org), [TypeScript](https://www.typescriptlang.org), [NestJS](https://github.com/nestjs/nest), [Prisma](https://www.prisma.io), [NextJS](https://nextjs.org/).

## Clone do projeto

```
git clone https://github.com/GustavoHenriqueSchmitz/LoginSystem.git
```
## Instalação

### 1 - Instale NodeJS V20.11.1

**1.** Primeiro verifique se você já tem o node instalado executando os seguintes comandos:

```
node -v
npm -v
```

Se o resultado for algo como:
```
v20.11.1
v10.2.4
```

Você pode pular esta etapa de instalação.

**2.** Abra um terminal e execute os comandos seguintes:
```
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

**3.**
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

**4.** Feche o terminal atual e abra um novo, e prossiga executando o comando seguinte:
```
nvm install v20.11.1
```
### 2 - Instale docker-compose:

**1.** Primeiro verifique se você já tem o docker instalado, execute:
```
docker-compose -v
```
Se a versão for retornada com sucesso, pode pular esta etapa.

**2.** Execute os seguintes comandos:
```
sudo apt-get update            
sudo apt install docker-compose
```

**2. (Alternativa)** Instale docker diretamente pelo seu site:
https://www.docker.com

### 3 - Instalar depêndencias:

**1.** Navegue até a pasta raiz **client** do projeto, e execute:

```
npm install
```

**2.** Navegue até a pasta raiz **server** do projeto, e execute:

```
npm install
```

### 4 - Inicializar o Prisma (Banco de dados):

**1.** Crie um arquivo **.env** na pasta raiz **server** do projeto e defina a URL do Banco de Dados, que provavelmente será algo como:
```
#Database
DATABASE_URL="mysql://root:root@localhost:3306/Login?schema=public"
```

**2.** Abra um terminal, e na pasta raiz **server** do projeto, execute: 
```
sudo docker-compose up
```

**3.** Abra um terminal e navegue até a pasta **/src** dentro da pasta raiz server.

**4.** Execute o comando:
```
npx prisma generate
```

**5.** Faça deploy das migrações e crie o banco de dados 
```
npx prisma migrate deploy
```

## Executando o servidor da aplicação:

**1.** Abra um terminal, e na pasta raiz **server** do projeto, execute (se já não tiver executado ao inicializar o prisma): 
```
sudo docker-compose up
```

**2.** No arquivo .env da pasta raiz **server** (se não tiver criado ao inicializar o banco de dados, crie) adicione sua secret key:
```
#Token JWT
JWT_SECRET="secret_key_here"
```

**3.** Após isso acesse o arquivo em **/server/src/auth/auth.module.ts** e configure o email da aplicação para envio de emails:

**4.** Logo em seguida abra outro terminal, na pasta raiz **server** do projeto. Execute um dos comandos </br>a seguir de acordo com o modo desejado:

```
# development mode
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Executando o cliente da aplicação:

**1.** Abra um terminal, e na pasta raiz **client** do projeto. Execute um dos comandos </br>a seguir de acordo com o modo desejado:

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
