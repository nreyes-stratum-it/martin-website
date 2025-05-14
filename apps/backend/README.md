# Strapi Backend Documentation

## Initial Setup

### Docker Container Setup
1. Configure a Docker container with a database for your Strapi application
2. Set up your environment variables in the `.env` file
3. Start the Docker container to initialize the database

### Accessing the Admin Dashboard
Once your application is running, you can access the Strapi admin dashboard through the browser at the configured URL (typically http://localhost:1337/admin).

## Data Management

### Importing Data
To import existing data into your Strapi instance, use the following command:

```bash
npm run strapi import -- -f ./namefile.tar.gz
```

> **Note:** The import file must be placed within your Strapi project directory.

> **Important:** If the filename ends with `.enc` (e.g., `namefile.tar.gz.enc`), it means the file is encrypted. The console will prompt you to enter the encryption key that was used during export.

### Exporting Data
To create a backup or export data from your Strapi instance, use:

```bash
npm run strapi export -- --file filename
```

You will be prompted to enter an encryption key during export. **Make sure to securely store this key**, as you will need it to import the data later.

> **Important:** Admin users, API tokens, and media files from third-party providers (like Cloudinary or AWS S3) are not included in exports.

## Development Workflow

### Working with Frontend
Since Strapi is not yet deployed to production, you'll need to:

1. Export data from the Pages collection in Strapi
2. Copy the JSON response 
3. Store it in the `/data` directory of your frontend application

This will allow your frontend to display content while developing independently from the Strapi backend.

> **Note:** You can access the API directly without pre-built queries using qs. For example:
> - To get the home page: `http://localhost:1337/api/pages?locale=en&filters%5Bslug%5D%5B%24eq%5D=%2Fhome&publicationState=live`
> - To get global content (header and footer): `http://localhost:1337/api/global`

## Troubleshooting

- If you encounter import errors, verify that your encryption key matches the one used during export
- Ensure your Docker container is running before attempting to start Strapi
- Check that your database connection parameters in the `.env` file are correct