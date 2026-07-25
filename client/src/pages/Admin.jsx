import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      console.error(error);
    } else {
      setLeads(data);
    }
  }

  async function updateStatus(id, newStatus) {
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchLeads();
    }
  }
  async function handleLogout() {
  await supabase.auth.signOut();
  navigate("/login");
}
  return (
    <div className="max-w-6xl mx-auto p-8">
     <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    Admin Dashboard
  </h1>

  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
  >
    Logout
  </button>
</div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg p-3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Name</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Budget</th>
            <th className="border p-3">Message</th>
            <th className="border p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {leads
            .filter((lead) => {
              const matchesSearch =
                lead.name.toLowerCase().includes(search.toLowerCase()) ||
                lead.email.toLowerCase().includes(search.toLowerCase());

              const matchesFilter =
                filter === "All" || lead.status === filter;

              return matchesSearch && matchesFilter;
            })
            .map((lead) => (
              <tr key={lead.id}>
                <td className="border p-3">{lead.name}</td>
                <td className="border p-3">{lead.email}</td>
                <td className="border p-3">{lead.budget}</td>
                <td className="border p-3">{lead.message}</td>
                <td className="border p-3">
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      updateStatus(lead.id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;