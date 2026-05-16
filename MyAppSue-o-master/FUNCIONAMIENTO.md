# 🌙 MyAppSueño - Guía de Funcionamiento

## 📖 Descripción General

**MyAppSueño** es una aplicación móvil de seguimiento de sueño desarrollada con React Native y Expo. Permite a los usuarios registrar sus patrones de sueño, visualizar estadísticas y recibir consejos para mejorar la calidad del descanso.

## 🎯 Objetivo

Ayudar a los usuarios a entender y mejorar sus hábitos de sueño mediante el registro diario, análisis de datos y recomendaciones personalizadas.

---

## 📱 Navegación de la App

La aplicación utiliza una **barra de navegación inferior** con 5 secciones principales:

### 🏠 1. Inicio (Home)
**Ruta**: `HomeScreen`

**Funcionalidades**:
- **Resumen de última noche**: Tarjeta con gradiente morado-cian que muestra:
  - Duración del sueño (ej: 6.4h)
  - Hora de dormir (icono de cama 🛏️)
  - Hora de despertar (icono de sol ☀️)
  - Calificación con estrella ⭐
  
- **Promedio semanal**: Dos recuadros que muestran:
  - Calidad promedio (ej: 3.4/5)
  - Duración promedio (ej: 7.7h)
  
- **Botón "Registrar Sueño"**: Navega a SleepTracking
- **Boxes de acceso rápido**:
  - Ver estadísticas → Statistics
  - Ver historial → History

**Colores usados**:
- Gradiente: COLORS.primary → COLORS.secondary
- Texto: COLORS.textLight
- Estrella: COLORS.coral

---

### ➕ 2. Registrar (SleepTracking)
**Ruta**: `SleepTrackingScreen`

**Funcionalidades**:

#### ⏰ Hora de Dormir
- **TimePicker interactivo** con botones +/- 
- Incrementos de 15 minutos
- Valor por defecto: 23:30
- Label: "ME DORMÍ A"
- Color: COLORS.primary

#### 🌅 Hora de Despertar
- **TimePicker interactivo** con botones +/-
- Incrementos de 15 minutos
- Valor por defecto: 07:00
- Label: "ME DESPERTÉ A"
- Color: COLORS.textSecondary

#### 📊 Total Calculado
- Se calcula **automáticamente** al cambiar las horas
- Maneja correctamente el cambio de día
- Formato: "Xh Xm" (ej: 7h 30m)
- Fondo: COLORS.primaryLight con opacidad

#### ⭐ Calidad del Sueño
- **Selector de 5 estrellas** interactivo
- Valores:
  - 1 estrella = "Muy malo"
  - 2 estrellas = "Malo"
  - 3 estrellas = "Regular"
  - 4 estrellas = "Bueno"
  - 5 estrellas = "Excelente"
- Color activo: COLORS.accent (amarillo dorado)
- Color inactivo: COLORS.disabled

#### 📝 Notas Opcionales
- Campo de texto multilinea
- Placeholder: "¿Cómo te sentiste?"
- Uso de CustomInput component

#### 💾 Guardar Registro
- Botón que prepara los datos con el formato:
```javascript
{
  bedTime: "2026-05-01T23:30:00.000Z",
  wakeTime: "2026-05-02T07:00:00.000Z",
  duration: "7h 30m",
  quality: 4,
  notes: "Me sentí bien",
  date: "2026-05-02T03:45:00.000Z",
  userId: null // Se llenará con Firebase Auth
}
```
- **Estado actual**: Muestra datos en console.log
- **Pendiente**: Conectar con sleepService.createSleepRecord()

#### 📜 Registros Recientes
- Lista de registros anteriores (actualmente estático)
- Muestra fecha y duración

---

### 📊 3. Estadísticas (Statistics)
**Ruta**: `StatisticsScreen`

**Estado actual**: Pantalla placeholder

**Funcionalidades planeadas**:
- Gráficos de tendencias semanales/mensuales
- Promedio de horas dormidas
- Calidad promedio del sueño
- Mejores y peores días
- Patrones identificados
- Comparación con recomendaciones (7-9 horas)

**Librerías sugeridas**:
- `react-native-chart-kit`
- `react-native-svg`
- `victory-native`

---

### 🕐 4. Historial (History)
**Ruta**: `HistoryScreen`

**Estado actual**: Pantalla placeholder

**Funcionalidades planeadas**:
- Lista completa de todos los registros
- Ordenados por fecha (más recientes primero)
- Card por cada registro mostrando:
  - Fecha
  - Duración
  - Calidad (estrellas)
  - Horas de dormir/despertar
  - Notas
- Filtros por:
  - Fecha
  - Calidad
  - Duración
- Búsqueda de registros
- Opción de editar/eliminar registros

---

### 💡 5. Tips (Consejos)
**Ruta**: `TipsScreen`

**Estado actual**: Pantalla placeholder

**Funcionalidades planeadas**:
- Consejos generales de higiene del sueño
- Tips personalizados basados en:
  - Patrón de sueño del usuario
  - Calidad promedio
  - Problemas identificados
- Categorías:
  - 🌙 Preparación para dormir
  - 🏃 Ejercicio y sueño
  - ☕ Alimentación
  - 📱 Tecnología y pantallas
  - 🧘 Relajación
  - 🛏️ Ambiente para dormir

---

### 👤 6. Perfil (Profile)
**Ruta**: `ProfileScreen`

**Estado actual**: Implementado con datos estáticos

**Funcionalidades actuales**:
- Avatar con iniciales
- Nombre y email del usuario
- Estadísticas destacadas:
  - Promedio de sueño
  - Mejor racha
  - Calidad promedio
- Opciones de configuración:
  - Notificaciones
  - Tema oscuro
- Botón "Cerrar Sesión"

**Funcionalidades pendientes**:
- Conectar con Firebase Auth
- Editar perfil
- Cambiar foto de perfil
- Configuraciones funcionales
- Sincronización de datos

---

## 🎨 Sistema de Diseño

### Paleta de Colores

```javascript
PRIMARY: '#969AB4'        // Morado lavanda
SECONDARY: '#0179A5'     // Azul cian
ACCENT: '#E2B95C'        // Amarillo dorado
CORAL: '#D4655B'         // Coral
```

### Tipografía

- **Títulos**: `SIZES.font.xxxLarge` (32px)
- **Subtítulos**: `SIZES.font.large` (18px)
- **Texto regular**: `SIZES.font.regular` (16px)
- **Texto pequeño**: `SIZES.font.small` (12px)

### Espaciado

- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 20px
- **xxl**: 24px

### Bordes Redondeados

- **md**: 12px (Cards)
- **lg**: 16px (Botones grandes)

---

## 🔧 Componentes Reutilizables

### CustomButton
```javascript
<CustomButton 
  title="Texto del botón"
  onPress={() => console.log('Click')}
  variant="primary" // primary, secondary, outline
  size="large" // small, medium, large
  disabled={false}
/>
```

### Card
```javascript
<Card>
  <Text>Contenido de la tarjeta</Text>
</Card>
```

### CustomInput
```javascript
<CustomInput
  label="Nombre"
  placeholder="Ingresa tu nombre"
  value={value}
  onChangeText={setValue}
  error="Campo requerido"
/>
```

### BottomTabBar
```javascript
<BottomTabBar 
  navigation={navigation} 
  currentScreen="Home" 
/>
```

---

## 🔄 Flujo de Datos

### Estado Actual (Sin Firebase)

```
Usuario → UI → useState → console.log
```

### Flujo Planeado (Con Firebase)

```
Usuario → UI → useState → Service → Firebase → UI
```

**Ejemplo de flujo completo**:

1. Usuario ingresa hora de dormir → `setBedTime()`
2. Usuario ingresa hora de despertar → `setWakeTime()`
3. Se calcula automáticamente → `calculateTotalSleep()`
4. Usuario selecciona calidad → `setQuality()`
5. Usuario hace clic en "Guardar" → `handleSaveSleep()`
6. Se prepara objeto `sleepData`
7. **(Pendiente)** `sleepService.createSleepRecord(sleepData)`
8. **(Pendiente)** Firebase guarda en Firestore
9. **(Pendiente)** UI se actualiza con nuevo registro

---

## 🔐 Autenticación (Pendiente)

### Flujo de Login Planeado

1. Usuario ingresa email y password
2. `authService.signInWithEmail(email, password)`
3. Firebase valida credenciales
4. `useAuth` hook actualiza estado global
5. App.js renderiza AppNavigator o LoginScreen
6. Usuario ID se usa en todos los registros

### Flujo de Registro Planeado

1. Usuario completa formulario de registro
2. `authService.signUpWithEmail(email, password)`
3. Firebase crea usuario
4. `userService.createUserProfile(userId, data)`
5. Firestore guarda perfil de usuario
6. Navegación automática a HomeScreen

---

## 📂 Estructura de Datos en Firebase (Planeada)

### Colección: users
```javascript
{
  uid: "user123",
  email: "usuario@email.com",
  name: "Juan Pérez",
  createdAt: "2026-05-01T00:00:00.000Z",
  settings: {
    notifications: true,
    darkMode: false
  }
}
```

### Colección: sleepRecords
```javascript
{
  id: "record123",
  userId: "user123",
  bedTime: "2026-05-01T23:30:00.000Z",
  wakeTime: "2026-05-02T07:00:00.000Z",
  duration: "7h 30m",
  quality: 4,
  notes: "Me sentí bien",
  date: "2026-05-02T03:45:00.000Z"
}
```

---

## 🚀 Cómo Ejecutar la App

### Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar Expo
npm start

# Escanear QR con Expo Go app
# O presionar 'a' para Android / 'i' para iOS
```

### Estructura de Archivos

- **App.js**: Punto de entrada, envuelve todo en SafeAreaProvider
- **AppNavigator.js**: Maneja la navegación entre pantallas
- **Cada Screen**: Componente independiente con BottomTabBar

---

## ✅ Checklist de Implementación

### ✅ Completado
- [x] Estructura de carpetas
- [x] Paleta de colores personalizada
- [x] Componentes reutilizables (Button, Card, Input)
- [x] BottomTabBar con navegación
- [x] HomeScreen con diseño completo
- [x] SleepTrackingScreen con TimePickers
- [x] Selector de calidad con estrellas
- [x] Cálculo automático de tiempo de sueño
- [x] SafeAreaView en todas las pantallas
- [x] Gradientes en tarjetas
- [x] Navegación funcional entre pantallas

### ⏳ Pendiente
- [ ] Configurar Firebase
- [ ] Implementar authService
- [ ] Implementar sleepService
- [ ] Implementar hooks (useAuth, useSleepData)
- [ ] Pantalla de Login funcional
- [ ] Guardar registros en Firestore
- [ ] Cargar registros desde Firestore
- [ ] StatisticsScreen con gráficos
- [ ] HistoryScreen con lista de registros
- [ ] TipsScreen con consejos
- [ ] Editar/eliminar registros
- [ ] Notificaciones push
- [ ] Modo oscuro
- [ ] Exportar datos

---

## 🐛 Problemas Conocidos

1. **Error TypeScript en expo-linear-gradient**: No afecta funcionalidad
2. **Navegación temporal**: Se usa switch en lugar de React Navigation
3. **Datos estáticos**: Todos los registros son hardcoded hasta conectar Firebase

---

## 📚 Recursos Adicionales

- [Documentación de Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [Firebase Console](https://console.firebase.google.com/)
- [Ionicons](https://ionic.io/ionicons)
- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)

---

## 👨‍💻 Para Desarrolladores

### Agregar una Nueva Pantalla

1. Crear carpeta en `src/screens/NombrePantalla/`
2. Crear `NombrePantallaScreen.js` y `styles.js`
3. Importar SafeAreaView y BottomTabBar
4. Agregar ruta en `AppNavigator.js`
5. (Opcional) Agregar tab en `BottomTabBar.js`

### Usar Constantes

```javascript
import { COLORS, SIZES } from '../../constants';

// Usar en estilos
color: COLORS.primary,
fontSize: SIZES.font.large,
padding: SIZES.padding.md,
```

### Conectar con Firebase

1. Instalar: `npm install firebase`
2. Configurar en `src/config/firebase.js`
3. Implementar funciones en `src/services/`
4. Usar en pantallas via hooks o directamente

---

**Última actualización**: Mayo 2026
**Versión**: 1.0.0
