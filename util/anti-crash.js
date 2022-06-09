process.on('uncaughtException', (error) => {
  console.warn(error);
});
process.on('unhandledRejection', (listener) => {
  console.warn(listener);
});
process.on('rejectionHandled', (listener) => {
  console.warn(listener);
});
process.on('warning', (warning) => {
  console.warn(warning);
});
