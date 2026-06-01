import React from "react";

const Nav = () => {
    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-lg font-bold">MyApp</div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/" className="hover:text-gray-200">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/about" className="hover:text-gray-200">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="/contact" className="hover:text-gray-200">
                            Contact
                        </a>
                    </li>
                    <li>
                        <a href="/crud" className="hover:text-gray-200">
                            CRUD
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;