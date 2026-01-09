"use client";

import PrimaryTemplate from "../components/PrimaryTemplate.jsx";

export default function RootPage()
{
    return (
        <PrimaryTemplate
            headerPostAddition={
                <>
                    <p><b>Page Under Construction</b></p>
                    <p id="last-update-date">Loading last update timestamp...</p>
                    <script src="/scripts/lastUpdateTimestamp.js"></script>
                    <section>
                        <p>My other projects: <a href="https://github.com/Josiah-Cooksey/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Github</a></p>
                        <p>My experience: <a href="https://www.linkedin.com/in/josiah-cooksey/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">LinkedIn</a></p>
                    </section>
                </>
            }
        >
            <head>
                <title>Josiah Cooksey - Full Stack Software Developer</title>
                <link rel="canonical" href="https://jcooksey.dev/" />
                <meta name="description" content="Portfolio website of Josiah Cooksey, showcasing software projects, experience, and possibly blog posts." />
            </head>
            <div className="flex flex-col md:flex-row">
                <section className="px-1">
                    <div className="my-2 rounded-2xl shadow-xl bg-slate-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        <p className="text-xl text-center font-bold">About Me</p>
                    </div>
                    <div className="w-[320px] rounded-2xl shadow-xl flex flex-wrap flex-shrink-0 mx-auto bg-slate-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        <img className="object-cover w-[128px] h-[128px] rounded-full bg-white m-3" src="./media/landing-page/dithered.png" alt="headshot of Josiah Cooksey with a dithered filter applied" />{/* may want to add style="image-rendering: pixelated;" but I think that it looks fine with the default interpolation */}
                        <div className="py-3 flex flex-col max-w-xl">
                            <div className="m-1 flex items-center gap-2">
                                <img className="object-cover object-top bg-slate-300 rounded-md w-8 h-8 px-1" src="./media/coding-icons/java.svg" alt="Java programming language icon" />
                                <p className="text-md font-semibold">Java</p>
                            </div>
                            <div className="m-1 flex items-center gap-2">
                                <img className="object-cover object-top bg-slate-300 rounded-md w-8 h-8 px-1" src="./media/coding-icons/python.svg" alt="Python programming language icon" />
                                <p className="text-md font-semibold">Python</p>
                            </div>
                            <div className="m-1 flex items-center gap-2">
                                <img className="object-cover object-top bg-slate-300 rounded-md w-8 h-8 px-1" src="./media/coding-icons/spring-boot.svg" alt="Spring Boot programming framework icon" />
                                <p className="text-md font-semibold">Spring Boot</p>
                            </div>
                            <div className="m-1 flex items-center gap-2">
                                <img className="object-cover object-top bg-slate-300 rounded-md w-8 h-8" src="./media/coding-icons/aws.svg" alt="Amazon Web Services logo" />
                                <p className="text-md font-semibold">AWS</p>
                            </div>
                            <div className="m-1 flex items-center gap-2">
                                <img className="object-cover object-top bg-slate-300 rounded-md w-8 h-8 px-1" src="./media/coding-icons/mysql.svg" alt="MySQL dolphin logo" />
                                <p className="text-md font-semibold">MySQL</p>
                            </div>
                            <div className="m-1 flex items-center gap-2">
                                <img className="object-cover object-top bg-slate-300 rounded-md w-8 h-8 px-1" src="./media/coding-icons/hibernate.svg" alt="Hibernate icon" />
                                <p className="text-md font-semibold">Hibernate</p>
                            </div>
                        </div>
                        <div className="p-2 m-2">
                            <h3 className="text-xl font-bold">Josiah Cooksey</h3>
                            <p className="text-gray-500 text-sm mb-2">Illinois, United States of America</p>
                            <p className="text-gray-500 text-sm">Software developer who enjoys the algorithmic, puzzle-solving side of programming.</p>
                            <br />
                            <ul className="text-sm list-disc m-1">
                                <li>B.Sc. in Computer Science (completed in 6 months)</li>
                                <li>Full-stack development with Java, Spring Boot, & Angular</li>
                                <li>Python automation experience</li>
                                <li>Enjoys playing the piano</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section id="projects" className="w-full px-1">
                    <div className="my-2 rounded-2xl shadow-xl bg-slate-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        <p className="text-xl text-center font-bold">Select Projects</p>
                    </div>

                    <div className="flex flex-wrap justify-center justify-evenly gap-y-3">
                        <div className="mx-auto rounded-2xl shadow-xl w-[320px] flex flex-wrap bg-slate-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                            <a href="./demos/ditherer" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                <div className="flex items-center mx-3 my-2">
                                    <h2 className="text-sm">Live Demo</h2>
                                    <div className="mx-1"></div>
                                    <img className="object-cover object-top bg-slate-300 rounded-md w-5 h-5" src="./media/coding-icons/launch.svg" alt="Launch icon" />
                                </div>
                            </a>
                            <div className="mx-auto"></div>
                            <a href="https://github.com/Josiah-Cooksey/multi-modal-ditherer" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                <div className="flex items-center mx-3 my-2">
                                    <h2 className="text-sm">Source Code</h2>
                                    <div className="mx-1"></div>
                                    <img className="object-cover object-top bg-slate-300 rounded-md w-5 h-5" src="./media/coding-icons/launch.svg" alt="External link icon" />
                                </div>
                            </a>
                            <div className="mx-auto">
                                <h3 className="text-xl">Multi-colour Ditherer</h3>
                            </div>
                            <div className="p-2 mx-auto inline-grid grid-cols-5 gap-2 max-w-xl bg-gray-400 dark:bg-gray-900 rounded-md">
                                <img className="object-cover object-top bg-slate-300 rounded-md w-8 h-8 px-1" src="./media/coding-icons/java.svg" alt="Java programming language icon" />
                                <img className="object-cover object-top bg-slate-300 rounded-md w-8 h-8" src="./media/coding-icons/aws.svg" alt="Amazon Web Services logo" />
                            </div>
                            <div className="p-2 m-2 mx-auto">
                                <p className="text-sm text-center">Renders images with only a few colours</p>
                                <p className="text-sm text-center">Supports custom input images and palettes</p>
                            </div>
                            <div className="p-2 m-2 mx-auto flex">
                                <img className="w-[134px] h-[123px]" src="./demos/ditherer/media/example-results/blurry apple.png" alt="A low resolution image of a red, ripe apple" />
                                <p className="text-xl text-bold my-auto mx-1">➝</p>
                                <img className="w-[134px] h-[123px]" src="./demos/ditherer/media/example-results/blurry apple dithered.png" alt="A low resolution image of a red, ripe apple that has had dithering applied to it" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PrimaryTemplate>
    );
}