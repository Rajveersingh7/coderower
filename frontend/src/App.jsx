import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import FetchConfig from "./components/FetchConfig";
import UpdateConfig from "./components/UpdateConfig";

function Navigation() {
  const location = useLocation(); // gives current URL path

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex justify-center h-16 items-center space-x-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 mr-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CR</span>
          </div>
          <span className="text-xl font-bold text-gray-800">CodeRower</span>
        </div>

        {/* Links */}
        <Link
          to="/"
          className={`px-4 py-2 font-medium rounded-md transition-all duration-100 border-none ${
            location.pathname === "/"
              ? "text-blue-600 bg-blue-100 border border-blue-200"
              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          }`}
        >
          📥 Fetch Configuration
        </Link>

        <Link
          to="/update"
          className={`px-4 py-2 font-medium rounded-md transition-all duration-100 border-none ${
            location.pathname === "/update"
              ? "text-blue-600 bg-blue-100 border border-blue-200"
              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          }`}
        >
          ✏️ Update Configuration
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        <main className="py-12">
          <Routes>
            <Route path="/" element={<FetchConfig />} />
            <Route path="/update" element={<UpdateConfig />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
