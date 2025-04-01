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

## Crear componente BooksCatalog

## Crear componente global Modal

## Crear componente BookModal

## Mejorar la funcionalidad y naming de las funciones relacionadas con el componente de BooksSearchActions
Se ha eliminado la librería lodash, ya que es una librería pesada que solo se utilizaba para hacer un filter que podemos hacer utilizando js.
Se ha mejorado la lógica y el naming de las funciones de buscar, ordenar y mostrar libro en el modal en el componente BooksCatalog.
Se ha mejorado la lógica y el naming de los libros recientes del componente de BooksSearchActions.

## Mejorar la funcionalidad y naming de las funciones relacionadas con el componente de BookCard y BookModal
Se ha mejorado la lógica y el naming de las funciones de favoritos y cerrar modal en el componente BooksCatalog y BookModal.
Se ha mejorado la lógica y el diseño de las funciones de conseguir la imágen en el componente BookCard.

## Creado useBooksCatalog
Tener el componente BooksCatalog más limpio

## Creado booksUtils
Tener más limpios los componentes y poder reutilizar bien las funciones en varios componentes

## Utilizar el export directamente en la definición del componente

## Corregida regla de eslint

## Utilizar librería ya instalada React Query
Se ha creado un servicio donde hace la llamada para conseguir los libros
Se ha creado un custom hook donde se utiliza la lógica de React Query
Se ha modificado la función de ordenar ya que no servía como estaba hecho anteriormente

## Lógica y estilos de la funcionalidad vistos recientemente
Se ha hecho una animación para desplegar o ocultar el contendor que muestra los libros vistos recientemente

## Creado fichero http-client
Se ha creado el metodo GET, en un futuro sería fácil de escalar para POST, PUT y DELETE

## Mejorar la lógica del servicio de libros
Se ha hecho un mapping de la salida del servicio.
Se ha utilizado la función get del http-client.

## Creada utilidad getErrorMessage
Se ha creado esta utilidad para recibir un error de tipo string y devolver un error por defecto.

## Creado ShowMessage
Se ha creado un componente para mostrar un mensaje al usuario, como una información o un error.
Es escalable para soportar más estados.

## Creado Loader
Se ha hecho un spinner con scss para indicar al usuario que se están cargando los datos.

## Creado provider para la configuración por defecto de react query

## Creado utils global
Se ha creado un fichero de utils global para las funciones genércias.