// pages/api/generate.js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb", // Allow large outputs
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body ?? {};
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  const HF_KEY = process.env.HF_API_KEY;
  if (!HF_KEY) return res.status(500).json({ error: "HF key not configured" });

  try {
    const resp = await fetch(
      "https://api-inference.huggingface.co/models/guoyww/animatediff",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!resp.ok) {
      const errJson = await resp.json().catch(() => null);
      return res.status(resp.status).json({
        error: errJson?.error || "Hugging Face request failed",
      });
    }

    // Return binary video data
    const arrayBuffer = await resp.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="generated-video.mp4"`
    );
    return res.send(buffer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}


