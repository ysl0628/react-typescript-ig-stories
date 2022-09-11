# pull 一個 image
FROM node:16.15-alpine3.15

# 在 container 建立名為 app 的根目錄 
WORKDIR /app

COPY . .

RUN npm install


EXPOSE 3000

CMD ["npm", "start"]

# docker run --name testtt --rm -p 3000:3000 -d test:v1
# docker build -t <imageName>:<tagName> [-f dockerfile path] .

# docker run --rm -p 4000:3000 -d -v /Users/ysl0628/Desktop/React/React_Typscript/react-typescript-ig-stories/:/app test:v1