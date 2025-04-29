# 📄 Full CuriousLabs README.md (Reformatted)

# CuriousLabs Website

This repository contains the code for the CuriousLabs website, a modern web application built with React and Tailwind CSS.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [Utilities](#utilities)
- [Contributing](#contributing)

## Overview

The CuriousLabs website showcases the company's AI products and services with a modern, responsive design. The site features smooth animations, interactive elements, and a consistent design language across all pages.

## Features

- Responsive design optimized for all device sizes
- Modern UI with animations and interactive elements
- React Router for seamless navigation
- Centralized asset management
- Custom hooks for scroll effects and responsiveness
- Modular component structure

## Installation

To install and set up the project locally:

```bash
# Clone the repository
git clone https://github.com/your-username/curiouslabs-website.git

# Navigate to the project directory
cd curiouslabs-website

# Install dependencies
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

This will start the development server at http://localhost:5181 (or another port if 5181 is in use).

## Project Structure

```
/src
  /components       # Reusable UI components
    /Hero           # Modularized Hero components
  /hooks            # Custom React hooks
  /pages            # Page components
    /products       # Product pages
  /utils            # Utility functions
  index.jsx         # Application entry point
  App.jsx           # Main app component
  index.css         # Global styles
/public             # Static assets
  /images           # Images and SVGs
/scripts            # Helper scripts
```

## Utilities

### Product Page Generator

The project includes a script to generate new product pages with consistent styling:

```bash
node scripts/create-product-page.js
```

Follow the prompts to create a new product page with:
- Product name
- Description
- Up to 6 key features

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes thoroughly
4. Commit and push your changes
5. Create a pull request

## License

MIT
