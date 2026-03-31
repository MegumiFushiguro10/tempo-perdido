// 1. Importações (Bibliotecas)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 2. Configurações Iniciais do Servidor
const app = express();
app.use(express.json()); 
app.use(cors()); 

// 3. Configuração da IA
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// 4. Rota da API
app.post('/api/chat', async (req, res) => {
    try {
        const { pergunta } = req.body;

        if (!pergunta) {
            return res.status(400).json({ erro: "Envie uma 'pergunta' no JSON." });
        }

        console.log(`📩 Nova pergunta recebida: "${pergunta}"`);

        // CORREÇÃO 1: Modelo correto é gemini-1.5-flash
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        // CORREÇÃO 2: Verifique se o texto abaixo está entre CRASE ( ` ) e não aspas simples
        const promptFinal = `Você é um robô sarcástico. Responda a seguinte pergunta: ${pergunta}`;
        
        const result = await model.generateContent(promptFinal);
        const respostaDaIA = result.response.text();

        return res.status(200).json({ 
            sucesso: true,
            resposta: respostaDaIA 
        });

    } catch (erro) {
        console.error("❌ Erro no servidor:", erro);
        return res.status(500).json({ erro: "Erro interno no servidor de IA." });
    }
});

// 5. Ligar o Servidor
const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORTA}`);
});