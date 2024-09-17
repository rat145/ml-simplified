import nextConnect from "next-connect";
import multer from "multer";
import path from "path";

// Configure multer storage
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads", // Ensure this directory exists
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// Create API route handler
const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry, something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

// Middleware to handle file upload
apiRoute.use(upload.single("file")); // 'file' should match the name in FormData

// POST request handler
apiRoute.post((req, res) => {
  // req.file contains the uploaded file information
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res
    .status(200)
    .json({ success: true, filePath: `/uploads/${req.file.filename}` });
});

export default apiRoute;

// Disable body parsing for this API route
export const config = {
  api: {
    bodyParser: false,
  },
};
