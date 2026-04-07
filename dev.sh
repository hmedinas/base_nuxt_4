#!/bin/bash

# Script para ejecutar el proyecto con la versión correcta de Node.js

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando proyecto con Node.js v22...${NC}"

# Cargar nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Usar Node v22
if ! nvm use 22 2>/dev/null; then
    echo -e "${RED}❌ Node.js v22 no está instalado${NC}"
    echo -e "${BLUE}Instalando Node.js v22...${NC}"
    nvm install 22
    nvm use 22
fi

# Mostrar versión
echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"
echo -e "${GREEN}✅ npm version: $(npm -v)${NC}"

# Ejecutar comando
if [ "$1" = "dev" ] || [ -z "$1" ]; then
    echo -e "${BLUE}🔥 Iniciando servidor de desarrollo...${NC}"
    npm run dev
elif [ "$1" = "build" ]; then
    echo -e "${BLUE}📦 Construyendo para producción...${NC}"
    npm run build
elif [ "$1" = "clean" ]; then
    echo -e "${BLUE}🧹 Limpiando cachés...${NC}"
    npm run clean
elif [ "$1" = "reset" ]; then
    echo -e "${BLUE}🔄 Reiniciando proyecto...${NC}"
    npm run reset
else
    npm run "$@"
fi
