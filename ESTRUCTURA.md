# Estructura del Proyecto - MyAppSueño

## 📁 Arquitectura de Carpetas

```
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes comunes
│   │   ├── Button/     # Botón personalizado
│   │   ├── Card/       # Tarjeta
│   │   └── Input/      # Input de texto
│   └── index.js        # Exportaciones centralizadas
│
├── config/             # Configuración de la app
│   └── firebase.js     # Configuración de Firebase
│
├── constants/          # Constantes globales
│   ├── colors.js       # Paleta de colores
│   ├── sizes.js        # Tamaños y espaciados
│   └── index.js        # Exportaciones
│
├── hooks/              # Hooks personalizados
│   ├── useAuth.js      # Hook de autenticación
│   └── useSleepData.js # Hook de datos de sueño
│
├── navigation/         # Navegación
│   └── AppNavigator.js # Configuración de rutas
│
├── screens/            # Pantallas de la app
│   ├── Home/          # Pantalla principal
│   │   ├── HomeScreen.js
│   │   └── styles.js
│   ├── SleepTracking/ # Seguimiento de sueño
│   │   ├── SleepTrackingScreen.js
│   │   └── styles.js
│   └── Profile/       # Perfil de usuario
│       ├── ProfileScreen.js
│       └── styles.js
│
├── services/           # Lógica de negocio
│   ├── authService.js  # Autenticación
│   ├── sleepService.js # Gestión de sueño
│   └── userService.js  # Gestión de usuarios
│
├── styles/             # Estilos globales
│   └── globalStyles.js
│
└── utils/              # Utilidades
    ├── helpers.js      # Funciones auxiliares
    └── validators.js   # Validadores
```

## 🎨 Paleta de Colores

Todos los colores están centralizados en `src/constants/colors.js`:

- **Primarios**: Azul (#4A90E2) - Tema de sueño
- **Secundarios**: Púrpura (#9B59B6) - Relacionado con descanso
- **Estados**: Verde (éxito), Naranja (advertencia), Rojo (error)
- **Sueño**: Colores específicos para fases de sueño (profundo, ligero, REM)

## 🧩 Componentes Creados

### CustomButton
Botón reutilizable con múltiples variantes:
- `primary`: Botón principal (azul)
- `secondary`: Botón secundario (púrpura)
- `outline`: Botón con borde
- Tamaños: `small`, `medium`, `large`
- Estados: loading, disabled

### Card
Tarjeta para agrupar contenido con sombras y bordes.

### CustomInput
Input de texto con validación visual y mensajes de error.

## 🔥 Firebase

### Servicios Implementados

#### authService.js
- `signUpWithEmail()`: Registro de usuarios
- `signInWithEmail()`: Inicio de sesión
- `signOutUser()`: Cerrar sesión
- `resetPassword()`: Recuperar contraseña

#### sleepService.js
- `saveSleepRecord()`: Guardar registro de sueño
- `getSleepRecords()`: Obtener registros
- `updateSleepRecord()`: Actualizar registro
- `deleteSleepRecord()`: Eliminar registro
- `calculateWeeklyStats()`: Estadísticas semanales

#### userService.js
- `createUserProfile()`: Crear perfil de usuario
- `getUserProfile()`: Obtener perfil
- `updateUserProfile()`: Actualizar perfil

## 🪝 Hooks Personalizados

### useAuth
Gestión de autenticación:
```javascript
const { user, loading, signUp, signIn, logout } = useAuth();
```

### useSleepData
Gestión de datos de sueño:
```javascript
const { 
  records, 
  loading, 
  addRecord, 
  updateRecord, 
  deleteRecord,
  stats 
} = useSleepData(userId);
```

## 📱 Pantallas

1. **HomeScreen**: Resumen y estadísticas principales
2. **SleepTrackingScreen**: Registro de sueño
3. **ProfileScreen**: Perfil y configuración

## 🛠️ Próximos Pasos

### 1. Instalar Firebase
```bash
npm install firebase
```

### 2. Configurar Firebase
1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear nuevo proyecto
3. Copiar credenciales a `src/config/firebase.js`

### 3. Instalar React Navigation (opcional)
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
```

### 4. Habilitar servicios en Firebase
- Authentication (Email/Password)
- Firestore Database
- Storage (si necesitas imágenes)

## 💡 Uso de la Estructura

### Importar constantes:
```javascript
import { COLORS, SIZES } from '@/constants';
```

### Usar componentes:
```javascript
import { CustomButton, Card, CustomInput } from '@/components';
```

### Usar servicios:
```javascript
import { signInWithEmail } from '@/services/authService';
```

### Usar hooks:
```javascript
import { useAuth } from '@/hooks/useAuth';
```

## ✅ Ventajas de esta Estructura

1. **Escalable**: Fácil agregar nuevas features
2. **Mantenible**: Código organizado y fácil de encontrar
3. **Reutilizable**: Componentes y funciones compartidas
4. **Separación de responsabilidades**: UI, lógica y datos separados
5. **Consistencia visual**: Paleta de colores centralizada
6. **Testeable**: Servicios y utilidades fáciles de probar
