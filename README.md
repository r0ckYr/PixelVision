# PixelVision - Installation Guide

PixelVision is a medical image classification web application that leverages Django backend with a modern React/Next.js frontend. The platform uses advanced machine learning models to provide real-time medical image analysis with high accuracy and intuitive user experience.

## Features

- Real-time medical image analysis with sub-5 second processing
- High accuracy predictions with confidence scoring
- HIPAA-compliant security and data handling
- AI-powered chat assistant for result interpretation
- Support for multiple image formats including DICOM, PNG, JPG, TIFF
- Responsive web interface built with Next.js and TypeScript
- Comprehensive dashboard with detailed analytics

## Technology Stack

**Backend:**
- Django 4.0+ with Django REST Framework
- TensorFlow/PyTorch for machine learning inference
- SQLite for development, PostgreSQL for production
- OpenCV and PIL for image processing
- Ollama for AI chat functionality

**Frontend:**
- Next.js 14+ with TypeScript
- React 18+ with functional components
- Tailwind CSS for styling
- Custom React hooks for state management

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- Git for version control
- Ollama (for AI chat functionality)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd PixelVision
```

### 2. Backend Setup

#### Create Virtual Environment
```bash
python3 -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

#### Install Dependencies
```bash
pip install -r requirements.txt
pip install torch torchvision torchaudio  # Install PyTorch
```

#### Set up Ollama (AI Chat Assistant)
1. Install Ollama from: https://ollama.ai/
2. Run the Phi model (or any model of your choice):
```bash
ollama run phi
```
The model should be running on `http://localhost:11434/api/generate`

#### Database Setup
Navigate to the Django project directory and run migrations:
```bash
cd pixelvision
python3 manage.py migrate
```

#### Start Backend Server
```bash
python3 manage.py runserver
```
The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

#### Navigate to Client Directory
```bash
cd client  # From the root PixelVision directory
```

#### Install Dependencies
```bash
npm install
```

#### Environment Configuration
Create a `.env.local` file in the client directory:
```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

#### Start Frontend Server
```bash
npm run dev
```
The frontend will be available at `http://localhost:3000`

## Available Frontend Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run code linting
- `npm run type-check` - Check TypeScript types

## Project Structure

```
PixelVision/
├── client/              # Next.js frontend
│   ├── src/
│   │   └── app/
│   │       ├── components/  # React components
│   │       ├── about/       # About page
│   │       ├── contact/     # Contact page
│   │       ├── dashboard/   # Dashboard page
│   │       ├── features/    # Features page
│   │       ├── images/      # Image analysis page
│   │       ├── login/       # Login page
│   │       ├── pricing/     # Pricing page
│   │       ├── profile/     # User profile page
│   │       └── signup/      # Sign up page
│   ├── package.json     # Node dependencies
│   └── tsconfig.json    # TypeScript config
├── pixelvision/         # Django backend
│   ├── main/           # Main Django app
│   ├── brain_tumor/    # Brain tumor detection module
│   ├── lung_cancer/    # Lung cancer detection module
│   ├── bone_fracture/  # Bone fracture detection module
│   ├── test_images/    # Sample test images
│   └── manage.py       # Django management script
└── requirements.txt    # Python dependencies
```

## Testing the Application

The project includes sample test images in `pixelvision/test_images/` for testing different medical conditions:
- Brain tumor detection: `tumor1.jpg`, `tumor.jpg`, `no_tumor.png`
- Lung cancer detection: `lung_cancer1.png`, `lung_cancer2.png`, `no_lung_cancer.png`
- Bone fracture detection: `bone_fracture.jpg`, `bone_fracture2.jpg`, `no_fracture.jpg`

## Production Deployment

**Backend:**
```bash
pip install gunicorn
gunicorn pixelvision.wsgi:application --bind 0.0.0.0:8000
```

**Frontend:**
```bash
npm run build
npm start
```

## Troubleshooting

1. **Ollama Connection Issues**: Ensure Ollama is running and accessible at `http://localhost:11434/api/generate`
2. **Frontend/Backend Communication**: Verify that `NEXT_PUBLIC_BACKEND_URL` in `.env.local` matches your Django server URL
3. **Missing Dependencies**: Make sure all Python and Node.js dependencies are installed correctly

## Support

For technical support and inquiries:
- Email: support@pixelvision.ai
- Documentation: Available in the project wiki
- Issues: Use GitHub issues for bug reports and feature requests

## License

This project is licensed under the MIT License.
