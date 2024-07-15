# Demo Video

[![Watch the video](https://cdn-cf-east.streamable.com/image/rizsnp.jpg)](https://streamable.com/rizsnp)

# Steps to Install and Run:

### Development
_populate with dummy data and run app_

#### 1. Install client dependencies

in `\wormbookstore\client` directory:

```shell
npm i
```

#### 2. Run Server
_runs client and server concurrently in a single command prompt_

in `\wormbookstore` directory:

```shell
npm i
npm run dev 
```

#### 3. Go to http://localhost:3000

---

### Production
_You'll need two different command prompts running concurrently_

#### 1. Create React Production Build

in `\wormbookstore\client` directory:

```shell
npm i
npm run build
```

*you can close this first command prompt after building*

#### 2. Run Server

in `\wormbookstore` directory:

```shell
npm i
node server.js
```

#### Go to http://localhost:5000
