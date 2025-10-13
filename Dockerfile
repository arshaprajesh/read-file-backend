FROM node:18-alpine AS build

WORKDIR /app

# Copy only package metadata first for better caching
COPY package*.json ./

# Clean npm cache and node_modules before install
RUN npm cache clean --force

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the frontend
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
