const express = require('express');
const path = require('path');

const {GoogleGenerativeAI} = require('@google/generative-ai');

const app = express();
app.use(express.json()); 

const genAI = new GoogleGenerativeAI("AIzaSyDgC4s60_W-5XENzMshkTUsyVMgMygjxf0");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/api/gemini-response', async (req,res) => {
    const {userMessage} = req.body;
    try{
        const result = await model.generateContent(userMessage);
        const responseText = result.response.text();
        res.json({message: responseText.trim()});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "An error occured"});
    }
    
});

// Serve the HTML file from the server folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'geminibot.html'));
});

// Serve CSS and JS files
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/scripts.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'scripts.js'));
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


