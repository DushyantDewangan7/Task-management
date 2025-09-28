import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username || !password){
            alert("Please fill all the fields");
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            localStorage.setItem('token', data.userId);
            if (response.ok) {
                console.log('Login successful:', data);
                navigate('/task');
            }
            else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

  return (
    <div className="container mx-auto mt-20">
      <div className="card shadow-lg p-5">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="username" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-3 hover:bg-blue-700"
          >
            Login
          </button>
          <Link to="/register" className="text-blue-500 hover:underline mt-3 block text-center">
            Don't have an account? Register
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login;
