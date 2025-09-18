FROM node:20

WORKDIR /app

# 只先複製 package.json，避免 node_modules 衝突
COPY package*.json ./

# 用 yarn 安裝，避開 npm 的 rollup bug
RUN corepack enable && yarn install --frozen-lockfile

# 複製剩餘專案檔案
COPY . .

EXPOSE 5173

CMD ["yarn", "dev", "--host", "0.0.0.0"]