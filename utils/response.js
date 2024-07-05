// response.js
const successResponse = (message, data) => {
    return {
      success: true,
      message: message,
      data: data
    };
  };
  
  const errorResponse = (message, data) => {
    return {
      success: false,
      message: message,
      data: data
    };
  };
  
  module.exports = {
    successResponse,
    errorResponse
  };
  