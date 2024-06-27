FROM node:14.21.1-buster-slim
# RUN npm i -g next@13.0.3 && npm i -g react@18.2.0 && npm i -g react-dom@18.2.0
EXPOSE 3000
WORKDIR /app
COPY . /app
RUN yarn
RUN yarn build
CMD ["yarn","start"]