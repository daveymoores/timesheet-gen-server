# Install dependencies only when needed
FROM node:18-buster AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN apt-get update && apt-get install -y wget gnupg unzip \
    && yarn install --frozen-lockfile

# Install Puppeteer without downloading bundled Chromium
RUN yarn add puppeteer --no-save

# Rebuild the source code only when needed
FROM node:18-buster AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node:18-buster AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN groupadd -g 1001 nodejs
RUN useradd -m -u 1001 -g nodejs nextjs

# Install Chromium and its dependencies
RUN apt-get update \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/googlechrome-linux-keyring.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/googlechrome-linux-keyring.gpg] https://dl-ssl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable libxss1 dbus dbus-x11 --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install Inter font
RUN wget https://github.com/rsms/inter/releases/download/v3.19/Inter-3.19.zip \
    && unzip Inter-3.19.zip -d /usr/share/fonts \
    && fc-cache -f -v \
    && rm Inter-3.19.zip

# Determine the path of the installed Google Chrome
RUN which google-chrome-stable || true

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server ./server
COPY --from=builder /app/tsconfig.server.json ./
COPY --from=builder /app/tsconfig.json ./

# Update the PUPPETEER_EXECUTABLE_PATH to the correct Chrome path
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

USER nextjs

EXPOSE 3000

ENV PORT=3000

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["yarn", "start"]
