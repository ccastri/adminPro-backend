# Use an official Node.js runtime as a parent image
FROM node:16.17

# Set the working directory within the container
WORKDIR /usr/

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Express app will listen on
EXPOSE 3000

# Define the command to start your Node.js Express API
CMD ["node", "index.js"]
