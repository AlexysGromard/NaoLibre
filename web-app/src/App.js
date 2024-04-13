// Import necessary libraries
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// Import components
import Header from './components/Header';
import Footer from './components/Footer';
// Import pages
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transport from './pages/Transport';
import SelectLine from "./pages/SelectLine";
import SelectClutter from "./pages/SelectClutter";


// Import styles
import './style/colors.css';
import './style/general.css';

/**
 * App component
 * This component is the main component of the application
 */
function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/transport/:line/:direction/:stop' element={<TransportWithArgument />} />
            <Route path='/transport/:stop' element={<SelectLineWthArgument />} />
            <Route path='/notice/:clutter' element={<SelectLineClutter />} />
            <Route path='*' element={<div>404 Not Found</div>} />
          </Routes>
        </main>
        <FooterWithLocation />
      </div>
    </BrowserRouter>
  );
}

//            <Route path="/search/:argument" element={<SearchWithArgument />} />

/**
 * FooterWithLocation component
 * This component is used to pass the location to the Footer component
 */
function FooterWithLocation(props) {
  const location = useLocation();
  return <Footer {...props} location={location} />;
}

/**
 * SearchWithArgument component
 * This component is used to pass the argument to the Search component
 */
function SearchWithArgument() {
  const argument = useLocation().pathname.split('/').pop();
  return <Search {...argument} argument={argument} />;
}

/**
 * TransportWithArgument component
 * This component is used to pass the argument to the Transport component
 */
function TransportWithArgument() {
  const argument = useLocation().pathname.split('/').slice(2, 5);
  return <Transport {...argument} argument={argument} />;
}
function SelectLineWthArgument() {
  const argument = useLocation().pathname.split('/').slice(2, 3);
  return <SelectLine {...argument} argument={argument} />;
}

function SelectLineClutter() {
  const argument = useLocation().pathname.split('/').slice(2, 3);
  return <SelectClutter {...argument} argument={argument} />;
}

export default App;
