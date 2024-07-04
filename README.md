# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Directories structure

`assets`: It contains light images.

`components`: Reusable elements in the application like headers, sidebars, modals, etc.

`hooks`: It contains generic hooks that can be used anywhere in the project like useLocalStorage and userActive.
They interact with React hooks like useState and useEffect.

`pages`: Pages may use several components and their main role is to display the interface to the user.

`services`: It contains clints HTTP settings, normally using axios, sockets.

`store`: It has state managers like context api, redux.

`types`: It has the typescript (types and interfaces) which are common in all the project.

`utils`: Useful Javascript functions like formatCurrency, formatPhone, convertTimezone.
