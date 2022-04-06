[[_TOC_]]

<br/>

# PRUEBAS DE ACEPTACIÓN (FRONTEND)

<br/>

_____

## 1. Introducción
Durante este post nos centraremos en abarcar las pruebas que se requieren ejecutar para garantizar la calidad de los flujos de usuarios, los inputs de los usuarios y acciones del front de las aplicaciones web modernas que se despliegan en el banco.

Es muy importante aclarar que estas pruebas se realizan en componentes reales, ya desplegados en ambientes Pre-Productivos y comunmente se conocen como _Acceptance Test_. Cuando nos referimos a este tipo de pruebas en el front de nuestra app, estas cumplen con los siguientes principios:
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
El **framework** que utilizaremos para realizar las pruebas de aceptación en el front es [PLAYWRIGHT](https://github.com/microsoft/playwright) desarrollada por Microsoft.

<center>

![Tech Radar Playwrihgt.png](/.attachments/Tech%20Radar%20Playwrihgt-df78f341-afb8-4e14-b5c5-a49f0e20b219.png)
_Fig.1. **Playwright** se posiciona en el Radar del 2021 como Apps para adoptar By: [Thoughtworks](https://www.thoughtworks.com/radar/tools/playwright)_


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
_Fig.2. Lenguajes compatibles con Playwright_

</center>


## 2.1 Runner
[Playwright Test Runner](https://github.com/microsoft/playwright-test) fue creado para satisfacer aquellas necesidades que se tienen al momento de ejecutar pruebas E2E o en nuestro caso, de **aceptación**.

Con la implementación de este runner podemos:
 - Ejecutar los test en todos los browsers:
    - Chromium (Chrome y Edge).
    - Firefox.
    - Webkit (Safari).
- Ejecutar en paralelo.
- Tener un contexto aislado desde el principio sin configuraciones adicionales.
- Capturar videos y screenshots al momento de fallas.
- Integrar Page Object Model (POM) como fixtures.
- Solo re-ejecutar los test fallidos sin necesidad de ejecutar todo la suite de pruebas.

### 2.2 Instalación
Para descargar las librerías de playwright solo basta con ejecutar el siguiente comando desde el proyecto de la aplicación, donde **playwright** comprende todo el core de la librería y los emuladores de los diferentes browsers y **@playwright/test** contiene las características del runner:
``` npm
npm i -D playwright @playwright/test
```
Al finalizar la descarga de las dependencias, el archivo _package.json_ debe quedar con las siguientes líneas: 

``` json
"devDependencies": {
    "@playwright/test": "^1.17.1",
    "playwright": "^1.17.1"
}
```
### 2.3 Estructura de las carpetas
```node
package.json
playwright.config.ts
global-setup.ts
src
acceptancetest
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

###2.4 Configuración archivo playwright.config.ts

Por medio de este archivo se pueden realizar configuraciones generales para los test como especificar timeouts, cuándo realizar videos o screenshots, entre otros.

A continuación te mostramos la configuración básica que debe tener el proyecto para ejecutar los test.

```typescript
import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testMatch: "*.spec.ts",
  reporter: [
    ["list"],
    ["junit", { outputFile: "reports/xmlReport/results.xml" }],
    ["json", { outputFile: "reports/jsonReport/results.json" }],
    ["html", { outputFolder: "reports/htmlReport", open: "never" }],
  ],
  timeout: 600000,
  retries: 1,
  fullyParallel: true,
  use: {
    screenshot: "only-on-failure",
    video: "retry-with-video",
  },
};
export default config;


```

Para más detalle de todos los parámetros que se pueden configurar, ingresar a [documentación](https://playwright.dev/docs/test-configuration#testing-options) de playwright.


## 3. Demo en implementaciones

### 3.1 Creación de un test

#### 3.1.1 Codegen

Playwright trae consigo el comando codegen que permite crear un test por medio de Record and Play. Para utilizarlo solo basta con ejecutar el siguiente comando desde la terminal en la raíz del proyecto:

```node
npx playwright codegen <url>
```

Después de ejecutar este comando aparecerá en pantalla un navegador con la url especificada y una ventana donde se va escribiendo el test:

<center>

![Codegen.png](/.attachments/Codegen-daf6aa3a-4a79-4c85-b4f1-1002c776f8df.png)
_Fig.3. Playwright codegen_

</center>

______

#### 3.1.2 Manual

Por este modo simplemente es empezar a crear el test escribiendo código desde cero. Se debe tener en cuenta que playwright utiliza CSS selectors para encontrar los elementos e interactuar con los mismos.

##### 3.1.2.1 Css Selectors
<center>

|**Selector**|**Ejemplo**|**Descripción**|
|--|--|--|
| .class | .title | Selecciona los elementos que tengan la clase 'title' |
| .class1.class2 | .btn.primary | Selecciona los elementos que tengan las clases 'btn' y 'primary' |
| .class1 .class2 | .container .btn | Selecciona los elementos con la clase 'btn' que sean descendientes del elemento con clase 'container' |
| #id | #simulate | Selecciona el elemento con el id 'simulate' |
| element | span | Selecciona los elementos 'span' |
| element.class | div.container | Selecciona el elemento 'div' que tenga la clase 'container' |
| element > element | div > p | Selecciona los elementos 'p' que son hijos del elemento 'div' |
| [attribute='value'] | [data-test='firstname'] | Selecciona los elementos que tengan el atributo 'data-test' con el valor 'firstname' |



</center>

### 3.2 Page Object Model (POM)
En playwright se pueden implementar patrones de diseño, para nuestro caso vamos a usar el patrón POM con el fin de tener el proyecto más organizado y poderle dar mantenibilidad de forma más fácil.

#### 3.2.1 Ejemplo Page
```typescript
import { Locator, Page } from "playwright";

export class LogInPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly logInButton: Locator;
  readonly logInErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.logInButton = page.locator('[data-test="login-button"]');
    this.logInErrorMessage = page.locator('.error-message-container');
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async logIn(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.logInButton.click();
  }

  async getErrorMessageClassAttribute() {
    return await this.logInErrorMessage.getAttribute("class");
  }
}


```

#### 3.2.2 Sin POM
``` typescript
test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.fill('[data-test="username"]', "standard_user");
  await page.fill('[data-test="password"]', "secret_sauce");
  await page.click('[data-test="login-button"]');
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
  await page.click(".shopping_cart_link");
});

test(`Given I was logged in demosauce
    When I add two products to cart
    Then I will see two items in the cart`, async ({ page }) => {
  const items = await page.$$(".cart_item");
  expect(items).toHaveLength(3);
});

```

#### 3.2.3 Con POM
```typescript
const cartTest = base.extend<{ cartPage: CartPage }>({
  cartPage: async ({ page }, use) => {
    const logInPage = new LogInPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await logInPage.navigate("/");
    await logInPage.logIn("standard_user", "secret_sauce");
    await homePage.goToCart();
    await use(cartPage);
  },
});

cartTest(
  `Given I was logged in demosauce
    When I add two products to cart
    Then I will see two items in the cart`,
  async ({ cartPage }) => {
    cartTest.expect(await cartPage.getCartItems()).toHaveLength(3);
  }
);

cartTest(
  `Given I was logged in demosauce
    And I add two products to cart
    When I remove a product from the cart
    Then I will see one item in the cart`,
  async ({ cartPage }) => {
    cartTest.expect(await cartPage.getCartItems()).toHaveLength(3);
    await cartPage.removeItem("bolt-t-shirt");
    cartTest.expect(await cartPage.getCartItems()).toHaveLength(2);
  }
);

cartTest(
  `Given I had items in the cart
    When I finish the purchase
    Then I will see the message 'THANK YOU FOR YOUR ORDER'`,
  async ({ cartPage }) => {
    cartPage.completePurchase();

    cartTest
      .expect(await cartPage.getMessage())
      .toBe("THANK YOU FOR YOUR ORDER");
  }
);
```



### 3.3 Uso del Storage

Playwright al ser un fork de [puppeteer](https://pptr.dev), tiene la característica de poder interactuar con las cookies, el sessionStorage y localStorage del navegador; permitiendo que podamos cargar los test con estas memorias ya configuradas en un archivos JSON y ahorrarnos algunos pasos para llegar al punto que realmente queremos probar.

Para crear el JSON, se debe ejecutar el siguiente comando, y hacer los pasos que hacen que se creen los items en las memorias:
```npm
npx playwright open --save-storage=acceptancetest/src/resources/Login.json <url>
```

Para utilizar el archivo con codegen se ejecuta el siguiente comando:
```npm
npx playwright codegen --load-storage=acceptancetest/src/resources/Login.json <url>
```

Y finalmente para utilizarlo en los test, se debe agregar las siguientes líneas de código:

```typescript
test.use({
   storageState: "src/resources/Login.json",
});
```

### 3.4 Fixtures

Los fixtures son usados para crear un ambiente donde le entrega lo que necesita a cada test para su ejecución. Es importante resaltar que cada fixture es aislado, lo que permite que se agrupen los test por su finalidad y no por su configuración.

A continuación se puede observar la diferencia entre un test con la forma tradicional vs un test utilizando fixtures:

#### 3.4.1 Sin Fixture

```typescript
import { test }  from '@playwright/test';
import { TodoPage } = from './todo-page';

  beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo('item1');
    await todoPage.addToDo('item2');
  });

  afterEach(async () => {
    await todoPage.removeAll();
  });

  test('should add an item', async () => {
    await todoPage.addToDo('my item');
    // ...
  });

  test('should remove an item', async () => {
    await todoPage.remove('item1');
    // ...
  });
});
```

____

#### 3.4.2 Con Fixture

```typescript
import { test as base } from '@playwright/test';
import { TodoPage } from './todo-page';

const test = base.extend<{ todoPage: TodoPage }>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo('item1');
    await todoPage.addToDo('item2');
    await use(todoPage);
    await todoPage.removeAll();
  },
});

test('should add an item', async ({ todoPage }) => {
  await todoPage.addToDo('my item');
  // ...
});

test('should remove an item', async ({ todoPage }) => {
  await todoPage.remove('item1');
  // ...
});
```


____


## 4. Playwright en proyectos Angular

Los proyectos de pruebas de aceptación estarán alojados en el repositorio donde se encuentra el código fuente de la aplicación, por ende, estarán dentro de la estructura de los proyectos en angular, u otro framework como lo puede ser React, Vue, o proyectos web en .NET, python, entre otros. 


Resaltaremos el ejemplo en Angular, ya que la mayoria de aplicaciones web en el banco, estan en angular desde versiones 8 hasta las 11 (esto al 28/07/2021).


### 4.1. Estructura de carpetas en proyecto Angular:

```
acceptancetest
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
coverage
dist
node_modules
src
.browserlistrc
.editorconfig
.gitignore
angular.json
jest.config.js
package-lock.json
package.json
playwright.config.ts
README.md
setup-jest.ts
tsconfig.app.json
tsconfig.base.json
tsconfig.json
tsconfig.spec.json
tslint.json
```

Nota: En el archivo jest.config.js se debe agregar el valor `'<rootDir>/acceptancetest/',` a la propiedad: `testPathIgnorePatterns` esto con el fin de que las pruebas unitarias no choquen con las pruebas de aceptación en el front.


Nota2: Se tienen dos maneras de trabajar con los proyectos en Angular
1. Podemos tener el archivo de propiedades `playwright.config.ts` en la raiz del proyecto angular, y tener las dependencias `@playwright/test` y `playwright` en el package.json principal de angular. En la carpeta AcceptanceTest solo deberiamos tener las pruebas y sus archivos adicionales según necesidades.

2. Tambien podemos tener un proyecto aparte para las pruebas de aceptacion alojado en la carpeta `acceptancetest` con su respectivo **package.json** y **playwrigh.config.ts**. Es buena idea ya que el bundle de descarga será muy pequeño, pero mas adelante, lo mas probable es que se requiera en el proyecto angular, para el manejo de la `coverage` con el plugin de instabul, entonces se recomienda la #1. 

En caso de optar por la opción #2 la implementación en el pipeline CI/CD es como la mencionada en el punto [5.1](https://grupobancolombia.visualstudio.com/Vicepresidencia%20Servicios%20de%20Tecnolog%C3%ADa/_wiki/wikis/Vicepresidencia%20Servicios%20de%20Tecnolog%C3%ADa.wiki?wikiVersion=GBwikiMaster&_a=edit&pagePath=/Lineamientos%20Areas%20Transversales%20de%20TI/Pruebas%20Continuas%20de%20Software/Pir%C3%A1mide%20de%20Cohn/Pruebas%20de%20Aceptaci%C3%B3n/Pruebas%20de%20Aceptaci%C3%B3n%20(Frontend)&pageId=25293&anchor=5.1.-pipeline-ci/cd-promoviendo-proyecto-acceptancetest%3A) de este artículo.

### 4.2. package.json con las dependencias y scripts de playwright:

```json
{
  "name": "app-recovered-advanced",
  "version": "1.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "jest --coverage --reporters=default --reporters=jest-junit",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "acceptancetest": "npx playwright test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "postinstall": "ngcc"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~10.0.3",
    "@angular/cdk": "^10.1.3",
    "@angular/common": "~10.0.3",
    "@angular/compiler": "~10.0.3",
    "@angular/core": "~10.0.3",
    "@angular/forms": "~10.0.3",
    "@angular/material": "^10.1.3",
    "@angular/platform-browser": "~10.0.3",
    "@angular/platform-browser-dynamic": "~10.0.3",
    "@angular/router": "~10.0.3",
    "ngx-toastr": "^13.0.0",
    "rxjs": "~6.5.5",
    "tslib": "^2.0.0",
    "zone.js": "~0.10.3"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.1000.2",
    "@angular/cli": "~10.0.2",
    "@angular/compiler-cli": "~10.0.3",
    "@ngneat/spectator": "^6.1.2",
    "@playwright/test": "^1.13.0",
    "@testing-library/angular": "^10.6.0",
    "@testing-library/jest-dom": "^5.12.0",
    "@testing-library/user-event": "^13.1.9",
    "@types/jest": "^26.0.16",
    "@types/node": "^12.11.1",
    "codelyzer": "^6.0.0",
    "jest": "^26.6.3",
    "jest-cli": "^26.6.3",
    "jest-html-reporters": "^2.1.2",
    "jest-junit": "^11.1.0",
    "jest-preset-angular": "^8.3.2",
    "jest-sonar": "^0.2.11",
    "jest-watch-typeahead": "^0.6.1",
    "playwright": "^1.13.0",
    "ts-node": "~8.3.0",
    "tslint": "~6.1.0",
    "typescript": "~3.9.5"
  }
}
```

##5. DevOps para AcceptanceTest con Playwright

### 5.1. Pipeline CI/CD promoviendo proyecto AcceptanceTest:

```yaml
trigger:
- trunk
- feature/*

pool:
  name: Build
  demands:
  - npm
  - sh
  - java

steps:

  - task: SonarSource.sonarqube.15B84CA1-B62F-4A2A-A403-89B77A063157.SonarQubePrepare@4
    displayName: 'Prepare analysis on SonarQube'
    inputs:
        SonarQube: SonarWindows
        scannerMode: CLI
        configMode: manual
        cliProjectKey: '$(Build.Repository.Name)'
        cliProjectName: '$(Build.Repository.Name)'
        cliProjectVersion: '$(Build.BuildNumber)'
        cliSources: '$(System.DefaultWorkingDirectory)'
        extraProperties: |
            sonar.projectBaseDir=$(System.DefaultWorkingDirectory)
            sonar.exclusions=node_modules/**,coverage/**,reports/**,**/node_modules/**,**/*.js,
            sonar.tests=$(System.DefaultWorkingDirectory)/src/app
            sonar.test.inclusions=**/*.spec.ts
            sonar.testExecutionReportPaths=coverage/sonar-report.xml
            sonar.coverage.exclusions=test/**,*.test.ts,**/*.test.ts,*.spec.ts,__tests__/**
            sonar.sourceEncoding=UTF-8
            sonar.typescript.lcov.reportPaths=$(System.DefaultWorkingDirectory)/coverage/lcov.info

  - task: Npm@1
    displayName: 'npm cache clean'
    inputs:
      command: custom
      workingDir: .
      verbose: false
      customCommand: 'cache clean --force'

  - task: Npm@1
    displayName: 'npm set'
    inputs:
      command: custom
      workingDir: .
      verbose: false
      customCommand: 'set progress=false'
      customEndpoint: 'npm-bancolombia'

  - task: Npm@1
    displayName: 'npm install - restore node_modules'
    inputs:
      workingDir: .
      verbose: true
      customEndpoint: 'npm-bancolombia'

  - task: Npm@1
    displayName: 'ng build'
    inputs:
      command: custom
      workingDir: .
      verbose: false
      customCommand: 'run build'
      customEndpoint: 'npm-bancolombia'
    continueOnError: true

  - task: Npm@1
    displayName: 'Unit Test'
    inputs:
      command: custom
      workingDir: .
      verbose: false
      customCommand: 'run test'
      customEndpoint: 'npm-bancolombia'

  - task: PublishTestResults@2
    displayName: 'Publish Test Results unitarias $(System.DefaultWorkingDirectory)/junit.xml'
    inputs:
      testResultsFiles: '$(System.DefaultWorkingDirectory)/coverage/junit.xml'
      searchFolder: '$(System.DefaultWorkingDirectory)'
    condition: succeededOrFailed()

  - task: PublishCodeCoverageResults@1
    displayName: 'Publish code coverage unitarias'
    inputs:
      codeCoverageTool: Cobertura
      summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/report-jest.html'
      reportDirectory: '$(System.DefaultWorkingDirectory)/coverage/'

  - task: SonarSource.sonarqube.6D01813A-9589-4B15-8491-8164AEB38055.SonarQubeAnalyze@4
    displayName: 'Run Code Analysis'

  - task: sonar-buildbreaker@8
    displayName: 'Break if failure QualityGate in Sonar'
    inputs:
      SonarQube: 'SonarQube'

  - task: PublishBuildArtifacts@1
    displayName: 'Publish Artifact: Acceptance test'
    inputs:
      PathtoPublish: 'acceptancetest'
      ArtifactName: 'acceptancetest'

```

### 5.2. Release Management para Acceptancetest con Playwright:

![image.png](/.attachments/image-7338a069-994f-4fe5-9767-dd67217eef5a.png)

![image.png](/.attachments/image-cfa7453e-51ee-49b2-825e-108e22830ff5.png)

Reporte HTML: $(System.DefaultWorkingDirectory)/nombre_del_componente/acceptancetest/reports/htmlReport/index.html

![Captura de Pantalla 2021-12-13 a la(s) 10.13.27 a. m..png](/.attachments/Captura%20de%20Pantalla%202021-12-13%20a%20la(s)%2010.13.27%20a. m.-743f9320-6099-4628-bbc7-657ea7051fed.png)
<br> <br>