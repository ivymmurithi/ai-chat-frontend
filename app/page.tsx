'use client'

import { useState } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState<string>('')
  const [backendResponse, setbackendResponse] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const submitData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({prompt: prompt})
      });

      if (response.ok) {
        const data = await response.json()
        setbackendResponse(data.choices[0].message.content)
      } else {
        setbackendResponse('Failed to fetch data from backend')
      }
    } catch (error) {
      console.error('Error:', error)
      setbackendResponse('Could not submit')
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 text-white font-sans">
        <header className="text-center py-10">
          <h1 className="text-5xl font-extrabold tracking-wide text-white drop-shadow-md">
            Ask<span className="text-blue-400">Bot</span>
          </h1>
        </header>
        <main className="flex flex-col items-center justify-center px-4">
          <input
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full max-w-md p-4 rounded-xl text-gray-900 placeholder-gray-500 bg-white shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg mb-4"
          />
          <button
            onClick={submitData}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
          {loading && (
            <div className="mt-6">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-400 border-t-transparent"></div>
            </div>
          )}
          {backendResponse && !loading && (
            <div className="w-full max-w-2xl bg-white text-black rounded-xl p-6 shadow-lg mt-8 whitespace-pre-wrap">
              {backendResponse.replace(/\*\*/g, '')}
            </div>
          )}
        </main>
      </div>
    </>


  )
}
