import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import useTheme from "./hooks/useTheme";
import { AnimatePresence, motion } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/cart"
          element={
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Cart />
            </motion.div>
          }
        />
        <Route
          path="/checkout"
          element={
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Checkout />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function AppContainer() {
  const [theme, setTheme] = useTheme();

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-300`}>
      <Header theme={theme} setTheme={setTheme} />
      <main className="container mx-auto px-4 py-6">
        <AnimatedRoutes />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContainer />
    </Router>
  );
}
