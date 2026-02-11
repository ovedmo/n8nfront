import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import ChatInterface from '@/components/ChatInterface'
import Link from 'next/link'

export default async function ChatPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b p-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AI Chat</h1>
        <div className="flex gap-4 items-center">
             <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">Dashboard</Link>
             <div className="h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
             <span className="text-sm text-gray-500">{session.user?.name || session.user?.email}</span>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4 flex flex-col max-w-4xl">
        <ChatInterface />
      </main>
    </div>
  )
}
