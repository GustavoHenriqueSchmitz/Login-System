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

**1.** Navegue até a pasta raiz client do projeto, e execute:

```
npm install
```

**2.** Navegue até a pasta raiz server do projeto, e execute:

```
npm install
```

### 4 - Inicializar o Prisma (Banco de dados):

**1.** Abra um terminal, e na pasta raiz server do projeto, execute: 
```
sudo docker-compose up
```

**2.** Abra um terminal e navegue até a pasta /src dentro da pasta raiz server.

**3.** Execute o comando:
```
npx prisma generate
```

**4.** Faça deploy das migrações e crie o banco de dados 
```
npx prisma migrate deploy
```

## Executando o servidor da aplicação:

**1.** Abra um terminal, e na pasta raiz server do projeto, execute (se já não tiver executado ao inicializar o prisma): 
```
sudo docker-compose up
```

**2.** Logo em seguida abra outro terminal, e ainda na pasta raiz server do projeto. Execute um dos comandos </br>a seguir de acordo com o modo desejado:

```
# development mode
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Executando o cliente da aplicação:

**1.** Abra um terminal, e na pasta raiz client do projeto. Execute um dos comandos </br>a seguir de acordo com o modo desejado:

```
# development mode
npm run dev

# production mode
npm run build
npm run start
``` 
