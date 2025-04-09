const Navbar = ({
    title = "guess that 'mon",
    links = [
        { name: "play", href: "/play" },
        { name: "collection", href: "/collection" },
    ],
    }) => {
    return (
        <nav className="flex items-center justify-between p-4">

            <div className="font-semibold text-sm">
                <h1 className= "text-xl font-bold">{title}</h1>
            </div>

            <div className="flex items-center">
                <ul className="flex justify-center gap-x-10 bg-gray-100 rounded-full p-3 w-60">
                {links.map((link) => (
                    <li key={link.name}>
                    <a
                        href={link.href}
                        className="text-gray-300 hover:text-white"
                    >
                        {link.name}
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            <button className=" rounded-full flex items-center justify-center text-gray-400">
            github icon tbd
            </button>

        </nav>
    )
};

export default Navbar;