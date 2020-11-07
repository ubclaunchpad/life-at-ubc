# Contributing
- [Issues](#Issues)
- [Development Guide](#Development)
    - [Local Setup](#-Setup-Without-Docker)
    - [Docker Setup](#-Setup-With-Docker-Compose)
- [Pull Requests](#Pull-Requests)

## Issues
If you notice any bugs or features that can be added, please open an issue! If you'd like to work on an issue, please assign yourself to it.

## Development 
### ⚙ Setup Without Docker
#### Client
- `cd client`
- `npm install` to install all dependencies 
- `npm start` to build & start the React app

#### Server
- `cd server`
- `npm install` in the root directory to install all dependencies
- `npm start` to start the Node.js server

### Database
- Install PostgreSQL 12.4 (untick pgAdmin installation, we'll install this separately) https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
- pgAdmin version 4.27 release https://www.pgadmin.org/download/
- open `pgAdmin` -> `PostgreSQL 12` -> `Databases`
- Right click `Databases` and `Create` -> `Database`
- name:`'postgres'`, owner: `'postgres'`, password: `123456` (This is the current hard coded config defined in server file)
- If setup correctly you should see the following when running npm start in server:

![Alt text](./pgconnected.png)

### 🐳 Setup With Docker Compose

#### Server
- Make sure that you have `.env` file on the root directory of server (ask one of us!). This file defines `DB_DATABASE`, `DB_PASSWORD`, `DB_USER`, `DB_PORT`, and `DB_HOST`
- `npm install` in the root directory of server to install all dependencies
- run `docker-compose up`
- `docker-compose up` builds, (re)creates, starts, and attaches to containers for a service
- `docker-compose build --no-cache` does not use cache when building the image
- `docker-compose ps` lists containers
- `docker-compose rm` removes stopped service containers
- Useful resources:
    - [Docker Compose](https://docs.docker.com/compose/)
    - [Why use alpine packages?](https://nickjanetakis.com/blog/the-3-biggest-wins-when-using-alpine-as-a-base-docker-image)
    - [Postgresql documentation](https://www.notion.so/Docker-Compose-07fabb20ed224a37b9eeb83dd18dfabc#f22154ebf6e245ca88ce650d706785b5)

#### Docker Installation For Windows
- WSL2 install Windows 10 https://docs.microsoft.com/en-us/windows/wsl/install-win10
- Docker Windows https://docs.docker.com/docker-for-windows/wsl/ - there’s a tidbit here on using VSCode’s Remote-WSL extension that easily allows you to work with a remote server in the Linux distro and your IDE client still on Windows

## Pull Requests
Before making a pull request, please ensure the following:
1. Your branch is up-to-date with the `main` branch
    - If it is out-of-date, please run `git pull` on your working branch
2. All checks pass (currently this is a linting check)
3. Your pull request changes under 1000 lines (recommended)
4. Your pull request has been reviewed by at least one other person.