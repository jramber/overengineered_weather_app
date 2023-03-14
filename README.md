# Over-Engineered Weather App ⛅

This project is an over-engineered weather app, the purpose of this
repo is to demonstrate the ability with multiple technologies.

## Index 📍

## Tech stack 🛠️
Vite, React, Tailwind, Jest, Nest, Figma, Railway, Github CI/CD,
Eslint, conventional commits, Prettier, Husky.

## Decision-making 🧭

The first step when developing any kind of project should be to 
analise the needs of the project and to decide which technologies
are better suited for those needs.

In this case, the goal of the project is tho show-case my
abilities with different technologies and knowledge on the field.

Every one of the next sections of this file contains a brief
description of the technologies used and why they have been chosen.

## Front-end technologies 🖥️

The project's front-end is based on React, as it is the mos
popular Javascript framework.  Next.j could be another option,
but since this project won't have take advantage of
SSR (Server Side Rendering), it won't be much useful.

The project has been created using Vite, as it allows us
to have more control over the project dependencies that CRA,
and it is simpler than the Webpack approach.

To test the web, React Testing Library and Jest has been used,
as the combination of both allows us to have enough testability.

## Design ⭐

As the app is going to be mainly used in mobiles phones,
it has been decided to take a 'mobile first' approach.

The design of the app is simple and minimalist, taking
into account accessibility criteria like the AAA contras ratio,
for the color palette. The design use a 60:30:10 ratio of colors.

To speed up the design process, a css library like Tailwind
has been implemented.

Figma has been the tool used to develop the mockups and the
final designs.

[ Picture of the designs ]

## Back-end technologies ⚙️

The backend could be omitted from the project, as the necessary calls 
to the APIs, could be made directly from the front-end, but as the
goal of the project is to show-case the ability with the tool, it has
been decided to have a back-end service.

The backend uses Nest.js, a Node.js framework, as it has Typescript
support out of the box and is still similar to Node.

The project do not use any database system, as it is not required
to store any user information.

## Deployment 🚅

To make the project publicly available, it is deployed at railway,
using Docker. As the project won't scale and don't have to manage
a big amount of containers, Kubernetes is not used.

To speed up the deployment process a CI/CD pipeline has been
established using GitHub CI/CD.

## Project architecture  🏗️

The project has a mix of DDD (Domain Driven Design) and
(TDD) Test Driven Design approach.

## Code quality and standardization 🪝

To ensure the quality of the code and its standardization,
tools like Prettier, ESlint, Husky and Conventional Commits,
are used.

## Local deployment 👨‍💻

## Todos 📝

- [x] Hooks
  - [x] Commitlint
  - [x] Husky
  - [x] Prettier
  - [x] ESLint
  - [x] Test
- [ ] Deployment
  - [ ] Github CI/CD
  - [ ] Docker
  - [ ] Railway
- [ ] Front-end
  - [x] App
  - [ ] Figma Mocks
  - [ ] Figma Design
  - [ ] Include Tailwind
  - [ ] Dark Mode
  - [ ] Back-end communication
- [ ] Back-end
  - [x] Server
  - [ ] API integration
- [ ] Testing
  - [ ] React testing library
  - [ ] Jest
  - [ ] Unit tests
  - [ ] Integration tests
  - [ ] Mock-up
- [ ] Architecture
  - [ ] TDD
  - [ ] DDD

