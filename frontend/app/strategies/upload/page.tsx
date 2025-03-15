"use client";
import { useState } from "react";
import { useTradingAlgo } from "../../hooks/useTradingAlgo";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

export default function UploadStrategyPage() {
  const router = useRouter();
  const { uploadStrategy, createStrategy } = useTradingAlgo();
  const [formData, setFormData] = useState({
    name: "",
    fee: "",
    period: "month",
    file: null as File | null,
    roi: "10",
    profitability: "60",
    risk: "5",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file) {
      enqueueSnackbar("Please select a strategy file to upload", { variant: "error" });
      return;
    }
    
    setLoading(true);
    
    try {
      // First upload the strategy to the backend
      const strategyUid = await uploadStrategy(
        formData.file,
        formData.name,
        "", // Will use connected wallet address
        "algorithmic",
        parseInt(formData.roi),
        parseInt(formData.profitability),
        parseInt(formData.risk)
      );
      
      if (!strategyUid) {
        throw new Error("Failed to upload strategy file");
      }
      
      // Then create the strategy on the blockchain
      await createStrategy(
        strategyUid,
        parseFloat(formData.fee),
        formData.period,
        parseInt(formData.roi),
        parseInt(formData.profitability),
        parseInt(formData.risk)
      );
      
      enqueueSnackbar("Strategy uploaded successfully!", { variant: "success" });
      router.push("/strategies");
    } catch (error) {
      console.error("Error uploading strategy:", error);
      enqueueSnackbar("Failed to upload strategy. Please try again.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Upload New Trading Strategy</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Strategy Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
            placeholder="e.g., Golden Cross Strategy"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Subscription Fee (USD)</label>
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="0.00"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Subscription Period</label>
            <select
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Expected ROI (%)</label>
            <input
              type="number"
              name="roi"
              value={formData.roi}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
              placeholder="10"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Profitability (%)</label>
            <input
              type="number"
              name="profitability"
              value={formData.profitability}
              onChange={handleChange}
              required
              min="0"
              max="100"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="60"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Risk Score (1-10)</label>
            <input
              type="number"
              name="risk"
              value={formData.risk}
              onChange={handleChange}
              required
              min="1"
              max="10"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="5"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <label className="block text-gray-700 mb-2">Strategy File (Python)</label>
          <input
            type="file"
            accept=".py"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <p className="text-sm text-gray-500 mt-1">
            Upload a Python file containing your trading algorithm.
          </p>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {loading ? "Uploading..." : "Upload Strategy"}
          </button>
        </div>
      </form>
    </div>
  );
}