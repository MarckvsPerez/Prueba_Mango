const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Mango's technical test</div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="/exercise1" className="hover:text-gray-300">
              Exercise 1
            </a>
          </li>
          <li>
            <a href="/exercise2" className="hover:text-gray-300">
              Exercise 2
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
