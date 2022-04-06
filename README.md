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