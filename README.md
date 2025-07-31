# Project Readme

## Web-App

### Description
Is the part responsible to generate the front end  

```
Source: /web-admin
```

### Instalation
1. Acess the project folder:

```
cd ./web-admin
```

2. Install the dependencies:

       npm i

3. Alter the proxi to target your API
```
Source: /web-admin/vite.config.js ->
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  [...]
  server: {
    host: "0.0.0.0", //Acesso externo
    port: 5173,
    proxy: {
      "/api/v1": {
        target: "Your API here",
        changeOrigin: false,
        secure: false,
      }
    }
  }
  [...]
})
```

4. Execute the project:

```
#### Inside web-admin project's Folder
  npm run dev
```

5. To generate Build, execute:
```
###inside web-admin folder
  npm run build
```

### Dependencies
```
"@fontsource/roboto": "^5.2.6",
"@headlessui/react": "^2.2.4",
"@heroicons/react": "^2.2.0",
"@tailwindcss/vite": "^4.1.11",
"axios": "^1.10.0",
"moment": "^2.30.1",
"primeicons": "^7.0.0",
"primereact": "^10.9.6",
"react": "^19.1.0",
"react-dom": "^19.1.0",
"react-hook-form": "^7.59.0",
"react-router-dom": "^7.6.3",
"react-webcam": "^7.2.0",
"tailwindcss": "^4.1.11"
```

### Project's structure

```
...
├── src/
│   ├── API/ -> API connection with Axios
│   ├── assets/ -> Project stilization
│   ├── components/ -> Components t ouse inside project
│   ├── context/ -> Application's context
│   └── middleware/ -> Application's middleware
|   └── pages/ -> Application Pages
|   └── service/ -> Services responsible to consume API

```
