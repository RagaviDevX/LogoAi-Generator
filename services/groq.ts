import Groq from "groq-sdk";
import type { GenerationRequest, GenerationResult, ColorPalette, TypographySuggestion } from "@/types";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateBrandAssets(
  request: GenerationRequest
): Promise<Partial<GenerationResult>> {
  const { brandName, industry, style, description } = request;

  const prompt = `You are an expert brand designer and AI creative director. Generate comprehensive brand assets for:

Brand Name: ${brandName}
Industry: ${industry}
Design Style: ${style}
${description ? `Additional Context: ${description}` : ""}

Return a JSON object with exactly this structure (no markdown, just raw JSON):
{
  "logo_prompt": "detailed DALL-E/Midjourney style prompt for logo generation, 100+ words, very specific about style, colors, elements, composition",
  "slogans": ["slogan 1", "slogan 2", "slogan 3", "slogan 4", "slogan 5"],
  "brand_names": ["alternative 1", "alternative 2", "alternative 3", "alternative 4", "alternative 5"],
  "color_palettes": [
    {
      "name": "palette name",
      "primary": "#hexcode",
      "secondary": "#hexcode",
      "accent": "#hexcode",
      "background": "#hexcode",
      "text": "#hexcode",
      "description": "why this palette fits the brand"
    },
    {
      "name": "palette name 2",
      "primary": "#hexcode",
      "secondary": "#hexcode",
      "accent": "#hexcode",
      "background": "#hexcode",
      "text": "#hexcode",
      "description": "why this palette fits the brand"
    },
    {
      "name": "palette name 3",
      "primary": "#hexcode",
      "secondary": "#hexcode",
      "accent": "#hexcode",
      "background": "#hexcode",
      "text": "#hexcode",
      "description": "why this palette fits the brand"
    }
  ],
  "typography": [
    {
      "heading": "Font Name",
      "body": "Font Name",
      "accent": "Font Name",
      "mood": "one word mood",
      "pairing_reason": "why this pairing works for the brand"
    },
    {
      "heading": "Font Name",
      "body": "Font Name",
      "accent": "Font Name",
      "mood": "one word mood",
      "pairing_reason": "why this pairing works for the brand"
    }
  ],
  "social_ideas": [
    "social media branding idea 1",
    "social media branding idea 2",
    "social media branding idea 3",
    "social media branding idea 4"
  ]
}`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.85,
    max_tokens: 2000,
  });

  const content = completion.choices[0]?.message?.content || "{}";

  // Strip markdown code blocks if present
  const cleaned = content
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  return {
    logo_prompt: parsed.logo_prompt || "",
    slogans: parsed.slogans || [],
    color_palettes: (parsed.color_palettes || []) as ColorPalette[],
    typography: (parsed.typography || []) as TypographySuggestion[],
    brand_names: parsed.brand_names || [],
    social_ideas: parsed.social_ideas || [],
  };
}

export async function generateLogoPromptOnly(
  brandName: string,
  industry: string,
  style: string
): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `Generate a detailed AI image generation prompt for a ${style} logo for "${brandName}" in the ${industry} industry. 
        Make it specific, visual, and ready to use with Midjourney or DALL-E. 
        Focus on: icon/symbol concept, color scheme, typography style, composition, mood. 
        Return ONLY the prompt text, no explanations.`,
      },
    ],
    temperature: 0.8,
    max_tokens: 300,
  });

  return completion.choices[0]?.message?.content?.trim() || "";
}

export async function generateSlogans(
  brandName: string,
  industry: string,
  style: string
): Promise<string[]> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `Generate 8 powerful, memorable slogans for "${brandName}" — a ${style} brand in the ${industry} industry.
        Make them punchy, unique, and brand-appropriate.
        Return ONLY a JSON array of strings, no explanations or markdown.`,
      },
    ],
    temperature: 0.9,
    max_tokens: 400,
  });

  const content = completion.choices[0]?.message?.content || "[]";
  const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleaned);
}

export async function generateBrandNames(
  industry: string,
  style: string,
  keywords?: string
): Promise<string[]> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `Generate 10 creative, unique, memorable brand names for a ${style} company in the ${industry} industry.
        ${keywords ? `Keywords/themes: ${keywords}` : ""}
        Requirements: catchy, 1-2 words, domain-friendly, timeless, distinctive.
        Return ONLY a JSON array of strings, no explanations or markdown.`,
      },
    ],
    temperature: 0.95,
    max_tokens: 300,
  });

  const content = completion.choices[0]?.message?.content || "[]";
  const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleaned);
}
