import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./__root"
import { SlNote } from "react-icons/sl"

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Index,
})

function Index() {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-blue-600">Welcome to AI TanStack Router</h2>
            <p className="mt-4 text-gray-600">
                This is a demo application showcasing the power of TanStack Router with React and TypeScript.
                Built with modern tools and best practices for a seamless development experience.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-800">Features</h3>
                <ul className="mt-2 space-y-2 text-blue-700">
                    <li className="flex justify-start items-center">
                        <SlNote className="mr-2 text-md" />
                        <span>Type-safe routing with TanStack Router</span>
                    </li>
                    <li className="flex justify-start items-center">
                        <SlNote className="mr-2 text-md" />
                        <span>Modern UI with Tailwind CSS</span>
                    </li>
                    <li className="flex justify-start items-center">
                        <SlNote className="mr-2 text-md" />
                        <span>Full TypeScript support</span>
                    </li>
                    <li className="flex justify-start items-center">
                        <SlNote className="mr-2 text-md" />
                        <span>Development tools for debugging</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Index
