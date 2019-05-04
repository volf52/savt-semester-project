## Undergrad Semester project for System Analysis and Design

---

1. Install Nodejs on your system.
2. Optionally install yarn (`npm i -g yarn`).
3. Clone this repo and `cd` into the dir.
4. Run `yarn install`.
5. Run `yarn run server` to start the dev server (default port 5000, can be changed in `server.js`).
6. Rename .env.example in config folder to `.env` and add the required keys to it ( it's written which keys you require).
7. Test the endpoints using `curl` or `Postman` or something similar.

    The api endpoint for registration is `http://localhost:5000/api/users/register` which expects a post request with the `x-www-form-urlencoded` payload with the following keys:

    1. name
    2. email
    3. password
    4. password2

    API endpoint for login is `http://localhost:5000/api/users/login` which requires similar form of data with the following keys.

    1. email
    2. password
