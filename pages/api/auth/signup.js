import Users from "../../../models/users";
import { hashPassword } from "../../../utils/auth";
import dbConnect from "../../../utils/dbConnect";

async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return;
    }

    const data = req.body;

    const { email, password } = data;

    // Put Validations Here

    //Connect DB
    await dbConnect();

    //Check if user exists
    const existingUser = await Users.findOne({ email: email });

    if (existingUser) {
      return res.status(422).json({ message: "User already exists!" });
    } else {
      const hashedPassword = await hashPassword(password);

      const user = new Users({
        email: email,
        password: hashedPassword,
      });

      const result = await user.save();

      const data = {
        email: result.email,
        id: result._id,
      };

      return res.status(201).json({ message: "Created User!", user: data });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export default handler;
