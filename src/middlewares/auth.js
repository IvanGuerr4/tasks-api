import jwt from 'jsonwebtoken';

//Autenticación del usuario, se verifica que el token sea válido 
export const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    const token = auth.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
