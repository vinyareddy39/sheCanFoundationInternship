import { useState } from "react";
import { Link } from "react-router-dom";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/form-api/forms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setResponse("Form Submitted Successfully");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponse("Submission failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      setResponse("Error: Could not connect to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-xl border border-gray-100 shadow-sm w-full max-w-[420px]">
      
      <h2 className="text-[32px] font-[300] text-center text-[#222] mb-10">
        She Can Foundation
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        
        <input
          type="text"
          name="name"
          placeholder="Enter the name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#fafafa] border border-[#f0f0f0] rounded-lg focus:outline-none focus:border-gray-300 text-[15px] text-gray-700 placeholder-gray-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter the email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#fafafa] border border-[#f0f0f0] rounded-lg focus:outline-none focus:border-gray-300 text-[15px] text-gray-700 placeholder-gray-400"
        />

        <textarea
          name="message"
          placeholder="Enter the message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#fafafa] border border-[#f0f0f0] rounded-lg focus:outline-none focus:border-gray-300 resize-y min-h-[100px] text-[15px] text-gray-700 placeholder-gray-400"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1a1a1a] text-white py-3.5 mt-2 rounded-lg hover:bg-black transition text-[15px] font-medium tracking-wide"
        >
          {loading ? "Submitting..." : "Form Submit"}
        </button>
      </form> 

      {response && (
        <p className={`text-center mt-5 font-medium text-[14px] ${response.includes("Successfully") ? "text-green-600" : "text-red-500"}`}>
          {response}
        </p>
      )}

      <div className="text-center mt-6">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-800 text-[14px] transition">
          View Submissions Dashboard &rarr;
        </Link>
      </div>
    </div>
  );
}

export default Form;