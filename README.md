Running the Doc site locally

1. Clone the repository 
 
```
git clone https://github.com/mthtclone/docs.git
cd docs
```

2. Install Python  
Make sure Python is installed (3.10+ recommended)

Verify if python has been installed:
```
python --version
```

3. Build the site (Eleventy)
Technically, you do not need to build the site since the server serves the `_site` (build folder) from the root. However, you may install `npm` and `nodeJS` in your system and run `npm install` to setup workflow for contribution. 

(Eleventy is a static site generator, link: https://www.11ty.dev/)

Install `npm` and `nodeJS` using installer from NodeSource: https://downloads.nodesource.com/#windows

Then, run `npm install` at the root, this will fetch necessary packages listed in `package.json`.

Run
```
npm run serve // this build the site, and run on localhost 
// the development is configured to run on port :4000 (default is 8080)
```

or 

```
npx eleventy (this only builds the site)
```

4. Start the local server

Do not confuse this the development server (`npm run serve`) earlier even tho they run locally on your machine.

This small barebone Python server is built to run only `_site` and `control` folders only.

Run in your terminal:
```
python server.py # for debugging
```

For background mode (no terminal window):
```
pythonw server.py
```

5. Access the site

Open your browser and visit, `http://localhost:4000` to access the doc site.

`http://localhost:4000/control` is for a small control panel that you visit to stop the server. 

You cannot turn off the server in terminal if you startup the server with `pythonw` as it is running in the background silently. So stopping it from the endpoint is the only way. 

