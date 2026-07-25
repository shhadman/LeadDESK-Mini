import { useState } from "react";
import { supabase } from "../lib/supabase";

function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.budget || !form.message) {
    alert("Please fill all fields");
    return;
  }

  const { error } = await supabase.from("leads").insert([
    {
      name: form.name,
      email: form.email,
      budget: form.budget,
      message: form.message,
    },
  ]);

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("Lead Submitted Successfully!");

    setForm({
      name: "",
      email: "",
      budget: "",
      message: "",
    });
  }
};

  return (
    <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <h2 className="text-3xl font-bold text-center mb-8">
          Get In Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Budget</option>
            <option>₹10k - ₹25k</option>
            <option>₹25k - ₹50k</option>
            <option>₹50k+</option>
          </select>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Submit Lead
          </button>

        </form>
      </div>
    </section>
  );
}

export default LeadForm;