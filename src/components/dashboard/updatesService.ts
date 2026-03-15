export interface GovernmentUpdate {
  title: string;
  description: string;
  category: string;
  date: string;
}

export async function getGovernmentUpdates(): Promise<GovernmentUpdate[]> {
  try {
    const response = await fetch("https://yojanasathi-pfgx.onrender.com/api/government-updates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Government Updates Service Error:", error);
    return [];
  }
}
