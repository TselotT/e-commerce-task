"use client";

import { Inter } from "next/font/google";
import "./globals.css";
//
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { store } from "./redux/store";
//
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html>
      <Provider store={store}>
        <body>
          <Header />

          {children}

          <Footer />
        </body>
      </Provider>
    </html>
  );
}
