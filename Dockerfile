# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app/src/

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Se necessário, você pode copiar e renomear o arquivo:
COPY .env.prod .env

RUN npx prisma generate

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]
