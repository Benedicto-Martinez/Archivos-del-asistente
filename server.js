const express = require('express');
const { VertexAI } = require('@google-cloud/vertexai');

const app = express();
app.use(express.json());

// Configura Vertex AI (¡Reemplaza con tus datos!)
const vertexAI = new VertexAI({
  project: '1047367770480',      // Usa tu NÚMERO de proyecto
  location: 'us-central1',       // Región recomendada
});

const model = 'gemini-1.5-flash'; // Modelo rápido y económico

// Ruta para Dialogflow
app.post('/webhook', async (req, res) => {
  const { queryText, parameters } = req.body.queryResult;

  try {
    const generativeModel = vertexAI.getGenerativeModel({ 
      model,
      generationConfig: {
        maxOutputTokens: 256,    // Limita respuestas largas
        temperature: 0.7,        // Balance creatividad/precisión
      },
    });

    const prompt = `Eres NutriAdvance, un asistente de nutrición. 
    Usuario pregunta: "${queryText}". 
    Responde en menos de 3 líneas. 
    ${parameters.allergies ? `(Alergias: ${parameters.allergies})` : ''}`;

    const result = await generativeModel.generateContent({ contents: [{ role: 'user', parts: [{ text: prompt }] }] });
    const responseText = result.response.candidates[0].content.parts[0].text;

    res.json({
      fulfillmentText: responseText,
      source: "vertex-ai",
    });
  } catch (error) {
    console.error("Error con Gemini:", error);
    res.status(500).json({ error: "Error procesando tu consulta" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor listo en puerto ${PORT}`));