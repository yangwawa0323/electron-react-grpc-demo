# Electron react grpc demo

This project based on **ERB** `Electron React Boilerplate`.

## start the project

```
$ npm install
$ npm run start
```



> Attention: electron bot support react-router-dom `BrowserRouter`. The mainWindow will not show anything expect the background-color.
> **This waste my whole day for debug. **

```javascript

- import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

+ import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
```
