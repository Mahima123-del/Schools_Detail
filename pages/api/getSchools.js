import  db  from '../../utils/db';

export default function handler(req, res) {
  db.query(
    "SELECT id, name, address, city, image FROM schools",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    }
  );
}
