import React from "react";
import Link from "next/link";

export default function TopHeader() {

    const navLinks = [];
        // { name: "Render Feature Flag Status",
        //     path: "/"
        // }

    return (
        <header>
            <nav>
                <div className="topnav">
                    <div className="title">Optimizely Fullstack Javascript Examples</div>
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