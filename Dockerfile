FROM alpine:latest
WORKDIR /app
RUN apk add git node npm && \ 
git clone https://github.com/Crypt00o/cryptopress.git /tmp/app && \
mv /tmp/app/* /tmp/app && \ 
cd /app && \ 
npm install . -g
