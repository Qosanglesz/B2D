import React from "react";
import 'tailwindcss/tailwind.css';


export default function FormLayout({children}: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}



