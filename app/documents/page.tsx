import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import DocumentUpload from '@/components/DocumentUpload'
import Link from 'next/link'

export default async function DocumentsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
       <header className="bg-white dark:bg-gray-900 border-b p-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold">Document Management</h1>
        <div className="flex gap-4 items-center">
             <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">Dashboard</Link>
             <div className="h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
             <span className="text-sm text-gray-500">{session.user?.name || session.user?.email}</span>
        </div>
      </header>
      <main className="container mx-auto p-8">
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Upload New Document</h2>
                <p className="text-gray-500">Upload PDF, text, or markdown files to add them to your knowledge base.</p>
            </div>
            <DocumentUpload />
        </div>
      </main>
    </div>
  )
}
