<br/>

# PRUEBAS DE ACEPTACIÓN (FRONTEND)

<br/>

_____

## 1. Introducción
Durante este post nos centraremos en abarcar las pruebas que se requieren ejecutar para garantizar la calidad de los flujos de usuarios, los inputs de los usuarios y acciones del front de las aplicaciones web modernas que se depliegan en el banco.

Es muy importante aclara que estas pruebas se realizan en componentes reales, ya desplegados en ambientes Pre-Productivos y comunmente se conoces como _Acceptance Test_. Cuando nos referimos a este tipo de pruebas en el front de nuestra app, estas cumplen con los siguientes principios:
- Son orientadas a todos los componentes menos el backend
- Por cada criterio de aceptación debe existir al menos un test
- Probar código de la app, de forma rápida y automática, son muy apropiadas para las regresiones diarias

<br/>

También cabe mencionar las 3 fases en la Pirámide que son:

Unitarias
Integración
UI-E2E (Acceptance Test en el front)

_____

## 2. Herramienta
La herramienta que utilizaremos para realizar las pruebas de aceptación en el front es [PLAYWRIGHT](https://github.com/microsoft/playwright).

<center>

![Tech Radar Playwrihgt.png](/.attachments/Tech%20Radar%20Playwrihgt-df78f341-afb8-4e14-b5c5-a49f0e20b219.png)
_Fig.1. Playwrihgt se posiciona en el Radar del 2021 como Apps para adoptar By: [Thoughtworks](https://www.thoughtworks.com/radar/tools/playwright)_


</center>

Playwright es una librería de Node.js desarrollada por Microsoft para automatizar los flujos de una aplicación web en Chromium, Firefox y WebKit de forma confiable y rápida.

Playwright está diseñada para automatizar las Single Page Apps (SPA) y Progressive Web Apps que utilizan todas las capacidades que un navegador ofrece actualmente.

Algunas características son:
- Escenarios con múltiples páginas.
- Auto-waiting de los elementos del DOM hasta que estén listos para interactuar con ellos como click, escribir.
- Emular dispositivos móviles, geolocalización y permisos.
- Compatible con los siguientes lenguajes:
    
<center>

![Lenguajes Compatibles con Playwright.png](/.attachments/Lenguajes%20Compatibles%20con%20Playwright-90e6a725-685b-41c9-a003-51294c154cb7.png)

</center>


## 2.1 Runner
[Playwright Test Runner](https://github.com/microsoft/playwright-test) fue creado para satisfacer aquellas necesidades que se tienen al momento de ejecutar pruebas E2E o en nuestro caso de aceptación.

Con la implementación de este runner podemos:
 - Ejecutar los test en todos los browsers:
    - Chromium (Chrome y Edge).
    - Firefox.
    - Webkit (Safari).
- Ejecutar en paralelo.
- Tener un contexto aislado desde el principio sin configuraciones adicionales.
- Capturar videos y screenshots al momento de fallas.
- Integrar Page Object Model (POM) como fixtures.

### 2.2 Instalación
Para descargar las librerías de playwright solo basta con ejecutar el siguiente comando desde el proyecto de la aplicación, donde **playwright** comprende todo el core de la librería y los emuladores de los diferentes browsers y **@playwright/test** contiene las características del runner:
``` npm
npm i -D playwright @playwright/test
```
Al finalizar la descarga de las dependencias, el archivo _package.json_ debe quedar con las siguientes líneas: 

``` json
"devDependencies": {
    "@playwright/test": "^1.12.3",
    "playwright": "^1.12.3"
}
```
### 2.3 Estructura de las carpetas
```node
package.json
playwright.config.ts
src
acceptancetest/test/java
    |
    \--src
    |  |
    |  \--pages
    |  |  |
    |  |  +-- HomePage.ts
    |  |  
    |  \--resources
    |     |
    |     +--Login.json
    |
    \--test
      |
      +-- Home.spec.ts
```

## 3. Aplicaciones
### 3.1 POM

### 3.2 Validación Formulario

### 3.3 Uso de Fixture

### 3.4 Uso de Context

