import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";


function Admin() {
  const [leads, setLeads] = useState([]);

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
  return (
  <div className="max-w-6xl mx-auto p-8">
    <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

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
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td className="border p-3">{lead.name}</td>
            <td className="border p-3">{lead.email}</td>
            <td className="border p-3">{lead.budget}</td>
            <td className="border p-3">{lead.message}</td>
            <td className="border p-3">
  <select
    value={lead.status}
    onChange={(e) => updateStatus(lead.id, e.target.value)}
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