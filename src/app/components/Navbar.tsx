"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import UserMenu from "./UserMenu";

export default function Navbar() {
    const { data: session, status } = useSession();
    const links = [
        { name: "Início", href: "/" },
        { name: "Explorar", href: "/explore" },
        { name: "Perfis", href: "/profiles" },
    ];

    return (
        <>
            <nav className="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        <Link href="/" className="">
                            <motion.div className="flex items-center text-black font-bold text-xl">
                                <Image src="/sonare_black.svg" alt="logo" width="32" height="32" />
                                <span className="brand-name"></span>
                            </motion.div>
                        </Link>

                        <div className="hidden md:flex space-x-8">
                            {links.map((link) => (
                                <Link key={link.name} href={link.href}>
                                    <motion.span
                                        whileHover={{ scale: 1, color: "var(--cyntilant-red)" }}
                                        className="text-black cursor-pointer font-bold outline-none hover:underline"
                                    >
                                        {link.name}
                                    </motion.span>
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">
                            {status === "authenticated" ? (
                                <UserMenu/>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "var(--spotify-green)" }}
                                    onClick={() => signIn("spotify")}
                                    className="bg-white flex space-x-2 text-black px-2 py-2 text-sm rounded-md font-medium"
                                >
                                    <img
                                        src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/spotify.svg"
                                        alt="Spotify Logo"
                                        width={24}
                                        height={24}
                                    />
                                    <span className="font-bold">Login com Spotify</span>
                                </motion.button>
                            )}
                        </div>

                    </div>
                </div>
            </nav>

            <motion.div
                whileHover={{
                    scale: 1,
                    color: "var(--cyntilant-red)",
                    outline: "2px solid var(--brand-primary)",
                    outlineOffset: "2px"
                }}
                className="fixed top-16 w-full bg-black text-white text-center py-1 z-40">
                <Link href="#" className="font-bold text-md">
                    Listen <span className="brand-name"></span>
                </Link>
            </motion.div>
        </>
    );
}