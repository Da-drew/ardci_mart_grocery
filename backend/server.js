import express from "express";
import cors from "cors";
import { createConnection } from "mysql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(cors());

const db = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ardci_mart_db",
});

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, "yourSecretKey", (err, user) => {
    if (err) return res.sendStatus(403);
    req.adminId = user.adminId;
    next();
  });
};

// Route to get all customers
app.get("/customer-user", (req, res) => {
  const sql = "SELECT * FROM customer_user";
  db.query(sql, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json(data);
  });
});

// Online Status
app.post("/customer-user/:id/online", (req, res) => {
  const { id } = req.params;
  const { is_online } = req.body;

  const sql = "UPDATE customer_user SET is_online = ? WHERE id = ?";
  db.query(sql, [is_online, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json({ message: "User online status updated." });
  });
});

// Route to get a single customer by ID
app.get("/customer-user/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM customer_user WHERE id = ?";

  db.query(sql, [userId], (err, data) => {
    if (err) {
      console.error("Error while fetching customer data:", err.message);
      return res.status(500).json({ error: err.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.json(data[0]);
  });
});

// Route to create a new customer
app.post("/create-customer-user", (req, res) => {
  const sql = `
    INSERT INTO customer_user (username, password, email, full_name, address, zip_code, phone_number, avatar) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    req.body.userName,
    req.body.userPassword,
    req.body.userEmail,
    req.body.userfullName,
    req.body.userAddress,
    req.body.userZipCode,
    req.body.userPhoneNumber,
    req.body.userAvatar,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error while inserting data into DB:", err.message);
      return res.status(500).json({ error: err.message });
    }
    return res.status(201).json({ message: "User created successfully", data });
  });
});

// Route to update a customer by ID
app.put("/update-customer-user/:id", (req, res) => {
  const userId = req.params.id;
  const sql = `
    UPDATE customer_user 
    SET username = ?, password = ?, email = ?, full_name = ?, address = ?, zip_code = ?, phone_number = ?, avatar = ? 
    WHERE id = ?
  `;
  const values = [
    req.body.userName,
    req.body.userPassword,
    req.body.userEmail,
    req.body.userfullName,
    req.body.userAddress,
    req.body.userZipCode,
    req.body.userPhoneNumber,
    req.body.userAvatar,
    userId,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error while updating data in DB:", err.message);
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ message: "User updated successfully", data });
  });
});

// DELETE route to delete a student
app.delete("/customer-user/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM customer_user WHERE id = ?";

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error deleting data from the database:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  });
});

// Route to create an admin user (only run this once to set up)
app.post("/create-admin-user", async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  const sql = `
    INSERT INTO admin_user (username, password, email) 
    VALUES (?, ?, ?)
  `;
  const values = [username, hashedPassword, email];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error while inserting admin data into DB:", err.message);
      return res.status(500).json({ error: err.message });
    }
    return res
      .status(201)
      .json({ message: "Admin user created successfully", data });
  });
});

// Route for admin login
app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM admin_user WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(401).json({ message: "Invalid username or password" });

    const admin = results[0];

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid username or password" });

    // Track login time
    const loginTimeQuery =
      "UPDATE admin_user SET last_login = NOW() WHERE admin_id = ?";
    db.query(loginTimeQuery, [admin.admin_id]);

    const token = jwt.sign(
      { adminId: admin.admin_id, username: admin.username },
      "yourSecretKey",
      {
        expiresIn: "4h",
      }
    );
    res.status(200).json({ token, admin });
  });
});

// Refresh the token
app.post("/admin/refresh-token", (req, res) => {
  const { expiredToken } = req.body;

  try {
    const decoded = jwt.verify(expiredToken, "yourSecretKey", {
      ignoreExpiration: true,
    });

    // Generate a new token
    const newToken = jwt.sign(
      { adminId: decoded.adminId, username: decoded.username },
      "yourSecretKey",
      { expiresIn: "15s" } // Short-lived token for logout
    );

    // Send the new token and adminId to the frontend
    res.status(200).json({ token: newToken, adminId: decoded.adminId });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
});

app.post("/admin/logout", authenticateToken, (req, res) => {
  const adminId = req.adminId || req.body.adminId; // Use token or fallback to request body

  if (!adminId) {
    return res.status(400).json({ error: "Admin ID not provided" });
  }

  const logoutTimeQuery =
    "UPDATE admin_user SET logout_time = NOW() WHERE admin_id = ?";
  db.query(logoutTimeQuery, [adminId], (err) => {
    if (err) {
      return res.status(500).json({ error: "Database error during logout" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

// Route to add a new admin user
app.post("/admin/add", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Check if the username or email already exists
  const checkQuery = "SELECT * FROM admin_user WHERE username = ? OR email = ?";
  db.query(checkQuery, [username, email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: "Username or email already taken." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new admin into the database
    const insertQuery =
      "INSERT INTO admin_user (username, password, email) VALUES (?, ?, ?)";
    db.query(insertQuery, [username, hashedPassword, email], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to add admin." });
      }

      res.status(200).json({ message: "Admin added successfully." });
    });
  });
});

// SELECT admin user
app.get("/admin/users", (req, res) => {
  const query = "SELECT * FROM admin_user";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json(results);
  });
});

// DELETE admin user
app.delete("/admin/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM admin_user WHERE admin_id = ?";

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(204).send();
  });
});

// Get a single admin user by ID
app.get("/admin/users/:id", (req, res) => {
  const adminId = req.params.id;

  const query = "SELECT * FROM admin_user WHERE admin_id = ?";
  db.query(query, [adminId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ error: "Admin not found" });

    res.status(200).json(results[0]);
  });
});

// Start the server
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
