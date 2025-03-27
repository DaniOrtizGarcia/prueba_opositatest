# Mejoras de código

### Eliminar fichero yarn.lock:

Voy a utilizar `npm`, es el gestor de paquetes que he utilizado siempre y es con el que más cómodo me siento.

### Fijar versiones exactas en package.json:

Se han eliminado los símbolos `^` y `~` de las versiones para tener las versiones fijadas en package.json y evitar actualizaciones automáticas.

### Cambios en el package-lock.json:

Se ha eliminado el `package-lock.json` y he hecho de nuevo el `npm install` por un problema de incompatibilidad con algunas dependencias entre Mac y Windows.

## Añadir configuración de eslint