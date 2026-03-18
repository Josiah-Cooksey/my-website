# Portfolio Website

Live site: [jcooksey.dev](https://jcooksey.dev)

Public-facing portfolio website showcasing projects, technical skills, and practical work.

## Overview

This site is built using React (via Next.js) strictly for templating and static generation.  
All pages are compiled into static HTML, CSS, and JavaScript at build time. There is no client-side React hydration.

Some pages include interactivity using vanilla JavaScript.

## Tech Stack

- JavaScript (primary language)
- React (templating only, no runtime React usage)
- Next.js (static site generation via `next build`)
- HTML / CSS
- Tailwind CSS

## Backend Integration

Includes a live demo connected to:

- AWS Lambda
- Amazon API Gateway
- Custom domain for API endpoints (instead of default AWS URLs)

## Deployment

Deployment is automated via GitHub Actions:

- Push to `main` triggers build
- Static files are pushed to `build` branch
- GitHub Pages serves from `build`

## Purpose

This project serves as a central hub for recruiters and hiring managers to evaluate my work and technical capabilities.
