# 🚀 Cartas del Espacio - AR Game

Un juego interactivo de decisiones con narrativa ramificada, donde el jugador se comunica con un alien atrapado en el espacio a través de cartas proyectadas en Realidad Aumentada.

## 📖 Historia

Recibes una carta flotante en RA, escrita por un alien solitario llamado Zhur, atrapado en una estación abandonada. Zhur no sabe cómo llegó ahí y te escribe buscando ayuda para recuperar memoria y encontrar una salida. A medida que interactúas, Zhur empieza a contarte cosas extrañas... que conectan contigo. Tus decisiones afectan su destino y el desenlace.

## 🎮 Características

- **Narrativa ramificada**: 3 finales diferentes según tus decisiones
- **Sistema de diálogos**: Interacción a través de cartas holográficas en AR
- **Efectos visuales**: Cartas flotantes con efectos de luz suave
- **Sistema de puntuación**: Tu relación con Zhur afecta el final
- **Solo para Android**: Optimizado para dispositivos Android con ARCore

## 🛠️ Instalación

### Prerrequisitos

- Node.js (versión 18 o superior)
- Android Studio
- Un dispositivo Android con ARCore soportado
- React Native CLI

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd CartasDelEspacio
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar ViroReact**
   ```bash
   npm install @viro-community/react-viro
   ```

4. **Configurar Android**
   ```bash
   npx react-native run-android
   ```

### Configuración de Android

1. Asegúrate de que tu dispositivo Android tenga ARCore instalado
2. Habilita el modo desarrollador en tu dispositivo
3. Conecta tu dispositivo por USB y habilita la depuración USB

## 🎯 Cómo jugar

1. **Inicio**: Toca "Comenzar Aventura" en la pantalla principal
2. **AR**: Apunta tu cámara hacia una superficie plana
3. **Cartas**: Toca las cartas holográficas que aparecen flotando
4. **Decisiones**: Selecciona una de las opciones de respuesta
5. **Consecuencias**: Tus elecciones afectan la relación con Zhur
6. **Final**: Alcanza uno de los 3 finales posibles

## 📱 Controles

- **Tocar carta**: Selecciona una carta para leer
- **Tocar opción**: Selecciona tu respuesta
- **Mover cámara**: Explora el entorno AR
- **Volver**: Regresa al menú principal

## 🎨 Estilo Visual

- **Diseño minimalista**: Interfaz limpia y moderna
- **Colores espaciales**: Azul cian (#00ffff) y negro (#0a0a0a)
- **Efectos holográficos**: Cartas con transparencia y brillo
- **Partículas ambientales**: Efectos de espacio profundo

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── ARScene.tsx          # Escena principal de AR
│   ├── ARLetter.tsx         # Componente de carta holográfica
│   └── GameManager.tsx      # Gestor del juego
├── data/
│   └── storyData.ts         # Datos de la narrativa ramificada
└── assets/                  # Recursos gráficos
```

## 🎭 Sistema de Narrativa

El juego utiliza un sistema de nodos de historia que permite:

- **3 tipos de consecuencias**: Ayudar, Ignorar, Engañar
- **Sistema de puntuación**: -2 a +2 por decisión
- **Finales múltiples**: Basados en la puntuación total
- **Ramas dinámicas**: Las decisiones afectan el flujo de la historia

## �� Desarrollo

### Agregar nuevas cartas

1. Edita `src/data/storyData.ts`
2. Agrega nuevos nodos de historia
3. Conecta las opciones con los nodos correspondientes

### Modificar efectos visuales

1. Edita `src/components/ARLetter.tsx`
2. Modifica los materiales en `ViroMaterials.createMaterials`
3. Ajusta las posiciones y escalas

### Personalizar la interfaz

1. Edita `src/components/GameManager.tsx`
2. Modifica los estilos en `StyleSheet.create`
3. Ajusta los colores y tipografías

## 🚀 Despliegue

### Generar APK de release

```bash
cd android
./gradlew assembleRelease
```

### Configurar firma

1. Genera un keystore para firma
2. Configura `android/app/build.gradle`
3. Agrega las credenciales de firma

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:

- Abre un issue en GitHub
- Revisa la documentación de ViroReact
- Consulta la documentación de ARCore

## 🎯 Roadmap

- [ ] Más ramas de historia
- [ ] Efectos de sonido espaciales
- [ ] Modelos 3D de artefactos
- [ ] Multiidioma
- [ ] Modo offline
- [ ] Estadísticas de juego

---

**¡Disfruta explorando el espacio con Zhur!** 🛸✨
