// pages/api/generate.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body ?? {};
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  const HF_KEY = process.env.HF_API_KEY;
  if (!HF_KEY) return res.status(500).json({ error: "HF key not configured" });

  try {
    // Example: call animate-diff or another model endpoint
    const resp = await fetch("https://api-inference.huggingface.co/models/animatediff", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return res.status(resp.status).json({ error: txt });
    }

    // We return binary back to client
    const arrayBuffer = await resp.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Send as binary (client will treat as blob)
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="video.mp4"`);
    return res.send(buffer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
