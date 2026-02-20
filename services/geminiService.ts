
import { GoogleGenAI } from "@google/genai";
import { VideoInfo } from "../types";

export const analyzeLinkWithGemini = async (url: string): Promise<VideoInfo> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Analyze this social media URL: ${url}. 
  Identify the platform and create a catchy, professional title for this content.
  Return strictly valid JSON: {"title": "String", "platform": "String", "thumbnailHint": "String"}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    });

    const data = JSON.parse(response.text || "{}");
    
    // Platform mapping for icons/labels
    const lowerUrl = url.toLowerCase();
    const platform = data.platform || (
      lowerUrl.includes('tiktok') ? 'TikTok' : 
      lowerUrl.includes('instagram') ? 'Instagram' : 
      lowerUrl.includes('facebook') ? 'Facebook' : 'Social Video'
    );

    // Corrected object literal to match VideoInfo interface
    return {
      title: data.title || "Social Media Video",
      platform: platform,
      duration: "HD",
      originalUrl: url,
      // Fix: Removed invalid property 'qualityOptions' and added mandatory 'medias'
      medias: [],
      thumbnail: `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80`
    };
  } catch (e) {
    console.error("Gemini Analysis Error:", e);
    // Corrected object literal to match VideoInfo interface
    return {
      title: "Content Preview",
      platform: "Media",
      duration: "HD",
      originalUrl: url,
      // Fix: Removed invalid property 'qualityOptions' and added mandatory 'medias'
      medias: [],
      thumbnail: `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80`
    };
  }
};
