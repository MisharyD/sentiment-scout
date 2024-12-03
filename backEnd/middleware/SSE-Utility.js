// sseUtility.js
const sseUtility = (req, res, next) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Function to send progress updates
  res.sendProgress = (progress, message = null, reportId = null) => {
    res.write(`data: ${JSON.stringify({ progress, message, reportId })}\n\n`);
  };

  // Function to handle errors
  res.sendError = (error) => {
    res.write(`data: ${JSON.stringify({ error })}\n\n`);
    console.log("Error !!");
    res.end();
  };

  req.on("close", () => {
    console.log("client closed SSE");
    res.end(); // End connection if client closes it
  });

  next();
};

module.exports = sseUtility;
