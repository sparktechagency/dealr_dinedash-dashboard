import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-9xl font-extrabold tracking-wider text-red-500 drop-shadow-lg">
          404
        </h1>
        <p className="text-2xl mt-4 mb-2 font-semibold">Oops! Page not found</p>
        <p className="text-gray-300 mb-6">
          The page you’re looking for doesn’t exist. Maybe it took a coffee
          break ☕.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition duration-300 shadow-lg"
        >
          ⬅ Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Error;
