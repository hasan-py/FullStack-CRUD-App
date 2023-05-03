FROM node:14
WORKDIR /app
COPY ./package.json .
RUN npm i
COPY . .
ENV MONGODB_URI_LOCAL=mongodb://mongo:27017/crudapp
EXPOSE 8000
CMD ["npm", "run", "dev"]