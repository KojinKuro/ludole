# 👾 Ludole

Daily game inspired by Wordle, videogames, and nostalgia

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

## 📸 Screenshots

![App Screenshot](https://github.com/KojinKuro/ludole/assets/11234292/b39639a0-5457-4c81-a913-ca50da9994f8)

## 📝 Overview

Ludole is a daily game inspired by Wordle and classic videogames. Each day, players are presented with a randomly selected game cover that is initially blurred. Players have 8 attempts to guess the game title, with each incorrect guess slightly unblurring the image. This project focuses on building a building out a fullstack application, exposing us to [backend technologies](https://github.com/KojinKuro/ludole-api).

## ✨ Features

- Randomly generated game cover each day
- Heat map indicating the accuracy of guesses
- Multi-page application using React Router
- Responsive design for various screen sizes
- End-to-end testing with Cypress
- Data fetching using the Fetch API
- [Custom-built REST API](https://github.com/KojinKuro/ludole-api)
- PostgreSQL server for data storage

## 🎥 Demo

[https://ludole.vercel.app/](https://ludole.vercel.app/)

## ⚙️ Installation

To run Ludole locally, you will need to set up the [backend](https://github.com/KojinKuro/ludole-api). Instructions for this are available in the [backend repository](https://github.com/KojinKuro/ludole-api). Alternatively, you can check out our live deployment. Note that the live backend server may have a slow startup time if it has been idle.

```bash
  git clone git@github.com:KojinKuro/ludole.git
  cd ludole
  npm install
  npm run dev
```

The server should be running on: `localhost:5173`

## 🧪 Running Tests

To run our Cypress tests, run the following command

```bash
  npm run e2e
```

From there the Cypress test runner will run. For more information on Cypress, check out the [Cypress documentation](https://www.cypress.io/)

## 🏫 Context

Ludole was developed in one week at the Turing School of Software & Design. The project was a group effort by four frontend developers, totaling approximately 90 combined programming hours. The primary goal was to build a comprehensive full-stack application.

## 📚 Lessons Learned

The primary objective was to create a full-stack application utilizing React for the frontend and Express, Knex, and PostgreSQL for the backend. We succeed in achieving these goals, and learned a lot from doing this. Key takeaways included understanding the importance of prioritizing essential features for the MVP and navigating extensive documentation. We found alternative resources like developer gists, YouTube tutorials, and mentor guidance to be particularly helpful.

Deploying the backend on a cloud provider was initially intimidating, but using [Render.com](https://render.com/) simplified the process. The fact that their service was free as well was a nice bonus. This also included learning how to setup a `.env` and keeping our environment variables safe to make sure no one could mess with our database.

Most team members focused on backend learning, while some reinforced frontend concepts such as Cypress testing, prop-types checking, and responsive design implementation.

## 👥 Authors

- Brandon Doza - [@BrandonDoza](https://github.com/BrandonDoza)
- Charles Kwang - [@KojinKuro](https://github.com/KojinKuro)
- Gwyneth Patrick - [@moth-dust](https://github.com/moth-dust)
- Lydia Sims - [@LISims88](https://github.com/LISims88)

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) for more details.
