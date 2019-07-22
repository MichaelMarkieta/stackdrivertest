FROM node
WORKDIR /app
ADD index.js package.json package-lock.json /app/
RUN npm install --production
CMD ["node", "index.js"]
