'use client'
import { useEffect, useState } from "react";
import axios from 'axios';
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {

  const router = useRouter();

  const [user, setUser] = useState({
    email:  "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push('/profile')
    } catch (error: any) {
      console.log("Login failed");
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length>0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1>{loading? "Processing": "Login"}</h1>
      <hr />
      <input 
      id="email"
      className="bg-white text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      value={user.email}
      onChange={(e) => setUser({...user, email:e.target.value})}
      type="email"
      placeholder="Email"/>
      <input 
      id="password"
      className="bg-white text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      value={user.password}
      onChange={(e) => setUser({...user, password:e.target.value})}
      type="password"
      placeholder="Password"/>
      <button onClick={onLogin} className="p-2 border border-gray-300
      rounded-lg mb-4 focus:outline-none focus:border-gray-600">
        {buttonDisabled?"No Login": "Login"}
      </button>
      <Link href="/signup">Signup</Link>
    </div>
  )
}