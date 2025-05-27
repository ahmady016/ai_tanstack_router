import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { GoLog } from "react-icons/go"

export const rootRoute = createRootRoute({
    component: AppRoot,
})

function AppRoot() {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">
                        <GoLog className="inline-block mr-2" />
                        AI TanStack Router
                    </h1>
                    <div className="space-x-4">
                        <Link
                            to="/"
                            className="text-gray-500 hover:text-gray-700 transition-colors [&.active]:text-gray-900 [&.active]:font-bold"
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-500 hover:text-gray-700 transition-colors [&.active]:text-gray-900 [&.active]:font-bold"
                        >
                            About
                        </Link>
                        <Link
                            to="/posts"
                            className="text-gray-500 hover:text-gray-700 transition-colors [&.active]:text-gray-900 [&.active]:font-bold"
                        >
                            Posts
                        </Link>
                    </div>
                </div>
            </nav>
            <main className="h-lvh container mx-auto p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default AppRoot
