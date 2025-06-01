# PixelVision

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

**Frontend:**
- Next.js 14+ with TypeScript
- React 18+ with functional components
- Tailwind CSS for styling
- Custom React hooks for state management

## Project Structure

```
pixelvision/
├── pixelvision/          # Django backend
│   ├── apps/            # Django applications
│   ├── models/          # ML models (after setup)
│   ├── static/          # Static files
│   └── settings.py      # Django configuration
├── client/              # Next.js frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Next.js pages
│   │   └── styles/      # CSS files
│   ├── package.json     # Node dependencies
│   └── tsconfig.json    # TypeScript config
└── requirements.txt     # Python dependencies
```

## Backend Setup

1. Create a virtual environment and activate it:
```bash
python3 -m venv env
source env/bin/activate
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Set up the machine learning models:
   - Download models.zip from: https://drive.google.com/file/d/1vpOEze2-kcl-hDrF6oBI3TGl3LVfM20X/view?usp=sharing
   - Extract the contents:
```bash
unzip models.zip
mv models pixelvision/
```

4. Navigate to the Django project and start the server:
```bash
cd pixelvision
python3 manage.py runserver
```

The backend will be available at http://localhost:8000

## Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env.local
```

4. Configure the environment variables in .env.local:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:3000

## Available Frontend Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run code linting
- `npm run type-check` - Check TypeScript types

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- Git for version control

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

## Environment Configuration

**Backend (.env):**
```
DEBUG=False
SECRET_KEY=your-production-secret-key
DATABASE_URL=postgresql://user:pass@localhost/dbname
ALLOWED_HOSTS=yourdomain.com
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

## Support

For technical support and inquiries:
- Email: support@pixelvision.ai
- Documentation: Available in the project wiki
- Issues: Use GitHub issues for bug reports and feature requests

## License

This project is licensed under the MIT License. See the LICENSE file for details.
