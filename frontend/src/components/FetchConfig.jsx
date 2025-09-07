import {useState} from "react";
import {configurationAPI} from "../services/api";

const FetchConfig = () => {
  const [configId, setConfigId] = useState("");
  const [gridData, setGridData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!configId.trim()) {
      setError("Please enter a configuration ID");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await configurationAPI.getConfiguration(configId);
      setGridData(response.data);
      setSuccessMessage(
        `✅ Configuration "${configId}" has been successfully retrieved!`
      );
    } catch (err) {
      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to fetch configuration";
      setError(backendMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-white flex items-center">
            📥 Fetch Configuration
          </h1>
          <p className="text-blue-100 mt-2">
            Retrieve configuration data by ID
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Configuration ID
              </label>
              <input
                type="text"
                value={configId}
                onChange={(e) => {
                  setConfigId(e.target.value);
                  // Clear previous messages and data when input changes
                  setError("");
                  setSuccessMessage("");
                  setGridData(null);
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                placeholder="Enter configuration ID (e.g., qwertyuiop)"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 cursor-pointer transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span>Fetch Configuration</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6">
              <div className="flex items-center">
                <span className="text-red-400 text-xl mr-3">⚠️</span>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mb-6">
              <div className="flex items-center">
                <p className="text-green-700 font-medium">{successMessage}</p>
              </div>
            </div>
          )}

          {gridData && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">📊</span>
                <h2 className="text-2xl font-bold text-gray-800">
                  Configuration Data
                </h2>
              </div>
              <div className="space-y-3">
                {gridData.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex space-x-3">
                    {row.map((cell, cellIndex) => (
                      <div
                        key={cellIndex}
                        className="bg-white border-2 border-gray-200 px-6 py-4 rounded-lg min-w-[100px] text-center font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchConfig;
