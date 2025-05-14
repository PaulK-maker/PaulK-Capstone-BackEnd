
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error
  
    // Determine the status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, 
    });
  };
  
  export default errorHandler;
