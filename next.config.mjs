/**
 * Static export config for GitHub Pages.
 * The GitHub Action sets PAGES_BASE_PATH to "/<repo-name>" so assets resolve
 * under https://<user>.github.io/<repo-name>/. Locally it stays empty.
 */
const basePath = process.env.PAGES_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // emits a fully static site into ./out
  reactStrictMode: true,
  trailingSlash: true,         // GitHub Pages serves /path/ -> /path/index.html
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true }, // no server: next/image must be unoptimized
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // three.js ships ESM; transpile for good measure
  transpilePackages: ['three'],
};

export default nextConfig;
