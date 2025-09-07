import {useState} from "react";
import {configurationAPI} from "../services/api";

const UpdateConfig = () => {
  const [configId, setConfigId] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!configId.trim() || !remark.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await configurationAPI.updateRemark(configId, remark);
      setMessage(
        `✅ Remark for configuration "${configId}" has been successfully updated!`
      );
      setRemark("");
    } catch (err) {
      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to update remark";
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
            ✏️ Update Configuration Remark
          </h1>
          <p className="text-purple-100 mt-2">
            Add or modify remarks for configurations
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Configuration ID
              </label>
              <input
                type="text"
                value={configId}
                onChange={(e) => {
                  setConfigId(e.target.value);
                  // Clear previous messages when input changes
                  setError("");
                  setMessage("");
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                placeholder="Enter configuration ID"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Remark
              </label>
              <textarea
                value={remark}
                onChange={(e) => {
                  setRemark(e.target.value);
                  // Clear previous messages when input changes
                  setError("");
                  setMessage("");
                }}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 resize-none"
                placeholder="Enter your remark here..."
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
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>Update Remark</span>
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

          {message && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mb-6">
              <div className="flex items-center">
                <p className="text-green-700 font-medium">{message}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateConfig;
