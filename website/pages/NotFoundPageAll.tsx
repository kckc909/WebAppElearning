
import { LostIcon } from '../components/icons/icons';

export default function NotFoundPageAll() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
                <div className="text-center max-w-lg w-full">
                    <div className="mb-8">
                        <LostIcon className="w-48 h-48 mx-auto text-indigo-500" />
                    </div>
                    <h1 className="text-8xl md:text-9xl font-extrabold text-indigo-600 dark:text-indigo-500 tracking-wider">404</h1>
                    <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">Page not found</h2>
                    <a
                        href="/"
                        className="mt-8 inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                    >
                        Quay về trang chủ
                    </a>
                </div>
            </div>
        </>
    )
}