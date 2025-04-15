# Deploying the Aduana Frontend to Vercel

This document provides instructions for deploying the Aduana frontend to Vercel.

## Prerequisites

- A Vercel account
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

1. **Push your code to GitHub**
   Make sure you have pushed the latest version of your code to the repository.

2. **Import Project on Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project" 
   - Import your Git repository
   - Select the "frontend" directory as the root directory

3. **Configure Build Settings**
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Environment Variables**
   Add any necessary environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: URL for the backend API if needed
   - Any other environment-specific variables

5. **Deploy**
   Click "Deploy" and wait for the build to complete.

## Troubleshooting

- **Build Failures**: Check the build logs for errors. The configuration has been set up to ignore TypeScript and ESLint errors during build to prevent blocking deployment.
- **Runtime Errors**: Check the function logs in the Vercel dashboard.
- **Routing Issues**: The `vercel.json` file includes rewrites to handle client-side routing.

## Continuous Deployment

Vercel automatically deploys when you push changes to the connected repository. You can configure:

- Preview deployments for pull requests
- Automatic deployments for specific branches
- Custom domains for production and preview environments

## Resources

- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)
- [Monorepo Deployment Guide](https://vercel.com/docs/monorepos/overview) 