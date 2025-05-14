import '@/styles/globals.css'
import Script from 'next/script'

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <Script
            src="/js/jquery.min.js"
            strategy="beforeInteractive"
        />
        <Script
            src="/js/breakpoints.min.js"
            strategy="beforeInteractive"
        />
        <Script
            src="/js/browser.min.js"
            strategy="beforeInteractive"
        />
        <Script
            src="/js/jquery.scrollex.min.js"
            strategy="beforeInteractive"
        />
        <Script
            src="/js/jquery.scrolly.min.js"
            strategy="beforeInteractive"
        />
        <Script
            src="/js/util.js"
            strategy="beforeInteractive"
        />



        {children}
        </body>
        </html>
    )
}
