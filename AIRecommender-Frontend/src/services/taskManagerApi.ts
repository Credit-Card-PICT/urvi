export async function saveTaskSession(sessionData: any) {
  try {
    const res = await fetch('http://localhost:5001/api/session', { // <-- 5001
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData)
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error('Failed to save session:', err);
    throw err;
  }
}

export async function fetchTaskSessions() {
  try {
    const res = await fetch('http://localhost:5001/api/sessions'); // <-- 5001
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error('Failed to fetch sessions:', err);
    throw err;
  }
}