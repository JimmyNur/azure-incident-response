# Agropilote Documentation

Welcome to the Agropilote documentation! This guide will help you get started with the platform and make the most of its features.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [User Guide](#user-guide)
5. [API Reference](#api-reference)
6. [Troubleshooting](#troubleshooting)

## Introduction

Agropilote is designed to help farmers and agricultural professionals manage their operations more efficiently through technology and data analytics.

### Key Concepts

- **Field**: A designated area of land used for cultivation
- **Crop**: The type of plant being grown in a field
- **Season**: A cultivation period from planting to harvest
- **Monitoring**: Regular observation and data collection about field conditions

## Installation

### System Requirements

- Operating System: Linux, macOS, or Windows
- Node.js: v14.0 or higher
- Database: PostgreSQL 12+ or MySQL 8+
- Memory: Minimum 2GB RAM
- Storage: Minimum 1GB free space

### Quick Start

```bash
# Clone the repository
git clone https://github.com/JimmyNur/agropilote.git

# Install dependencies
cd agropilote
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Initialize database
npm run db:migrate

# Start the application
npm start
```

## Configuration

See the [Configuration Guide](configuration.md) for detailed information about setting up Agropilote.

### Essential Configuration

1. **Database Connection**: Configure your database credentials in `.env`
2. **API Keys**: Add your weather service and mapping API keys
3. **Storage**: Set up file storage location for uploads
4. **Authentication**: Configure JWT settings for secure access

## User Guide

### Dashboard

The main dashboard provides an overview of:
- Active fields and their current status
- Recent activities and alerts
- Weather forecasts
- Upcoming tasks

### Field Management

Create and manage your fields:
1. Navigate to "Fields" in the menu
2. Click "Add New Field"
3. Enter field details (name, location, size, crop type)
4. Save and start monitoring

### Crop Monitoring

Track crop health and growth:
- View real-time sensor data
- Check historical trends
- Receive alerts for anomalies
- Generate reports

## API Reference

Agropilote provides a RESTful API for integration with external systems.

### Authentication

All API requests require authentication using JWT tokens.

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

### Endpoints

- `GET /api/fields` - List all fields
- `POST /api/fields` - Create a new field
- `GET /api/fields/:id` - Get field details
- `PUT /api/fields/:id` - Update field
- `DELETE /api/fields/:id` - Delete field

See [API Documentation](api-reference.md) for complete endpoint list.

## Troubleshooting

### Common Issues

**Application won't start**
- Check that all dependencies are installed
- Verify database connection settings
- Ensure required ports are not in use

**Database connection errors**
- Verify database credentials in `.env`
- Check that database server is running
- Ensure database exists and is accessible

**Authentication failures**
- Check JWT_SECRET configuration
- Verify user credentials
- Check token expiration settings

For more help, see our [FAQ](faq.md) or open an issue on GitHub.

## Additional Resources

- [API Reference](api-reference.md)
- [Configuration Guide](configuration.md)
- [Deployment Guide](deployment.md)
- [FAQ](faq.md)

## Support

If you need help:
- Check this documentation
- Search existing [GitHub issues](../../issues)
- Open a new issue with details about your problem
- Join our community forum (coming soon)
