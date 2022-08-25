import React from "react";
import Link from "next/link";

export default function TopHeader() {

    const navLinks =
        [
            {   name: "Personalisation",
                path: "/landing"
            },
            {   name: "CMS",
                path: "/cms"
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