import React from 'react'

export default function HomeLayout({children}: LayoutProps) {
    return (
        <div id="site-layout">
            <section id="main-content">
                <h1>layout</h1>
                {children}
                <h1>layout-2</h1>
            </section>
        </div>
    )
}

interface LayoutProps {
    children: React.ReactNode
}