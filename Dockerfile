FROM alpine:latest
WORKDIR /app
RUN apk add git nodejs npm && \ 
git clone https://github.com/Crypt00o/cryptopress.git /tmp/app && \
mv /tmp/app/* /app/ && \ 
npm install /app -g && \
sh
