'use client'

export default function page({params}: any) {
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1>Profile page</h1>
      <h2>{params.id}</h2>
    </div>
  )
}