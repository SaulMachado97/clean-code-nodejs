import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Middleware para verificar el token JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Los tokens suelen pasarse en el encabezado Authorization
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // El token está en el formato "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' })
    }

    // Si el token es válido, almacenamos la información del usuario en el objeto `req`
    //req.user = user

    next() // Continúa con la siguiente función en la ruta
  })
}

export default authenticateToken
