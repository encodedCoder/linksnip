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
│   ├── controllers           # Contains the LinkController
│   │   └── index.ts
│   ├── routes                # Defines application routes
│   │   └── index.ts
│   └── types                 # Type definitions
│       └── index.ts
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

1. Start the application:
   ```
   npm start
   ```
2. Use the following endpoints:
   - **POST /shorten**: Create a shortened link.
   - **GET /:shortLink**: Retrieve the original URL.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.