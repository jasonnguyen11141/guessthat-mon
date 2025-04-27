import { Link, useLocation } from "react-router-dom";
import InventoryIcon from '@mui/icons-material/Inventory';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import GitHubIcon from '@mui/icons-material/GitHub';

const Navbar = ({
  title = "guess that 'mon",
  links = [
    { name: "play", href: "/play", icon: <CatchingPokemonIcon /> },
    { name: "collection", href: "/collection", icon: <InventoryIcon /> },
  ],
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="flex items-center h-20 relative">
      {/* guess that 'mon title + icon */}
      <div className="flex items-center gap-x-2 basis-1/4">
      <h1 className="text-4xl whitespace-nowrap font-medium text-pink-100">{title}</h1>
      <img
          src="/sparkles.png"
          alt="guess that 'mon logo"
          className="ml-2 w-10 h-auto"
        />
      </div>

      {/* center nav bar */}
      <div className="flex justify-center basis-1/2">
        <ul className="flex gap-x-15 bg-zinc-600 rounded-full px-15 py-2">
          {links.map((link) => {
            const isActive = currentPath === link.href;

            return (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className={`flex items-center gap-2 whitespace-nowrap transition-colors duration-300 ease-in-out ${
                    isActive
                      ? "text-pink-100 font-semibold"
                      : "text-zinc-300 hover:text-blue-200"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* github icon */}
      <div className="flex-1 flex justify-end basis-1/4 pr-30">
        <a 
        href="https://github.com/jasonnguyen11141/guessthat-mon"
        title="our github repo!">
          <GitHubIcon
            className="text-pink-100 hover:text-blue-200 transition-colors duration-300 ease-in-out"
            style={{ fontSize: "2.5rem" }}
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
