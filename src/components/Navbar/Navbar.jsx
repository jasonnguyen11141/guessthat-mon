import { Link, useLocation } from "react-router-dom";

const Navbar = ({
  title = "guess that 'mon",
  links = [
    { name: "play", href: "/play" },
    { name: "collection", href: "/collection" },
  ],
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="flex items-center justify-between h-20 relative">
      {/* guess that 'mon title */}
      <div className="flex-1">
        <h1 className="text-4xl whitespace-nowrap font-medium">{title}</h1>
      </div>

      {/* center nav bar */}
      <div className="flex justify-center flex-1">
        <ul className="flex gap-x-15 bg-gray-100 rounded-full px-15 py-2">
          {links.map((link) => {
            const isActive = currentPath === link.href;

            return (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className={`whitespace-nowrap ${
                    isActive
                      ? "text-black font-semibold"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* github icon link (to be inserted) */}
      <div className="flex-1 flex justify-end">
        <button className="text-gray-400 whitespace-nowrap">github link</button>
      </div>
    </nav>
  );
};

export default Navbar;
