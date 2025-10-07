import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl } = await req.json();
    console.log('Verifying recyclable image:', imageUrl);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Use AI vision to identify the recyclable item
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert recycling identification AI. Analyze images of recyclable materials and provide:
1. item_type: Specific type (e.g., "Plastic Water Bottle", "Glass Jar", "Cardboard Box")
2. material_category: One of: plastic, glass, paper, cardboard, metal, aluminum
3. recyclable: boolean if it's recyclable
4. points: Award points based on item (plastic bottles: 10, glass: 15, paper: 5, cardboard: 8, aluminum cans: 12, metal: 20)
5. co2_saved_kg: Estimate CO2 saved (plastic: 0.5kg, glass: 0.8kg, paper: 0.3kg, cardboard: 0.4kg, aluminum: 1.2kg, metal: 2.0kg)
6. confidence: 0-100 confidence score
7. tips: Recycling tips for this item

Respond ONLY with valid JSON, no markdown or explanations.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Identify this recyclable material and provide the structured data.'
              },
              {
                type: 'image_url',
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errorText);
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content;
    console.log('AI Response:', aiContent);

    if (!aiContent) {
      throw new Error('No response from AI');
    }

    // Parse the AI response
    let verification;
    try {
      // Remove markdown code blocks if present
      const cleanedContent = aiContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      verification = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiContent);
      throw new Error('Failed to parse AI response');
    }

    // Validate required fields
    if (!verification.recyclable || !verification.item_type || !verification.material_category) {
      throw new Error('Invalid verification response structure');
    }

    console.log('Verification result:', verification);

    return new Response(
      JSON.stringify(verification),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in verify-recyclable function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
