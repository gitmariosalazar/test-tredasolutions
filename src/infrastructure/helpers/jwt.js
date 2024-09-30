import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../settings/config.js";


// Lista negra de tokens inválidos
let blacklistedTokens = [];

// Función para agregar un token a la lista negra
function addToBlacklist(token) {
  blacklistedTokens.push(token);
}

// Función para verificar si un token está en la lista negra
function isBlacklisted(token) {
  return blacklistedTokens.includes(token);
}


export { addToBlacklist, isBlacklisted };

const secret_key = SECRET_KEY;
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret_key, { expiresIn: "1h" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

export const createToken = (user) => {
    try {
        const token = jwt.sign(
          {
            user_id: user.user_id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            is_active: user.is_active,
            user_type: user.user_type,
            createdAt: user.createdAt,
          },
          secret_key,
          { expiresIn: "1h" }
        );
        return token
    } catch (error) {
        console.log(error);
    }
}