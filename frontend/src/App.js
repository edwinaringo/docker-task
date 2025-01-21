import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddTask from './components/AddTask';
import Categories from './components/Categories';
import Login from './components/Login';
import Register from './components/Register';
import EditTask from './components/EditTask';
import TodaysTasks from './components/TodaysTasks';
import CompletedTasks from './components/CompletedTasks';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          
          <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/add-task" element={<MainLayout><AddTask /></MainLayout>} />
          <Route path="/add-category" element={<MainLayout><Categories /></MainLayout>} />
          <Route path="/edit-task/:id" element={<MainLayout><EditTask /></MainLayout>} />
          <Route path="/todays-tasks" element={<MainLayout><TodaysTasks /></MainLayout>} />
          <Route path="/completed-tasks" element={<MainLayout><CompletedTasks /></MainLayout>} />

          {/* Default Route */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
