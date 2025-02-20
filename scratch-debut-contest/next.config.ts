/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: "450mb",
      timeoutMs: 300000, // 5分 (300秒)
    },
  },
}

