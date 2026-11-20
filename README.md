# React Fundamentals – Courses app

A courses app: log in, browse and search the courses; admins add, update and delete them.

**Live:** <https://mazsola739.github.io/rika-react-fundamentals/> · **Portfolio:** <https://mazsola739.github.io/mazsola739/> · **The same app in Angular:** <https://mazsola739.github.io/rika-angular-fundamentals/>

It was my homework for the **React Fundamentals** course of EPAM's junior program, in autumn 2021:
five modules in five weeks, and every week the same app grew: components, routing, Redux, async Redux
with thunks, and tests. The course gave the task sheets and a NestJS backend to run on localhost. In 2026 I
rebuilt the app with today's tools and wrote the backend myself, so the whole thing runs on GitHub Pages.
The commits from 2021 are still here; the state I handed in is tagged [`v2021`](../../tree/v2021).

## Try it

| Account | Email             | Password   | Can                                         |
| ------- | ----------------- | ---------- | ------------------------------------------- |
| Admin   | `admin@email.com` | `admin123` | add, update and delete courses, add authors |
| Student | `user@email.com`  | `user123`  | browse and search                           |

Or register an account of your own. The data lives in your browser's localStorage, so add, edit and
delete freely: **Reset demo data** in the footer brings back the courses of 2021.

## Features

- **Login and registration**: the token is kept in localStorage, so a reload keeps you logged in;
  Logout ends the session on the backend too
- **Courses**: cards with the authors, the duration (`hh:mm hours`) and the creation date; search by
  title or id
- **Course page** with every detail
- **Admin only**: a form to create and update courses (create authors, add them to the course or take
  them off, duration preview) and a delete button; the routes are guarded, a student is sent back to
  the courses
- Works on phones, keyboard and screen reader friendly
- **About page** with the five weeks; the course's task sheets open inside the app (drawn with pdf.js, so
  they work on phones too), and a 404 page

## The backend is mine

The course came with a NestJS backend that stored its data in JSON files. For the renovation I
wrote my own in [`server/`](server): the same endpoints and the same answers, so the app's requests did
not have to change, but no framework, only the web platform's `Request` and `Response`.

- [`server/api.ts`](server/api.ts): routes, validation, sessions. The whole backend is one
  `fetch(request) → response` function.
- [`server/main.ts`](server/main.ts): that function as a Bun server (`bun run server`,
  <http://localhost:4000>), with the data in `server/data/db.json`.
- [`server/browser.ts`](server/browser.ts): the same function inside the browser. GitHub Pages cannot
  run a server, so on the live site the app hands its requests straight to it, and the data is kept in
  localStorage.
- Passwords are stored as PBKDF2-SHA-256 hashes with a salt per user (Web Crypto, so it works in both
  places); logins get a random 256-bit token that expires after a day and ends on logout; the admin
  routes answer `401` without a login and `403` for a student.

| Method   | Path                           | Who       | What                                                             |
| -------- | ------------------------------ | --------- | ---------------------------------------------------------------- |
| `GET`    | `/`                            | anyone    | the list of endpoints                                            |
| `POST`   | `/register`                    | anyone    | `{ name, email, password }`                                      |
| `POST`   | `/login`                       | anyone    | `{ email, password }` → `"Bearer <token>"`                       |
| `DELETE` | `/logout`                      | logged in | the token stops working                                          |
| `GET`    | `/users/me`                    | logged in | the user, with the role                                          |
| `GET`    | `/courses/all`                 | anyone    | every course                                                     |
| `GET`    | `/courses/filter?title=…`      | anyone    | courses whose title, description, creationDate or duration match |
| `GET`    | `/courses/:id`                 | anyone    | one course                                                       |
| `POST`   | `/courses/add`                 | admin     | `{ title, description, duration, authors }`                      |
| `PUT`    | `/courses/:id`                 | admin     | any of those fields                                              |
| `DELETE` | `/courses/:id`                 | admin     | delete a course                                                  |
| `GET`    | `/authors/all`, `/authors/:id` | anyone    | every author, one author                                         |
| `POST`   | `/authors/add`                 | admin     | `{ name }`                                                       |
| `PUT`    | `/authors/:id`                 | admin     | `{ name }`                                                       |
| `DELETE` | `/authors/:id`                 | admin     | delete an author who is on no course                             |

Every answer is `{ "successful": true, "result": … }`, or `{ "successful": false }` with a `result`
message or a list of `errors`.

## What changed since 2021

| 2021                                          | 2026                                                                        |
| --------------------------------------------- | --------------------------------------------------------------------------- |
| Create React App 4, npm                       | Vite 8, Bun                                                                 |
| React 17, JavaScript, PropTypes               | React 19, TypeScript                                                        |
| Redux 4 and redux-thunk, action types by hand | Redux Toolkit: slices and `createAsyncThunk`                                |
| React Router 5                                | React Router 7, hash routing for GitHub Pages                               |
| Bootstrap 5 and Font Awesome from CDNs        | Tailwind CSS 4 with the same light cyan look, SVG icons, self-hosted Roboto |
| A NestJS backend on `localhost:3000`          | My own backend: a Bun server, or the same code in the browser               |
| Passwords in plain text in a JSON file        | PBKDF2 hashes, expiring tokens                                              |
| `alert('Please, fill in all fields')`         | The form lists what is missing                                              |
| Jest and Testing Library                      | Vitest and Testing Library: 64 tests, 19 of them for the backend            |
| ESLint, Prettier, Husky                       | Biome, GitHub Actions deploy to GitHub Pages                                |

The courses are the ones I made up in 2021: Zombie, DeLorean, Cat, Hodor, Far far away and Cupcake
ipsum, with superheroes and Game of Thrones characters as authors.

## Stack

React 19 · TypeScript · [Redux Toolkit](https://redux-toolkit.js.org) ·
[React Router 7](https://reactrouter.com) · [Tailwind CSS 4](https://tailwindcss.com) ·
[pdf.js](https://mozilla.github.io/pdf.js/) · [Vite](https://vite.dev) · [Vitest](https://vitest.dev) + Testing Library ·
[Biome](https://biomejs.dev) · [Bun](https://bun.sh)

## Run locally

```bash
bun install
bun run dev
```

That runs the app with the backend in the browser, as on GitHub Pages. To use the real server instead,
start it in one terminal and the app in another:

```bash
bun run server
bun run dev:server
```

| Script               | What it does                                                  |
| -------------------- | ------------------------------------------------------------- |
| `bun run dev`        | dev server with hot reload, the backend runs in the browser   |
| `bun run server`     | the backend as a Bun server on port 4000, restarts on changes |
| `bun run dev:server` | dev server that talks to `bun run server`                     |
| `bun run build`      | type check + production build into `dist/`                    |
| `bun run preview`    | serve the production build locally                            |
| `bun run test`       | backend, store and component tests (Vitest, happy-dom)        |
| `bun run typecheck`  | TypeScript check only                                         |
| `bun run lint`       | Biome: lint, formatting, import order and class order         |
| `bun run format`     | apply every safe Biome fix and format the code                |

## Project structure

```
server/         my backend: api.ts (routes), passwords.ts, storage.ts, seed.json,
                main.ts (Bun server), browser.ts (in the browser), api.test.ts
src/
  api/          the request function and services.ts, every call to the backend
  store/        Redux Toolkit: user, courses and authors slices, typed hooks and selectors
  components/   Header, Courses, CourseCard, SearchBar, CourseInfo, CourseForm, Login,
                Registration, About, the task sheet page, the route guards, with their tests
  common/       Button, Input, icons and small UI pieces
  helpers/      duration, date and author name formatting
  taskSheets.ts the five weeks and their task sheets
course-tasks/   the course's task sheets of the five weeks (PDF)
```

## Deployment

Every push to `main` is linted, type checked, tested, built and published by
`.github/workflows/deploy.yml`. One-time setup in the repository: **Settings → Pages → Source: GitHub
Actions**.

## Course material

The task sheets in [`course-tasks/`](course-tasks) are EPAM's material from the course (October 2021);
the solutions are mine. The build includes them, and each one has a page in the app, e.g.
[`#/tasks/week-4-task`](https://mazsola739.github.io/rika-react-fundamentals/#/tasks/week-4-task).
