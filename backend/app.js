const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Rotas
app.use('/api', apiRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});