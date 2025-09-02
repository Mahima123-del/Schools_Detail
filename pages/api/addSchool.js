import multer from "multer";
import path from "path";
import  db  from "../../utils/db";

// Configure Multer with custom filename
const storage = multer.diskStorage({
  destination: "./public/schoolImages/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
    // e.g., 1693563728123.jpg
  },
});

const upload = multer({ storage });

export const config = {
  api: { bodyParser: false },
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  upload.single("image")(req, res, function (err) {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ error: err.message });
    }

    try {
      const { name, address, city, state, contact, email_id } = req.body;
      const image = req.file ? req.file.filename : null;

      db.query(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, image, email_id],
        (err, result) => {
          if (err) {
            console.error("DB insert error:", err);
            return res.status(500).json({ error: err.message });
          }

          return res
            .status(200)
            .json({ message: "School added successfully!" });
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      return res.status(500).json({ error: "Unexpected server error" });
    }
  });
}
