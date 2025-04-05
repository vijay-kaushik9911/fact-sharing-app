# Fact Sharing App

A web application for sharing and discovering interesting facts.

## Features

- User-friendly interface for browsing facts
- Ability to submit new facts
- Responsive design

## Technologies Used

- React.js (frontend framework)
- Supabase (backend/database - based on src/supabase.js)
- HTML5 & CSS3
- JavaScript (ES6+)

## Project Structure

```
fact-sharing-app/
├── public/              # Static files
│   ├── index.html       # Main HTML template
│   └── logo.png         # Application logo
├── src/                 # React application source
│   ├── App.js           # Main application component
│   ├── index.js         # React entry point
│   ├── style.css        # Global styles
│   └── supabase.js      # Supabase configuration
├── v1/                  # Previous version (if maintained)
│   ├── data.js          # Data storage
│   ├── index.html       # HTML template
│   ├── logo.png         # Logo
│   ├── script.js        # JavaScript logic
│   └── style.css        # Styles
├── package.json         # Project dependencies
└── package-lock.json    # Lock file for dependencies
```

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Add your Supabase credentials

4. Run the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (not recommended)

