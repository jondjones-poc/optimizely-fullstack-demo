import React from "react";
import Link from "next/link";

export default function TopHeader() {

    const navLinks =
        [
            {   name: "Home",
                path: "/"
            },
            {   name: "Latest Deals",
                path: "/landing"
            },
            {   name: "News",
                path: "/cms"
            },
            {   name: "Sign-up",
                path: "/signup"
            },
            {   name: "Code",
                path: "https://github.com/jondjones-poc/optimizely-fullstack-demo"
            }
        ];

    return (
        <header>
            <nav>
                <div className="topnav">
                    <div className="title">
                        Optimizely Fullstack Demo by JonDJones
                    </div>

                    {navLinks.map((link, index) => {
                        return (
                            <Link key={index} href={link.path}>
                                <a>{link.name}</a>
                            </Link>
                        );
                    })}

                </div>
            </nav>
        </header>
    );
}