
# 1. IMAGEM BASE
# Define o SO e runtime que vais usar. node:18-alpine = Node.js v18 em Linux Alpine (super leve, ~170MB)
FROM node:18-alpine

RUN apk add --no-cache openssl

# 2. DIRETÓRIO DE TRABALHO
# Cria uma pasta dentro do container onde todo o código vai ficar (/app é a convenção)
# Todas as comandas depois correm neste diretório
WORKDIR /app

# 3. COPIAR FICHEIROS DE DEPENDÊNCIAS
# Copia package.json e package-lock.json do teu PC para dentro do container
# O "." significa "copia de aqui" e "./" significa "cola em /app (WORKDIR)"
COPY package*.json ./

# 4. INSTALAR DEPENDÊNCIAS
# Corre npm install dentro do container
# Isto cria a pasta node_modules e baixa todas as dependências
RUN npm install

# 5. COPIAR CÓDIGO COMPLETO
# Copia TODO o código do teu projeto para dentro do container
# Incluindo src/, prisma/, .env, etc
COPY . .

# 6. GERAR PRISMA CLIENT
# O Prisma precisa gerar o cliente antes de rodar
# Isto cria os ficheiros de tipo-segurança do Prisma
RUN npx prisma generate

# 7. EXPOR PORTA
# Avisa ao Docker que a app usa a porta 3000
# Isto é informativo (não bloqueia nada), mas é boa prática
EXPOSE 3000

# 8. COMANDO PADRÃO
# Quando o container inicia, corre isto
# "npm run dev" = inicia o nodemon (vê ficheiros, reinicia automático)
CMD ["npm", "run", "dev"]

# ===== FLUXO COMPLETO =====
# 1. Inicia um container com Node.js v18 Alpine
# 2. Cria pasta /app e define como working dir
# 3. Copia package.json e instala npm packages
# 4. Copia todo o código
# 5. Gera Prisma Client
# 6. Quando o container inicia, corre "npm run dev"
# 
# Resultado: um container com a tua app pronta a rodar