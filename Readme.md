1. This is Node.js povio app
2. All routes has prefix `/api/v1`
3. Download and install packages via npm
4. Run app: `npm run dev`

Login: 
 -  Type: `POST` 
 -  Route:  `/api/v1/auth/login`

Signup: 
 -  Type: `POST`
 -  Route: `/api/v1/auth/signup`



Get logged in user info: 
 -  Type: `GET` 
 -  Route: `/api/v1/me`

Update password:
 -   Type: `POST`
 -   Route: `api/v1/me/update-password`

Like user:
 -   Type: `POST`
 -   Route: `api/v1/user/:id/like`

Unlike user:
 -   Type: `POST`
 -   Route: `api/v1/user/:id/unlike`

Most liked user:
 -   Type: `GET`
 -   Route: `api/v1/user/most-liked`

