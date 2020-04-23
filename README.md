# contact-keeper

### Contact manager app to save contacts, a MERN stack application.

1. React
1. Context API
1. Express JS + MongoDB

> Hosted at: [Contact Keeper](http://sps-contact-keeper.herokuapp.com/login)


### Usage:
Add your environment variables in 'dev.env' file (in root directory):
```env
PORT=Your_Express_Port
MONGODB_URI=Your_MongoDB_URI
JWT_SECRET=Your_Jwt_Secret
```

Install dependencies:

```bash
npm install # Express dependencies
npm client-install # React dependencies
```

Run server:

```bash
npm run dev # Express (:1337) and React (:3000)
npm run server # Express API only (:1337)
npm run client # React client only (:3000)
```
