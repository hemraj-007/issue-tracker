import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const links = [
        { name: 'Dashboard', href: '/' },
        { name: 'Issues', href: '/issues' },
        { name: 'About Us', href: '/about' }, // Example additional link
    ];

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo Section */}
                <div className="text-2xl font-bold">
                    <Link href="/" className="hover:text-gray-300 transition duration-300">
                        Logo
                    </Link>
                </div>

                {/* Navigation Links - Render Links using map */}
                <ul className="flex space-x-6">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href} className="hover:text-gray-300 transition duration-300">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Call-to-Action Button */}
                <div>
                    <Link href="/contact" className="bg-white text-blue-600 py-2 px-4 rounded-full hover:bg-gray-200 transition duration-300">
                        Contact Us
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
