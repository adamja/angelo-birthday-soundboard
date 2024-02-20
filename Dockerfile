# Use the Nginx image from Docker Hub
FROM nginx:alpine

# Copy the static content (HTML, CSS, JS, and sound file) into the container
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]
