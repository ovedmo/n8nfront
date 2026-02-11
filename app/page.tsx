import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {session.user?.name || 'User'}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/chat">
          <Card className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer h-full">
            <CardHeader>
              <CardTitle>Chat with Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Ask questions and get answers from your uploaded documents.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/documents">
          <Card className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer h-full">
            <CardHeader>
              <CardTitle>Manage Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Upload new PDF, text, or markdown files to the knowledge base.</p>
            </CardContent>
          </Card>
        </Link>
        
        {/* @ts-ignore */}
        {session.user?.role === 'admin' && (
           <Link href="/admin/users">
            <Card className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer h-full border-blue-200 dark:border-blue-900">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Create and manage system users.</p>
              </CardContent>
            </Card>
          </Link>
        )}
      </div>
    </div>
  )
}
