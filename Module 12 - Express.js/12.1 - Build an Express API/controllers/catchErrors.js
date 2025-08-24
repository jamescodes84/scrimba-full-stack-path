export const catchError = (req, res) => {
  res.status(404).json({message: "Endpoint not found. Please check the API documentation."})
}