FROM node
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build
RUN sudo apt-get update
RUN apt-get install ffmpeg
EXPOSE 3000
CMD ["yarn", "start:prod"]