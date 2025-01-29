import {createRoot} from "react-dom/client";
import App from './App.tsx'
import {StrictMode} from "react";
import {ToastContainer} from "react-toastify";
import {Flip} from "react-toastify";
import {Provider} from "react-redux";
import store from "@/store";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Flip}
      />
  </StrictMode>,
)
