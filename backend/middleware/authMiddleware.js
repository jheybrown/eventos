const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obter o token do cabeçalho da requisição
    const token = req.header('Authorization');

    // Verificar se o token existe
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // Verificar e decodificar o token
        const decoded = jwt.verify(token, 'seuSegredoJWT'); // Use a mesma chave secreta usada para gerar o token
        req.user = decoded; // Adicionar os dados do usuário decodificados à requisição
        next(); // Permitir o acesso à próxima função (controller)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;