const API_BASE = "http://192.168.1.100:8000/api"; // 🔴 change to your laptop IP

export async function fetchLiveData() {
  const res = await fetch(`${API_BASE}/live-data/`);
  if (!res.ok) throw new Error("API error");
  return res.json();
}
