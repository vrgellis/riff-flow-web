
# RiffFlow - AI Music Generation

RiffFlow is a React-based web application that leverages Riffusion's AI model to generate music from text prompts. This project includes both the frontend (this repository) and instructions for setting up the backend.

## Overview

RiffFlow allows you to:
- Generate music from text descriptions
- Visualize the generated audio as spectrograms
- Adjust generation parameters like denoising strength and seed values
- View and replay your generation history

## Quick Setup

### Frontend (This Repository)

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install the dependencies
npm i

# Step 4: Start the development server
npm run dev
```

### Backend (Riffusion)

The application requires the Riffusion backend to generate audio. You can either:

1. **Run in Demo Mode:** The app will automatically use sample audio files if the backend is not detected.

2. **Set Up the Backend:**
   - The application includes a one-click setup guide for both Windows and Mac/Linux
   - Access this guide in the app when running in demo mode
   - Follow the provided terminal commands to clone, set up, and start the Riffusion server

## Configuration

The app connects to the Riffusion API at `http://localhost:8000` by default. You can modify this in `src/config/api.ts` if your backend is running elsewhere.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui components

## Deployment

You can deploy this project using:

1. **Lovable**: Click on Share -> Publish from the Lovable interface.
2. **Manual Deployment**: Build the app (`npm run build`) and deploy the `dist` folder to any static hosting service.

## Connecting a Custom Domain

To connect a custom domain to your Lovable project, navigate to Project > Settings > Domains and click Connect Domain.

For more details, see: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Backend Troubleshooting

If you encounter issues with the Riffusion backend:
- For CUDA errors, try running with CPU: `export CUDA_VISIBLE_DEVICES=-1`
- For memory issues, reduce batch size in the Riffusion configuration
- Verify the API is running by checking `http://localhost:8000/api/health`

## Additional Resources

- [Riffusion GitHub Repository](https://github.com/riffusion/riffusion)
- [Riffusion Paper](https://arxiv.org/abs/2212.09292)
