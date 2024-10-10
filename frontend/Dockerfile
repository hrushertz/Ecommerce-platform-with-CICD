
# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Install additional MUI packages
RUN npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

# Copy the rest of the application files into the container
COPY . .

# Expose the port that the React app runs on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]