# 🌙 MyAppSueño - Seguimiento del Sueño

Aplicación móvil de **seguimiento del sueño** desarrollada con **React Native (Expo)** y **Firebase**.

## ✨ Características Implementadas

- ✅ **6 Pantallas funcionales** con navegación
- ✅ **Barra de navegación inferior** personalizada
- ✅ **TimePickers interactivos** para registro de sueño
- ✅ **Selector de calidad** con 5 estrellas
- ✅ **Cálculo automático** de tiempo de sueño
- ✅ **Gradientes en tarjetas** con LinearGradient
- ✅ **SafeAreaView** para notch y bordes del dispositivo
- 🎨 **Paleta de colores centralizada** (Morado lavanda principal)
- 🧩 **Componentes reutilizables** (Button, Card, Input, BottomTabBar)
- 📱 **Estructura escalable** con separación de responsabilidades
- 🔥 **Preparado para Firebase** (servicios listos para conectar)

## 📚 Documentación

- **[ESTRUCTURA.md](ESTRUCTURA.md)** - Arquitectura completa del proyecto
- **[FUNCIONAMIENTO.md](FUNCIONAMIENTO.md)** - Guía de uso y funcionalidades

## 📱 Pantallas

### 🏠 Home (Inicio)
- Tarjeta "Última noche" con gradiente morado-cian
- Promedio semanal con estadísticas
- Botón "Registrar Sueño"
- Accesos rápidos a Estadísticas e Historial

### ➕ SleepTracking (Registrar)
- TimePickers con botones +/- (intervalos de 15 min)
- Cálculo automático de duración
- Selector de calidad (5 estrellas)
- Notas opcionales
- Datos preparados para Firebase

### 📊 Statistics (Estadísticas)
- Pantalla lista para implementar gráficos
- Placeholder para análisis de datos

### 🕐 History (Historial)
- Pantalla lista para mostrar registros históricos
- Placeholder para lista completa

### 💡 Tips (Consejos)
- Pantalla lista para consejos personalizados
- Placeholder para recomendaciones

### 👤 Profile (Perfil)
- Avatar de usuario
- Estadísticas personales
- Opciones de configuración
- Botón cerrar sesión

## 📁 Estructura del Proyecto

```
src/
├── components/      # Componentes reutilizables
│   └── common/     # Button, Card, Input, BottomTabBar
├── config/         # Configuración (Firebase)
├── constants/      # Colores, tamaños, temas
├── hooks/          # Hooks personalizados (pendientes)
├── navigation/     # AppNavigator
├── screens/        # 6 pantallas implementadas
├── services/       # Auth, Sleep, User (pendientes)
├── styles/         # Estilos globales
└── utils/          # Utilidades y validadores
```

Ver [ESTRUCTURA.md](ESTRUCTURA.md) para documentación detallada.

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

### 3. Iniciar la aplicación

```bash
npm start
```

### 4. Escanear QR con Expo Go
- **Android**: Expo Go app desde Play Store
- **iOS**: Cámara o Expo Go app desde App Store

## 🔧 Configurar Firebase (Pendiente)

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear un nuevo proyecto
3. Habilitar Authentication (Email/Password)
4. Crear Firestore Database
5. Copiar credenciales y pegar en `src/config/firebase.js`:

```javascript
// src/config/firebase.js
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  // ... resto de configuración
};
```

6. Instalar Firebase:
```bash
npm install firebase
```

7. Descomentar código en los servicios (authService, sleepService, userService)

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

## 🎨 Sistema de Diseño

### Paleta de Colores

```javascript
import { COLORS } from './src/constants';

// Morado lavanda (principal)
COLORS.primary        // #969AB4
COLORS.primaryDark    // #6B6F8A
COLORS.primaryLight   // #B8BCCE

// Azul cian (secundario)
COLORS.secondary      // #0179A5

// Acento
COLORS.accent         // #E2B95C (Amarillo dorado)
COLORS.coral          // #D4655B (Coral)

// Texto
COLORS.text           // #2C3E50
COLORS.textSecondary  // #7F8C8D
COLORS.textLight      // #FFFFFF
```

### Tamaños

```javascript
import { SIZES } from './src/constants';

// Fuentes
SIZES.font.small      // 12px
SIZES.font.regular    // 16px
SIZES.font.large      // 18px
SIZES.font.xxxLarge   // 32px

// Espaciado
SIZES.padding.sm      // 8px
SIZES.padding.md      // 12px
SIZES.padding.lg      // 16px
SIZES.padding.xl      // 20px

// Bordes
SIZES.borderRadius.md // 12px
SIZES.borderRadius.lg // 16px
```

## 🧩 Uso de Componentes

### CustomButton

```javascript
import { CustomButton } from './src/components';

<CustomButton 
  title="Guardar Registro"
  onPress={handleSave}
  variant="primary" // primary, secondary, outline
  size="large"      // small, medium, large
  disabled={false}
/>
```

### Card

```javascript
import { Card } from './src/components';

<Card>
  <Text>Contenido de la tarjeta</Text>
</Card>
```

### CustomInput

```javascript
import { CustomInput } from './src/components';

<CustomInput
  label="Notas"
  placeholder="¿Cómo te sentiste?"
  value={notes}
  onChangeText={setNotes}
  multiline
  numberOfLines={4}
/>
```

### BottomTabBar

```javascript
import { BottomTabBar } from './src/components';

<BottomTabBar 
  navigation={navigation} 
  currentScreen="Home" 
/>
```

## 📚 Documentación Completa

- **[ESTRUCTURA.md](ESTRUCTURA.md)** - Arquitectura completa del proyecto, componentes, servicios y estructura de carpetas
- **[FUNCIONAMIENTO.md](FUNCIONAMIENTO.md)** - Guía detallada de cada pantalla, flujo de datos y uso de la aplicación

## 🛠️ Estado del Proyecto

### ✅ Implementado
- [x] Estructura escalable con separación de responsabilidades
- [x] 6 Pantallas funcionales con navegación
- [x] Barra de navegación inferior personalizada
- [x] Sistema de colores y tamaños centralizado
- [x] Componentes reutilizables (Button, Card, Input, BottomTabBar)
- [x] TimePickers interactivos con incrementos de 15 min
- [x] Cálculo automático de duración de sueño
- [x] Selector de calidad con 5 estrellas
- [x] Gradientes en tarjetas
- [x] SafeAreaView en todas las pantallas
- [x] Datos preparados para Firebase
- [x] Navegación entre todas las pantallas

### ⏳ Pendiente
- [ ] Configurar Firebase (Auth + Firestore)
- [ ] Implementar authService completo
- [ ] Implementar sleepService completo
- [ ] Crear hooks useAuth y useSleepData
- [ ] Pantalla de Login funcional
- [ ] Guardar registros en Firebase
- [ ] Cargar datos desde Firebase
- [ ] Gráficos en StatisticsScreen
- [ ] Lista completa en HistoryScreen
- [ ] Consejos personalizados en TipsScreen
- [ ] Editar/eliminar registros
- [ ] Notificaciones push
- [ ] Modo oscuro

## 💡 Ventajas de esta Estructura

- **Escalable**: Fácil agregar nuevas features sin refactorizar
- **Mantenible**: Código organizado por responsabilidad (components, screens, services)
- **Reutilizable**: Componentes y utilidades compartidas en toda la app
- **Consistencia visual**: Paleta de colores y tamaños centralizados
- **Preparado para producción**: Estructura profesional lista para conectar con Firebase
- **Documentación completa**: README, ESTRUCTURA y FUNCIONAMIENTO actualizados

## 📋 Requisitos del Sistema

- [Node.js](https://nodejs.org/) v16 o superior
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/client) en tu dispositivo móvil
- (Opcional) Cuenta de [Firebase](https://firebase.google.com/)

## 🐛 Solución de Problemas

### Error: "Cannot find module expo-linear-gradient"
```bash
npm install expo-linear-gradient
```

### Error: "SafeAreaView not found"
```bash
npm install react-native-safe-area-context
```

### La app no carga en Expo Go
1. Asegúrate de estar en la misma red WiFi
2. Escanea el QR nuevamente
3. Reinicia Expo: Ctrl+C y `npm start`

## 🤝 Contribuir

Este es un proyecto educativo. Para sugerencias o mejoras:

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📞 Soporte

Para preguntas sobre el proyecto, consulta:
- [ESTRUCTURA.md](ESTRUCTURA.md) - Arquitectura del proyecto
- [FUNCIONAMIENTO.md](FUNCIONAMIENTO.md) - Guía de uso

## 📄 Licencia

Este proyecto es para fines educativos - Administración de Proyectos, 7mo Semestre.
