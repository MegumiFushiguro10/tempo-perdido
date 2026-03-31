// 1. Carrega o sistema de segurança (lê o arquivo .env)
require('dotenv').config();

// 2. Importa a biblioteca do Google Gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 3. Verifica se a chave foi carregada corretamente
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ ERRO: Chave da API não encontrada. Verifique seu arquivo .env!");
    process.exit(1);
}

// 4. Conecta com a IA usando a sua chave secreta
const genAI = new GoogleGenerativeAI(apiKey);

async function executarAgente() {
    try {
        console.log("⏳ Conectando aos servidores do Google...");

        // 5. Escolhe o modelo de IA que vamos usar
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // 6. ENGENHARIA DE PROMPT (Sua vez de brilhar!)
        
       const prompt = "Aja como Satoru Gojo, o feiticeiro mais forte de Jujutsu Kaisen. Com sua personalidade extremamente autoconfiante, descontraída e chamando o usuário de 'meu aluno', explique o que é o 'Back-end' na programação. Faça uma analogia dizendo que o Front-end é o que as pessoas veem, mas o Back-end é como a sua técnica do 'Infinito' ou a sua 'Expansão de Domínio: Vazio Imensurável' – onde o verdadeiro poder e processamento acontecem nos bastidores. Comece a resposta com um clássico 'Yo!'"; = "Atue como um Desenvolvedor Sênior ranzinza, de 50 anos, que bebe muito café e adora reclamar de códigos mal feitos, mas que no fundo gosta de ajudar os novatos. Faça um breve discurso parabenizando o usuário por ter acabado de rodar sua primeira IA no Back-end usando Node.js. Depois do parabéns, dê uma bronca amigável dizendo que 'isso é só o começo' e dê uma instrução clara sobre qual deve ser o próximo assunto que ele deve estudar para virar um programador de verdade.";
#rpg  = "Aja como um Mestre de RPG de mesa narrando uma aventura épica. Explique o que é um 'Banco de Dados' na programação fazendo uma analogia com a Bolsa de Holding (um inventário mágico) do grupo de aventureiros. Explique como os itens (dados) entram lá, como são organizados e como os heróis puxam esses itens quando precisam. Termine a resposta rolando um dado (ex: D20) e dando uma nota para o sucesso da explicação.";
        // 7. Envia a pergunta e espera (await) a resposta
        const result = await model.generateContent(prompt);
        const resposta = result.response.text();

        console.log("\n🤖 [AGENTE GEMINI]:");
        console.log(resposta);
        console.log("\n✅ Missão Concluída.");

    } catch (erro) {
        console.error("❌ Ocorreu um erro na conexão:", erro.message);
    }
}

// Roda o sistema
executarAgente();
