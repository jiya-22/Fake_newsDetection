# 🔍 Fake News Detection Application

A full-stack web application that uses machine learning and live fact-checking to detect fake news. Built with React, Flask, and PostgreSQL, featuring Web3 wallet integration.

## 🌟 Features

- **ML-Powered Detection**: Uses trained ML model to classify news as real or fake
- **Live Fact-Checking**: Searches the web for evidence to verify claims
- **URL Scraping**: Automatically extracts content from news article URLs
- **Web3 Integration**: Connect wallet to save search history
- **User History**: Track all your fact-checks with wallet authentication
- **Responsive UI**: Modern, beautiful interface built with React and Tailwind CSS

## 🏗️ Architecture

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Flask + scikit-learn + NLTK
- **Database**: PostgreSQL
- **Deployment**: Docker + Render

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Python 3.11+
- PostgreSQL 15+
- Docker (optional, for containerized deployment)

### Local Development

#### 1. Clone the repository

```bash
git clone https://github.com/jiya-22/Fake_newsDetection.git
cd Fake_newsDetection
```

#### 2. Set up Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run the backend
python app.py
```

Backend will run on `http://localhost:5001`

#### 3. Set up Frontend

```bash
cd NoCap

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your backend URL

# Run the frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

#### 4. Set up Database

```sql
-- Create database
CREATE DATABASE fake_news_db;

-- Tables will be created automatically when backend starts
```

### Docker Development

```bash
# Build and run all services
docker-compose up --build

# Access the application
# Frontend: http://localhost
# Backend: http://localhost:5001
```

## 📦 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions on deploying to Render.

### Quick Deploy to Render

1. Push code to GitHub
2. Sign up at [render.com](https://render.com)
3. Create new Blueprint
4. Connect your repository
5. Render will automatically deploy using `render.yaml`

## 🔧 Configuration

### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | - |
| `DB_NAME` | Database name | `fake_news_db` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | - |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `FLASK_ENV` | Flask environment | `development` |
| `PORT` | Server port | `5001` |

### Frontend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5001` |

## 📁 Project Structure

```
Fake_newsDetection/
├── backend/                 # Flask backend
│   ├── app.py              # Main application
│   ├── train.py            # Model training script
│   ├── finalized_model.pkl # Trained ML model
│   ├── vectorizer.pkl      # TF-IDF vectorizer
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Backend Docker config
│   └── .env.example        # Environment variables template
├── NoCap/                  # React frontend
│   ├── src/                # Source files
│   ├── public/             # Static assets
│   ├── package.json        # Node dependencies
│   ├── Dockerfile          # Frontend Docker config
│   ├── nginx.conf          # Nginx configuration
│   └── .env.example        # Environment variables template
├── dataset/                # Training data
├── docker-compose.yml      # Local Docker setup
├── render.yaml             # Render deployment config
└── README.md               # This file
```

## 🧪 API Endpoints

### POST `/prediction`
Analyze news content for authenticity

**Request:**
```json
{
  "title": "News headline or URL",
  "text": "Article content (optional if URL provided)"
}
```

**Response:**
```json
{
  "prediction": "REAL" | "FAKE",
  "claim": "Analyzed content",
  "status": "True" | "False",
  "evidence": ["Evidence 1", "Evidence 2"],
  "reasoning": "Analysis explanation",
  "confidence": "High" | "Medium" | "Low"
}
```

### POST `/save_history`
Save fact-check to user history

### GET `/get_history/<wallet_address>`
Retrieve user's fact-check history

### POST `/report`
Report suspicious news

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Ethers.js (Web3)
- React Router
- Lucide React (Icons)

### Backend
- Flask
- scikit-learn
- NLTK
- BeautifulSoup4
- DuckDuckGo Search
- psycopg2 (PostgreSQL)
- Gunicorn

### Infrastructure
- Docker
- Nginx
- PostgreSQL
- Render

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for fighting misinformation**
