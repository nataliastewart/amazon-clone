# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
To be able to use STRIPE with Firebase - You need to update your Firebase plan into BLAZE.

steps:

1. npm i @stripe/stripe-js
2. npm i @stripe/react-stripe-js

Backend:
cd functions(folder)

1. firebase emulators:start
2. to deploy: firebase deploy --only functions

firebase.json:

// firebase.json

// before: (it may not look exactly the same depending on which CLI you were
// using when you ran "firebase init"
"predeploy": [
"npm --prefix \"$RESOURCE_DIR\" run lint"
]

// after: (for PowerShell)
"predeploy": [
"npm --prefix $Env:RESOURCE_DIR run lint"
]

// after: (for Cmd.exe)
"predeploy": [
"npm --prefix %RESOURCE_DIR% run lint"
]

or

"functions": {
"predeploy": [
"npm --prefix functions run lint",
"npm --prefix functions run build"
]
},

Debugged-> What really worked for me:
"functions": {
"predeploy": ["npm --prefix $Env:RESOURCE_DIR run lint"]
}

---

deploying front-end:
`firebase deploy --only hosting`

DEPLOYED APP:
https://clone-d3b78.web.app/
