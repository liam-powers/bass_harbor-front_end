/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["www.talkbass.com", "cdn.basschat.co.uk"],
        formats: ["image/webp"],
    },
};

export default nextConfig;
