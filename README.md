# Astro R2 File Upload Demo

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/Astro-5.7.0-purple.svg)](https://astro.build/)
[![Cloudflare R2](https://img.shields.io/badge/Cloudflare%20R2-Storage-orange.svg)](https://developers.cloudflare.com/r2/)

An example file upload solution built with Astro and Webflow Cloud Object Storage. This project demonstrates how to build scalable file upload functionality with support for both simple uploads and multipart uploads for large files.

## Table of contents

1. [Project description](#project-description)
2. [Who this project is for](#who-this-project-is-for)
3. [Project dependencies](#project-dependencies)
4. [Instructions for using Astro R2 File Upload Demo](#instructions-for-using-astro-r2-file-upload-demo)
5. [API Endpoints](#api-endpoints)
6. [Contributing guidelines](#contributing-guidelines)
7. [How to get help](#how-to-get-help)
8. [Terms of use](#terms-of-use)

### Key Features

- **🚀 Simple File Upload**: Direct upload to Webflow Cloud Object Storage bucket
- **📦 Multipart Upload**: Chunked upload for large files with progress tracking and resume capability
- **🖼️ File Gallery**: View and download uploaded files
- **🔒 CORS Support**: Proper CORS handling for cross-origin requests
- **⚡ Edge Performance**: Leverages Cloudflare's global edge network for fast uploads

## Who this project is for

This project is intended for developers who want to implement file upload functionality in their Webflow Cloud applications. Whether you're building a content management system, a file sharing platform, or need to handle user-generated content, this project provides the foundation you need.

## Project dependencies

Before using Astro - Webflow Cloud File Upload Demo, ensure you have:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Webflow Cloud** with Object Storage enabled - [Sign up here](https://webflow.com/signup)
- **Basic knowledge** of Astro, React, and TypeScript
- **GitHub** for version control

## Getting Started

Get started with the demo by cloning the repository and setting up your development environment.

### Installation

1. **Fork and clone the repository**

   First, [fork the repository](https://github.com/Webflow-Examples/webflow-cloud-object-storage/fork) so you have your own copy of this project. 
   
   Once you have a fork of the Github project, clone it down to your machine so you have a local copy of the code to work with.

   ```bash
   git clone https://github.com/<YOUR-GITHUB-USERNAME>/webflow-cloud-object-storage.git
   cd webflow-cloud-object-storage
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This installs all required packages including Astro, React, TypeScript, and Cloudflare Workers dependencies.

### Configure

1. **Set up environment variables**

   Create a `.env` file in the project root:

   ```bash
   ORIGIN=http://localhost:4321
   ```

2. **Configure `wrangler.json`**

   Update `wrangler.json` with a new Object storage bucket

   ```json
   {
     "name": "astro-r2-file-upload",
     "compatibility_date": "2024-01-01",
     "r2_buckets": [
       {
         "binding": "CLOUD_FILES",
         "bucket_name": "your-bucket-name"
       }
     ]
   }
   ```

3. **Upate Astro Config**
   
   In `astro.config.mjs` to include the base path for your environment and the `assetsPrefix` to match the mount path of your environment.

   ```ts title="astro.config.mjs"
   export default defineConfig({
     base: "/YOUR_MOUNT_PATH", // i.e. "/app"
     build: {
       assetsPrefix: "/YOUR_MOUNT_PATH", // i.e. "/app"
     },

     // Additional configuration options...
   });
   ```

4. **Test the app locally**

   Run the app locally to try out the project before deploying.

   ```bash
   npm run dev
   ```

5. **Push changes to repo**

   Once you've made local code changes, commit the files and push the commit to your remote Github repo fork. If you do not have any Git file changes detected, you can skip this step.

### Create a Webflow Cloud Project

1. **Create Project**

   In Webflow, go to the Webflow Cloud tab of your site settings.

   1. Go to your Webflow Cloud dashboard
   2. Click "Install Github app" to authorize Webflow Cloud for your fork of this repo - follow the prompts on Github
   3. Click "Create new project"
   4. Name your project
   5. Choose the `webflow-cloud-object-storage` repository
   6. Click "Create project"

   The application will be available at `http://localhost:4321`

2. **Create an Environment**

   Create a new environment for the `main` branch.

   1. In the same modal, choose the `main` branch
   2. Choose a mount path for the environment (for example, /app → mysite.webflow.io/app)
   3. Click "Create environment"
   4. Publish your Webflow site to make your environment live.

3. **Add Environment Variables in Webflow Cloud**
   In your environment dashboard, click the "Environment Variables" tab and add the following environment variable:

   ```bash title=".env"
   ORIGIN=YOUR_WEBFLOW_CLOUD_DOMAIN
   ```

   For example, this might value would look like `https://<your-webflow-site-slug>.webflow.io`


## Deploy the App

Once the environment is created, you should see a button to "Deploy latest Github commit". Click this to deploy the last commit on the `main` branch of your forked project; this process may take a few minutes to complete.

## View your app in Webflow Cloud

Go to you domain and base path in Webflow Cloud to start uploading files (i.e. `https://<your-webflow-site-slug>.webflow.io/app`).

### Troubleshoot Astro R2 File Upload Demo

| Issue                                 | Solution                                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **CORS errors during upload**         | Ensure you're calling into the backend endpoint with the `ASSET_PREFIX` environment variable as the hostname. Add your Webflow Cloud domain to allowed origins. |
| **Upload fails with large files**     | Check your Webflow Cloud limits. Multipart uploads handle files up to 5GB.                                                      |
| **Environment variables not loading** | Verify your `.env` file is in the project root and variables are correctly named.                                               |

Other troubleshooting resources:

- [Webflow Cloud documentation](https://developers.webflow.com/webflow-cloud/add-object-storage)
- [Astro Documentation](https://docs.astro.build/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

## API Endpoints

The application provides the following API endpoints for file operations:

### Upload Endpoints

- `POST /api/upload` - Simple file upload for smaller files
- `POST /api/multipart-upload?action=create` - Initialize multipart upload session
- `PUT /api/multipart-upload?action=upload-part` - Upload individual file part
- `POST /api/multipart-upload?action=complete` - Complete multipart upload
- `DELETE /api/multipart-upload?action=abort` - Abort multipart upload

### File Management Endpoints

- `GET /api/list-assets` - List all uploaded files
- `GET /api/asset?key=<filename>` - Get specific file metadata

## Contributing guidelines

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### How to contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Terms of use

This Webflow Cloud Object Storage example project is licensed under the [MIT License](LICENSE).

