export default function Layout({ children, headerPostAddition })
{
    return (
        <html lang="en" className="dark" id="html">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />

                <script src="https://cdn.tailwindcss.com"></script>
                <script src="/scripts/darkModeDefault.js"></script>
            </head>
            <body className="p-2 bg-gray-400 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
                <header>
                    <button id="darkModeToggle" className="bg-blue-500 m-2 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded-full">Toggle Dark Mode</button>
                    { headerPostAddition }
                </header>
                <main>{ children }</main>
                <script src="/scripts/darkModeToggler.js?v=202512202151"></script>
            </body>
        </html>
    );
}