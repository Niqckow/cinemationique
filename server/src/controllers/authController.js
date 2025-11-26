const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// register

exports.registerUser = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    console.log("body:", req.body)
    if (email.toLowerCase() === "guest@cinemationique.com") {
      return res.status(400).json({ message: "Email invalide" });
    }
    if (role != "user") {
      return res.status(400).json({message: "Requête invalide"})
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, username, password: hashedPassword, role });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const safeUser = {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };

    res.status(201).json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Aucun utilisateur ne correspond a ces identifiants" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const safeUser = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.loginGuest = async (req, res) => {
    try {
        let guest = await User.findOne({role: "guest"})

        if (!guest) {
            guest =  await User.create({
                email: "guest@cinemationique.com",
                username: "guest",
                password: await bcrypt.hash("guestpassword", 10),
                role: "guest"
            })
        }

        const token = jwt.sign(
            { id: guest._id, role: guest.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const safeUser = {
            id: guest._id,
            email: guest.email,
            role: guest.role,
        };

        res.status(200).json({ user: safeUser, token });
    } catch (err) {
      console.log(err.message)
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}