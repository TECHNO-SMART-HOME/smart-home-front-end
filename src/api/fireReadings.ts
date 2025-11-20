const FIRE_API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/readings`;

export type FireReading = {
  _id: string;
  status: string;
  timestamp: string;
};

export async function fetchFireReadings(): Promise<FireReading[]> {
  if (!FIRE_API_URL) {
    throw new Error("Missing fire API URL");
  }

  const response = await fetch(FIRE_API_URL);

  if (!response.ok) {
    throw new Error("Unable to fetch fire readings");
  }

  return response.json();
}
