import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "", 
    last_name: "", 
    address: "",
    phone: ""
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      const rs = await axios.post("http://localhost:8889/auth/register", input);
      console.log(rs);
      if (rs.status === 200) {
        alert("Register Successful");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="border border-solid border-Gray White bg-white rounded-md shadow-md w-full max-w-[800px] mx-auto mt-10 text-center p-8 ">
      <div className="text-4xl mb-5 text-center font-bold">Sing-in</div>
      <form className="flex flex-col gap-10 mt-16" onSubmit={hdlSubmit}>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-left">
              <span className="text-gray-800 Font">first_name</span> {/* แก้ข้อความจาก "name" เป็น "First Name" */}
              <input
                type="text"
                className="form-input mt-1 block w-full h-10 border rounded-md"
                name="first_name"
                value={input.first_name}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="w-1/2 ">
            <label className="block text-left">
              <span className="text-gray-800 Font">last_name</span> {/* แก้ข้อความจาก "last-name" เป็น "Last Name" */}
              <input
                type="text"
                className="form-input mt-1 block w-full border rounded-md h-12"
                name="last_name"
                value={input.last_name}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-left">
              <span className="text-gray-800 Font">Email</span> {/* เพิ่ม input field สำหรับอีเมล */}
              <input
                type="email"
                className="form-input mt-1 block w-full border rounded-md h-12"
                name="email"
                value={input.email}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="w-1/2">
            <label className="block text-left">
              <span className="text-gray-800 Font">Phone</span>
              <input
                type="text"
                className="form-input mt-1 block w-full border rounded-md h-12"
                name="phone"
                value={input.phone}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-left">
              <span className="text-gray-800 Font">Address</span>
              <input
                type="text"
                className="form-input mt-1 block w-full border rounded-md h-12"
                name="address"
                value={input.address}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="w-1/2">
            <label className="block text-left">
              <span className="text-gray-800 Font">Username</span>
              <input
                type="text"
                className="form-input mt-1 block w-full border rounded-md h-12"
                name="username"
                value={input.username}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="w-1/2">
            <label className="block text-left">
              <span className="text-gray-800 Font">Password</span>
              <input
                type="password"
                className="form-input mt-1 block w-full border rounded-md h-12"
                name="password"
                value={input.password}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <div className="tn btn-outline btn-info mt-7 ">
          <button
            type="submit"
            className="btn bg-blue-500 text-blue rounded-[30px] Font w-40"
          >
            Sign-up {/* แก้ข้อความจาก "Sing-in" เป็น "Sign-up" */}
          </button>
        </div>
      </form>
    </div>
  );
}