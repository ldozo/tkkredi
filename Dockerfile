FROM node:21.2.0-alpine as react-build
WORKDIR /app
COPY . /app

RUN apk update
RUN apk upgrade
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/* 

RUN npm cache clean -f
RUN npm cache clean -f

RUN npm install --force
#RUN npm run format
#RUN npm run lint:fix
RUN npm run build:staging

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
