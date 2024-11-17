require('dotenv').config();
const express = require('express');
const Joi = require('joi');
const generatePassword = require('./utils/passwordGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Configuração do EJS como mecanismo de visualização
app.set('view engine', 'ejs');
app.set('views', './views');

// Esquema de validação para a geração de senha
const schema = Joi.object({
  length: Joi.number().integer().min(8).max(20).required(),
  uppercase: Joi.boolean(),
  lowercase: Joi.boolean(),
  numbers: Joi.boolean(),
  symbols: Joi.boolean()
});

// Rota principal para renderizar a página inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Endpoint para gerar a senha com validação de entradas
app.get('/generate-password', (req, res) => {
  const { error, value } = schema.validate(req.query);

  if (error) {
    return res.status(400).json({ error: 'Parâmetros inválidos.' });
  }

  const { length, uppercase, lowercase, numbers, symbols } = value;
  const options = { uppercase, lowercase, numbers, symbols };
  const password = generatePassword(length, options);
  res.json({ password });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
