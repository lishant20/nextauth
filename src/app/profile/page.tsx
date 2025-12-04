'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {toast} from "react-hot-toast";


export default function Profile() {

  const router = useRouter();
  const [data,setData] = useState("nothing")

  const getUserDetails = async() => {
    const res = await axios.post("/api/users/profile")
    setData(res.data.data._id)
  }

  const logout = async() => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout succes");
      router.push("/login")
    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1>Profile page</h1>
      <h2>{data === "nothing"? "No data":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button className="bg-blue-500 py-2 px-4 text-white rounded" onClick={logout}>Logout</button>
      <button className="bg-red-500 py-2 px-4 text-white rounded" onClick={logout}>Get user details</button>
    </div>
  )
}