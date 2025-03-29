# Mejoras de código

### Eliminar fichero yarn.lock:

Voy a utilizar `npm`, es el gestor de paquetes que he utilizado siempre y es con el que más cómodo me siento.

### Fijar versiones exactas en package.json:

Se han eliminado los símbolos `^` y `~` de las versiones para tener las versiones fijadas en package.json y evitar actualizaciones automáticas.

### Cambios en el package-lock.json:

Se ha eliminado el `package-lock.json` y he hecho de nuevo el `npm install` por un problema de incompatibilidad con algunas dependencias entre Mac y Windows.

## Añadir configuración de eslint

## Cambiar los ficheros de book-list a kebab case

## Añadir sass
He decidido utilizar sass por varias razones:
-- La anidación: en un futuro me permitirá la utilización de buenas prácticas como `BEM`
-- Mixins: esto me permitirá hacer el scss más reutilizable y escalable

## Creación de los ficheros global.scss y _varibles.scss
El global.scss tendrá los estilos genéricos de toda la aplicación
En el fichero de _variables.scss tendremos todas las variables que se utilicen
En el fichero de configuración de vite, se ha añadido la configuración para que no sea necesario importar el fichero de variables.scss dentro de los otros fichero scss, sino que se importe automáticamente.

## Cambio de @import a @use porque @import está deprecado
Se ha cambiado el uso de @import por @use
Ahora las variables se utilizan variables.$variable
Solo se importa el fichero _variables.scss en vez de todo el documento global.scss

## Cambio de nombre del componente BooksList a BooksCatalog
Se ha cambiado el nombre para que sea más descriptivo.

## Eliminar errores, warnings y comentarios de código
Se han eliminado todos los errores y warning de eslint
Se ha creado un interface de Book
Se han eliminado los comentarios de código, más tarde se eliminarán los otros comentarios descriptivos, por ahora no se han borrado porque algunas funciones no tienen un naming descriptivo.

## Crear componente SearchBar
He creado el componente SearchBar en la carpeta components general ya que es un componente que se podría reutilizar en otras páginas.

## Crear componente BooksSearchActions
He creado el componente de las acciones como el mostrar recientes y la acción de ordenar.