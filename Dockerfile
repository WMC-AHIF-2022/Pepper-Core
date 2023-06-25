FROM node:18 as builder
RUN ls -al
WORKDIR /app
COPY ./package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM busybox:1.35.0-uclibc as busybox

FROM gcr.io/distroless/nodejs:18
COPY --from=busybox /bin/sh /bin/sh
COPY --from=busybox /bin/ls /bin/ls

WORKDIR /app
COPY --from=builder /app/dist .
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["./server/app.js"]