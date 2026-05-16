# Estructura del Proyecto - MyAppSueño

## 📁 Arquitectura de Carpetas

```
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes comunes
│   │   ├── BottomTabBar/ # Barra de navegación inferior
│   │   │   ├── BottomTabBar.js
│   │   │   └── styles.js
│   │   ├── Button/     # Botón personalizado
│   │   │   ├── CustomButton.js
│   │   │   └── styles.js
│   │   ├── Card/       # Tarjeta
│   │   │   ├── Card.js
│   │   │   └── styles.js
│   │   └── Input/      # Input de texto
│   │       ├── CustomInput.js
│   │       └── styles.js
│   └── index.js        # Exportaciones centralizadas
│
├── config/             # Configuración de la app
│   └── firebase.js     # Configuración de Firebase
│
├── constants/          # Constantes globales
│   ├── colors.js       # Paleta de colores (Morado lavanda principal)
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
│   ├── EJEMPLO_Login/  # Ejemplo de login (no funcional)
│   │   ├── LoginScreen.js
│   │   └── styles.js
│   ├── Home/          # Pantalla principal
│   │   ├── HomeScreen.js
│   │   └── styles.js
│   ├── SleepTracking/ # Registro de sueño
│   │   ├── SleepTrackingScreen.js
│   │   └── styles.js
│   ├── Statistics/    # Estadísticas de sueño
│   │   ├── StatisticsScreen.js
│   │   └── styles.js
│   ├── History/       # Historial de registros
│   │   ├── HistoryScreen.js
│   │   └── styles.js
│   ├── Tips/          # Consejos para dormir mejor
│   │   ├── TipsScreen.js
│   │   └── styles.js
│   └── Profile/       # Perfil de usuario
│       ├── ProfileScreen.js
│       └── styles.js
│
├── services/           # Lógica de negocio
│   ├── authService.js  # Autenticación (pendiente implementar)
│   ├── sleepService.js # Gestión de sueño (pendiente implementar)
│   └── userService.js  # Gestión de usuarios (pendiente implementar)
│
├── styles/             # Estilos globales
│   └── globalStyles.js
│
└── utils/              # Utilidades
    ├── helpers.js      # Funciones auxiliares
    └── validators.js   # Validadores
```

## 🎨 Paleta de Colores Actualizada

Todos los colores están centralizados en `src/constants/colors.js`:

### Colores Principales
- **Primary**: `#969AB4` - Morado lavanda (color principal)
- **Primary Dark**: `#6B6F8A` - Morado oscuro
- **Primary Light**: `#B8BCCE` - Morado claro

### Colores Secundarios
- **Secondary**: `#0179A5` - Azul cian
- **Secondary Dark**: `#015A7F` - Azul oscuro
- **Secondary Light**: `#4DA3C4` - Azul claro

### Colores de Acento
- **Accent**: `#E2B95C` - Amarillo dorado
- **Coral**: `#D4655B` - Coral/rojo suave

### Fases de Sueño
- **Deep Sleep**: `#6B6F8A` - Sueño profundo
- **Light Sleep**: `#B8BCCE` - Sueño ligero
- **REM**: `#969AB4` - Sueño REM
- **Awake**: `#E2B95C` - Despierto

### Estados
- **Success**: `#27AE60` - Verde (éxito)
- **Warning**: `#E2B95C` - Amarillo dorado (advertencia)
- **Error**: `#D4655B` - Coral (error)
- **Info**: `#0179A5` - Azul cian (información)

## 🧩 Componentes Creados

### CustomButton
Botón reutilizable con múltiples variantes:
- `primary`: Botón principal (morado lavanda)
- `secondary`: Botón secundario (azul cian)
- `outline`: Botón con borde
- Tamaños: `small`, `medium`, `large`
- Estados: loading, disabled

### Card
Tarjeta para agrupar contenido con sombras y bordes redondeados.

### CustomInput
Input de texto con validación visual y mensajes de error.

### BottomTabBar
Barra de navegación inferior con 5 tabs:
- Inicio (Home)
- Registrar (SleepTracking)
- Estadísticas (Statistics)
- Historial (History)
- Tips (Tips)

Características:
- Iconos Ionicons
- Estados activo/inactivo
- SafeAreaView integrado
- Navegación funcional

## 🔥 Firebase (Pendiente de Implementar)

### Servicios Preparados

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

**Nota**: Los datos de SleepTrackingScreen ya están preparados con el formato correcto para Firebase.

#### userService.js
- `createUserProfile()`: Crear perfil de usuario
- `getUserProfile()`: Obtener perfil
- `updateUserProfile()`: Actualizar perfil

## 🪝 Hooks Personalizados

### useAuth (Pendiente)
Gestión de autenticación:
```javascript
const { user, loading, signUp, signIn, logout } = useAuth();
```

### useSleepData (Pendiente)
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

## 📱 Pantallas Implementadas

### 1. HomeScreen ✅
- Tarjeta "Última noche" con gradiente
- Iconos de hora de dormir y despertar
- Estrella de calificación
- Promedio semanal con recuadros
- Botón "Registrar Sueño"
- Boxes de navegación a Estadísticas e Historial
- Barra de navegación inferior

### 2. SleepTrackingScreen ✅
- TimePickers para hora de dormir y despertar
- Botones +/- para ajustar tiempo (intervalos de 15 min)
- Cálculo automático de tiempo total
- Selector de calidad de sueño (5 estrellas)
- Campo de notas opcional
- Datos preparados para Firebase
- Registros recientes
- Barra de navegación inferior

### 3. StatisticsScreen ✅
- Placeholder para gráficos
- Barra de navegación inferior
- SafeAreaView implementado

### 4. HistoryScreen ✅
- Placeholder para lista de registros históricos
- Barra de navegación inferior
- SafeAreaView implementado

### 5. TipsScreen ✅
- Placeholder para consejos de sueño
- Barra de navegación inferior
- SafeAreaView implementado

### 6. ProfileScreen ✅
- Avatar de usuario
- Estadísticas personales
- Opciones de configuración
- Botón cerrar sesión
- Barra de navegación inferior

## 📦 Dependencias Instaladas

```json
{
  "@react-native-community/datetimepicker": "8.4.0",
  "expo": "~54.0.33",
  "expo-linear-gradient": "~14.0.1",
  "expo-status-bar": "~3.0.9",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "react-native-safe-area-context": "4.14.0"
}
```

## 🚀 Características Implementadas

- ✅ Navegación entre 6 pantallas
- ✅ Barra de navegación inferior personalizada
- ✅ SafeAreaView para notch/bordes del dispositivo
- ✅ Paleta de colores consistente
- ✅ Gradientes en tarjetas
- ✅ TimePickers funcionales
- ✅ Selector de calidad con estrellas
- ✅ Cálculo automático de horas de sueño
- ✅ Componentes reutilizables
- ✅ Estilos centralizados

## 🛠️ Próximos Pasos

### 1. Instalar Firebase
```bash
npm install firebase
```

### 2. Configurar Firebase
1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear nuevo proyecto
3. Copiar credenciales a `src/config/firebase.js`
4. Habilitar Authentication (Email/Password)
5. Crear Firestore Database

### 3. Implementar servicios de Firebase
- Conectar authService.js con Firebase Auth
- Conectar sleepService.js con Firestore
- Implementar hooks useAuth y useSleepData

### 4. Completar pantallas
- Statistics: Agregar gráficos de tendencias
- History: Mostrar lista de registros desde Firebase
- Tips: Agregar consejos personalizados basados en datos

### 5. Mejoras adicionales
- Notificaciones push para recordatorios
- Modo oscuro
- Exportar datos
- Compartir estadísticas

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
