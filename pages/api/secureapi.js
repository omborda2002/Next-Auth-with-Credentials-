import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    return res.status(200).json({ message: "Authorized", session });
  }
};

export default handler;
