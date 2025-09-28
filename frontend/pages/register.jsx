import React from 'react'
import { useState } from 'react'

const register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username || !email || !password){
            alert("Please fill all the fields");
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            localStorage.setItem('token', data.userId);
            if (response.ok) {
                console.log('Registration successful:', data);
            }
            else {
                console.error('Registration failed:', data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };


  return (
    <div className="container mx-auto mt-20">
      <div className="card shadow-lg p-5">
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="btn btn-primary w-full mt-3 hover:bg-blue-700"
            >
                Register
            </button>
        </form>
      </div>
    </div>

  )
}

export default register