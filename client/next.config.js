module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com', 'blob:http://localhost:3000', '', 'storage.googleapis.com']
  },
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID
  }
}
