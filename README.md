# Club Of Sembawang

This project is built using the following stack:

- **PayloadCMS** for the headless CMS
- **Next.js** for the front-end
- **TailwindCSS** for styling
- **ShadCN/UI** for UI components
- **pnpm** as the package manager

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Development Server](#running-the-development-server)
- [Available Commands](#available-commands)
- [Project Structure](#project-structure)

## Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [pnpm](https://pnpm.io/) (v7.x or higher)
- [docker](https://docs.docker.com/get-docker/)

## Installation

1. Clone the repository

```bash
git clone https://github.com/vincentcayadi/club-of-sembawang.git
```

2. Install dependencies

```bash
pnpm i
```

3. Copy the `.env.example` file to `.env.local` and fill in the required values

```bash
cp .env.example .env.devlopment.local
```

4. Start the development server

```bash
./start-database.sh
```

## Running the Development Server

To run the development server, use the following command:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser for the main page, and navigate to [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

## Available Commands

You can use the following commands to interact with the project for payload:

### To migrate databases

```bash
pnpm run payload migrate:create <descriptive name>
```

### To generate types for payload:

```bash
pnpm payload generate:types
```

## Project Structure

The project is structured as follows:
(app) - main UI of the page if you want to edit the interface do it here
/access - dependencies for the payload admin access thing
/blocks - it is like a resuable compoentn that the user can use inside the admin panel and will be rendered in the main page defiens schema and default ui export
/collection - schema for the payload collections
/globals - gloabl schema for collectin (header and footer)
/components - ui components