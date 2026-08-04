import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Itinerary Generator Endpoint
app.post("/api/generate-itinerary", async (req, res) => {
  try {
    const { destination, days, budget, travelType, travelerCount, notes } = req.body;

    if (!destination) {
      return res.status(400).json({ error: "Destination is required" });
    }

    const ai = getGeminiClient();

    if (ai) {
      const prompt = `You are a world-class travel planner for NAS Internationals Tours & Travels (Managing Director N. Abdul Hakeem, based in Chennai).
Create a highly detailed, realistic, day-by-day travel itinerary for:
- Destination: ${destination}
- Duration: ${days || 5} Days
- Budget Level: ${budget || 'Moderate'}
- Travel Style / Purpose: ${travelType || 'Family / Leisure'}
- Travelers: ${travelerCount || 2}
- Special Notes: ${notes || 'Include key attractions, local food, and cultural highlights'}

Return ONLY a valid JSON object matching this schema:
{
  "title": "String (e.g. 5-Day Dubai Luxury & Desert Safari)",
  "destination": "String",
  "summary": "String (2-3 sentences overview)",
  "durationDays": Number,
  "estimatedCostINR": Number,
  "highlights": ["String array of top 4 key highlights"],
  "days": [
    {
      "day": Number,
      "title": "String (Day title)",
      "morning": "String description of morning activity",
      "afternoon": "String description of afternoon activity",
      "evening": "String description of evening activity & dining",
      "hotelRecommendation": "String",
      "tips": "String travel tip for this day"
    }
  ],
  "includedServices": ["String (e.g. Flight Assistance, Hotel 4*, Visa Guidance, Transfers)"],
  "recommendedVisas": "String visa requirement notes"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      if (response.text) {
        const jsonResult = JSON.parse(response.text);
        return res.json({ success: true, itinerary: jsonResult });
      }
    }

    // Smart fallback generator if API key is missing or AI call fails
    const fallbackDaysCount = Number(days) || 5;
    const mockItinerary = {
      title: `${fallbackDaysCount}-Day Premium ${destination} Discovery`,
      destination: destination,
      summary: `Experience an extraordinary journey to ${destination} tailored by NAS Internationals. Featuring hand-picked luxury accommodations, guided city excursions, and hassle-free transfers.`,
      durationDays: fallbackDaysCount,
      estimatedCostINR: fallbackDaysCount * 14500 + 25000,
      highlights: [
        `Guided Landmark Excursion in ${destination}`,
        `4-Star Hotel Stay with Daily Breakfast`,
        `Private Airport Transfers & City Sightseeing`,
        `Visa Assistance & 24/7 NAS Travel Concierge`
      ],
      days: Array.from({ length: fallbackDaysCount }).map((_, idx) => ({
        day: idx + 1,
        title: `Day ${idx + 1}: ${idx === 0 ? 'Arrival & Welcome Dinner' : idx === fallbackDaysCount - 1 ? 'Shopping & Departure' : 'Explore Highlights & Culture'}`,
        morning: idx === 0 ? `Arrival at airport, meet NAS representative, smooth transfer to hotel.` : `Breakfast at hotel followed by guided morning sightseeing around iconic landmarks of ${destination}.`,
        afternoon: `Enjoy authentic cuisine at a top-rated local restaurant, followed by scenic cultural explore.`,
        evening: idx === fallbackDaysCount - 1 ? `Final souvenir shopping before departure transfer to airport.` : `Sunset views, local night market, and relaxed dinner experience.`,
        hotelRecommendation: `Grand Central Resort / Premium 4-Star Accommodations`,
        tips: `Keep digital copies of passport and NAS visa documents handy.`
      })),
      includedServices: [
        "Flight Booking Assistance",
        "4-Star Accommodation with Breakfast",
        "Airport Pick & Drop Transfers",
        "Visa Processing Support",
        "24/7 Agent WhatsApp Concierge"
      ],
      recommendedVisas: `Tourist Visa required for ${destination}. NAS Internationals handles complete document verification and filing.`
    };

    return res.json({ success: true, itinerary: mockItinerary, fallback: true });

  } catch (err: any) {
    console.error("Generation error:", err);
    return res.status(500).json({ error: "Failed to generate itinerary", details: err?.message });
  }
});

// Setup Vite / Static Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
