# Techerudite Assessment

## Steps to run the Application

### 1) Clone the project using git clone command

```git
git clone https://github.com/raj-rangani/techerudite-assessment.git
```

### 2) Add the Environment variables creating .env file in the root

```
DATABASE_URL=
PASSWORD_SALT_ROUNDS=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
```

### 3) Run the below commands to init project

```
npx prisma generate
npx prisma db push
```
