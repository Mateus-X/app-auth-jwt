const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const route1Data = require("../../rota1.json");
const route2Data = require("../../rota2.json");


dotenv.config();

const secretKey = process.env.SECRET_KEY;


function processLogin(username, password) {
  if (username === "professor.lucas" && password === "1234") {
    return {
      sub: username,
      name: "Lucas José de Souza",
      iat: Math.floor(Date.now() / 1000),
    }
  } else if (username === "mateus" && password === "1234"); {
    return {
      sub: username,
      name: "Mateus o melhor dev do mundo",
      iat: Math.floor(Date.now() / 1000),
      isBetterThanProfessorLucas: true,
      haveBeautifulGirlfriend: true,
      githubLink: "https://github.com/Mateus-X"
    }
  }
}

const login = (request, response) => {
  const { username, password } = request.body;

  payload = processLogin(username, password);

  if (payload) {
    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
    return response.json({ message: "Login bem-sucedido!", token });
  }

  response.status(401).json({ message: "Credenciais inválidas" });
};

const protectedContent = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);

    response.json({ message: "Conteúdo protegido acessado!", user: decoded });
    
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};

const rota1 = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    jwt.verify(bearerToken, secretKey);

    response.json({ message: "acessando rota 1", info: route1Data });


    
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }

}

const rota2 = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    jwt.verify(bearerToken, secretKey);

    response.json({ message: "acessando rota 2", info: route2Data });


    
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }

}



module.exports = { login, protectedContent, rota1, rota2 };
