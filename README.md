<h1>Techerudite Assessment</h1>
<h3>Steps to run the Application</h3>
<p>1. Clone the project using git clone command</p>
```
git clone https://github.com/raj-rangani/techerudite-assessment.git
```
<br />
<p>2. Add the Environment variables creating .env file in the root</p>
```
DATABASE_URL=
PASSWORD_SALT_ROUNDS=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
```
<br />
<p>3. Run the below commands to init project</p>
```
npx prisma generate
npx prisma db push
```
<br />
