# 🌙 MyAppSueño - Seguimiento del Sueño

Aplicación móvil de **seguimiento del sueño** desarrollada con **React Native (Expo)** y **Firebase**.

## ✨ Características

- ✅ **Estructura escalable** con separación de responsabilidades
- 🎨 **Paleta de colores centralizada** fácil de mantener
- 🔥 **Integración con Firebase** (Auth + Firestore)
- 🧩 **Componentes reutilizables** (Button, Card, Input)
- 🪝 **Hooks personalizados** para lógica de negocio
- 📱 **Pantallas de ejemplo** funcionales
- ✅ **Validadores** y utilidades
- 📝 **Estilos separados** de la lógica

## 📁 Estructura del Proyecto

```
src/
├── components/      # Componentes reutilizables
├── config/         # Configuración (Firebase)
├── constants/      # Colores, tamaños, temas
├── hooks/          # Hooks personalizados
├── navigation/     # Navegación de la app
├── screens/        # Pantallas
├── services/       # Lógica de Firebase
├── styles/         # Estilos globales
└── utils/          # Utilidades y validadores
```

Ver [ESTRUCTURA.md](ESTRUCTURA.md) para documentación completa.

## 🚀 Inicio Rápido

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd MyAppSueño
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear un nuevo proyecto
3. Copiar credenciales de configuración
4. Pegar en `src/config/firebase.js`

```javascript
// src/config/firebase.js
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  // ... resto de configuración
};
```

### 4. Instalar Firebase (opcional)

```bash
npm install firebase
```

### 5. Ejecutar la aplicación

```bash
npx expo start
```

Luego elige una opción:

| Tecla | Acción |
|-------|--------|
| `a`   | Abrir en Android |
| `i`   | Abrir en iOS |
| `w`   | Abrir en web |

## 📦 Dependencias Principales

- **React Native** (via Expo): Framework principal
- **Firebase**: Backend (Auth + Firestore)
- **Expo**: Tooling y desarrollo

## 🎨 Usando la Estructura

### Importar constantes

```javascript
import { COLORS, SIZES } from './src/constants';

// Usar en estilos
backgroundColor: COLORS.primary,
fontSize: SIZES.font.large,
```

### Usar componentes

```javascript
import { CustomButton, Card, CustomInput } from './src/components';

<CustomButton 
  title="Guardar" 
  onPress={handleSave}
  variant="primary"
  size="large"
/>
```

### Usar hooks personalizados

```javascript
import { useAuth } from './src/hooks/useAuth';

const { user, signIn, signOut } = useAuth();
```

### Usar servicios

```javascript
import { saveSleepRecord } from './src/services/sleepService';

await saveSleepRecord(userId, sleepData);
```

## 📚 Documentación

- [ESTRUCTURA.md](ESTRUCTURA.md) - Documentación completa de la arquitectura
- [src/screens/EJEMPLO_Login/](src/screens/EJEMPLO_Login/) - Ejemplo de integración completa

## 🛠️ Próximos Pasos

1. ✅ Estructura base creada
2. ⏳ Configurar Firebase
3. ⏳ Implementar navegación con React Navigation
4. ⏳ Completar pantallas de autenticación
5. ⏳ Agregar gráficos de sueño
6. ⏳ Implementar notificaciones

## 💡 Ventajas de esta Estructura

- **Escalable**: Fácil agregar nuevas features
- **Mantenible**: Código organizado por responsabilidad
- **Reutilizable**: Componentes y hooks compartidos
- **Consistencia visual**: Paleta centralizada
- **Testeable**: Servicios aislados

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (versión LTS)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)
- Cuenta de [Firebase](https://firebase.google.com/)

## 📄 Licencia

Este proyecto es para fines educativos.
