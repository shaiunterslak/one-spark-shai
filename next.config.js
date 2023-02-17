/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript:{    
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,},
    env:{
      questionsUrl:'https://d0a72046-dbae-4dcf-8ce5-5110222053ac.mock.pstmn.io/questions'
    }
}

module.exports = nextConfig
