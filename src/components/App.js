import React from 'react';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import OnlineCompiler from './OnlineCompiler';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <div className='main-body'>
        <Header />
        <OnlineCompiler />
        <Footer />
      </div>
    );
  }
}

export default App;
