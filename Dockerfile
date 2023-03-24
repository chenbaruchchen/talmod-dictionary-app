# FROM "ghcr.io/puppeteer/puppeteer:latest"


# # Create app directory
# WORKDIR /home/node/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# USER node

# RUN npm install

# # If you are building your code for production
# # RUN npm ci --only=production

# # Bundle app source
# COPY . .

# EXPOSE 8080
# CMD [ "node", "index.js" ]


FROM "ghcr.io/puppeteer/puppeteer:19.7.5"

USER root

COPY . /app

RUN cd /app && npm install --quiet

EXPOSE 3000

WORKDIR /app

CMD npm run start