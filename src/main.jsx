// import React from "react"
// import ReactDOM from "react-dom/client"
// import { BrowserRouter } from "react-router-dom"
// import App from "./App"
// import "./index.css"
// import { AuthProvider } from "./contexts/AuthContext"

// const root = ReactDOM.createRoot(document.getElementById("root"))
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <App />
//       </AuthProvider>

//     </BrowserRouter>
//   </React.StrictMode>,
// )


import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import App from "./App"
import "./index.css"
import { persistor, store } from "./store/store"
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)