FROM node:10 as build
 
# Copies everything over to Docker environment
COPY . /usr/src/app/
 
# Switch to work directory
WORKDIR /usr/src/app

# Install all node packages
RUN yarn install

# Run server
CMD ["yarn", "run", "start"]