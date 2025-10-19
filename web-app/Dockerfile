FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
# Les variables REACT_APP_* doivent être définies au moment du build
ARG REACT_APP_API_TAN_URL
ARG REACT_APP_API_USER_URL
ENV REACT_APP_API_TAN_URL=$REACT_APP_API_TAN_URL
ENV REACT_APP_API_USER_URL=$REACT_APP_API_USER_URL
RUN npm run build

FROM node:20-alpine
WORKDIR /usr/src/app
RUN npm install -g serve@14
COPY --from=builder /usr/src/app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
