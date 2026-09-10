FROM node:22-bookworm-slim

WORKDIR /app

ENV CI=true
ENV WRANGLER_SEND_METRICS=false

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then((response) => { if (!response.ok) process.exit(1); }).catch(() => process.exit(1));"

CMD ["npm", "run", "start", "--", "--ip", "0.0.0.0", "--port", "3000"]
