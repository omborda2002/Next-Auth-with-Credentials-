/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    MONGO_URI: "mongodb://localhost:27017/mongoose_nextjs_demo",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET:
      "syyj0PZbPL3Zv3QyKzkBeTZYjxYjjG4m2vOH3XNlh0CYoHvdWVjmNEXSUSLE61eXpMqDPcBNyQRZI6",
  },
};

module.exports = nextConfig;
