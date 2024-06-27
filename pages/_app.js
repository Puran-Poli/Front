import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/context/auth";

// React Toastify
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AuthProvider>
  );
}

export default App;
