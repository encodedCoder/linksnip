# Link Shortener App

This is a simple link shortener application built with TypeScript and Express. It allows users to create shortened links and retrieve the original URLs.

## Features

- Create shortened links
- Retrieve original URLs from shortened links

## Project Structure

```
link-shortener-app
├── src
│   ├── app.ts                # Entry point of the application
│   ├── controllers           # Contains the URL controllers
│   │   ├── index.ts
│   │   └── urlController.ts
│   ├── data                  # Contains data files
│   │   └── urls.json
│   ├── models                # Contains data models
│   │   └── urlModel.ts
│   ├── routes                # Defines application routes
│   │   └── index.ts
│   ├── types                 # Type definitions
│   │   └── index.ts
│   └── utils                 # Utility functions
│       └── generateShortCode.ts
├── public                    # Contains static files
│   ├── index.html
│   ├── scripts.js
│   └── styles.css
├── package.json              # NPM package configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/link-shortener-app.git
   ```
2. Navigate to the project directory:
   ```
   cd link-shortener-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Build the application:
   ```
   npm run build
   ```
2. Start the application:
   ```
   npm start
   ```
3. Use the following endpoints:
   - **POST /shorten**: Create a shortened link.
   - **GET /:shortCode**: Retrieve the original URL.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.
