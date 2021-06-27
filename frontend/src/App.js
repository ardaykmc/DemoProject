import React, { Component } from 'react';
import './App.css';
import StudentManagement from './component/StudentManagement';

class App extends Component {
  render() {
    return (
      <div className="container">
        <StudentManagement />
      </div>
    );
  }
}

export default App;
