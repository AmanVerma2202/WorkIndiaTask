export const adminMiddleware = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Invalid API key' });
  }
  
  next();
};
 