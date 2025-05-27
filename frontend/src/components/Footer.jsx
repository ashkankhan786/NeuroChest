import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-black/80 border-t border-green-800 mt-1 py-8 px-6 text-sm text-gray-400">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href="https://github.com/ashkankhan786/NeuroChest-Frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-white transition"
        >
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.6-1.2-1.6-1-.6.1-.6.1-.6 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.7.8 2.1 1.3.1-1 .4-1.5.8-1.9-2.7-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.6-1.5.1-3.1 0 0 1.1-.3 3.4 1.2a11.6 11.6 0 016.2 0C17 6 18 6.4 18 6.4c.7 1.6.2 2.8.1 3.1.7.9 1.2 2 1.2 3.2 0 4.5-2.7 5.5-5.4 5.8.4.4.8 1 .8 2v3c0 .3.2.7.8.6A11.5 11.5 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
          </svg>
          View on GitHub
        </a>
        <div className="text-center sm:text-right text-gray-400">
          <p className="mb-1">
            Contact:{" "}
            <a
              href="mailto:ashkankhan728@gmail.com"
              className="text-green-300 hover:underline"
            >
              ashkankhan728@gmail.com
            </a>
          </p>
          <p>&copy; 2025 NeuroChest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
