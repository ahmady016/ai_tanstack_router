import { createRoute } from "@tanstack/react-router"
import { VscCopy } from "react-icons/vsc"

import { rootRoute } from "./__root"

export const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: About,
})

function About() {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-blue-600">About</h2>
            <div className="mt-4 space-y-4 text-gray-600">
                <p>
                    This project demonstrates the implementation of TanStack Router in a React application.
                    TanStack Router is a modern routing solution that brings type-safety and excellent
                    developer experience to React applications.
                </p>
                <p>
                    Built with React, TypeScript, and Tailwind CSS, this application showcases best practices
                    in modern web development, including:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li className="flex justify-start items-center">
                        <VscCopy className="mr-2 text-lg" />
                        <span>Type-safe routing and route matching</span>
                    </li>
                    <li className="flex justify-start items-center">
                        <VscCopy className="mr-2 text-lg" />
                        <span>Nested layouts and routes</span>
                    </li>
                    <li className="flex justify-start items-center">
                        <VscCopy className="mr-2 text-lg" />
                        <span>Clean and maintainable code structure</span>
                    </li>
                    <li className="flex justify-start items-center">
                        <VscCopy className="mr-2 text-lg" />
                        <span>Responsive design with Tailwind CSS</span>
                    </li>
                    <li className="flex justify-start items-center">
                        <VscCopy className="mr-2 text-lg" />
                        <span>Developer tools for debugging and development</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default About
