const apiResponse = (message: any, data: any, status: any) => {
  return { message, data, status: String(status) };
};
export default apiResponse;
