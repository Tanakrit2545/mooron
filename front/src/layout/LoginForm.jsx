import axios from 'axios'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // เพิ่ม useNavigate
import useAuth from '../hooks/useAuth'

export default function LoginForm() {
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate(); // สร้างตัวแปร navigate

  const hdlChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const hdlSubmit = async (e, url) => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post(`http://localhost:8889/auth/${url}`, input)
      console.log(rs.data.token)
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:8889/auth/me', {
        headers: { Authorization: `Bearer ${rs.data.token}` }
      })
      console.log(rs1.data)
      setUser(rs1.data)

    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="border border-solid border-gray-200 white bg-white rounded-md shadow-md w-full max-w-[350px] mx-auto mt-10 text-center p-8">
      <div className="text-3xl mb-5">MotoRent</div>
      <form className="flex flex-col gap-2" onSubmit={e => hdlSubmit(e, 'login')}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="username"
            value={input.username}
            onChange={hdlChange}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={input.password}
            onChange={hdlChange}
          />
        </label>

        <div className="flex justify-center">
          <button type="submit" className="btn bg-blue-400 text-blue rounded-[px] w-40">
            Login
          </button>
        </div>
      </form>
      <div className="mt-5">Don't have an account? <button className="text-blue-500" onClick={() => navigate('/register')}>Sing-in</button></div>
    </div>
  );
}