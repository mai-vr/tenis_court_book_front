# Tenis Court Book

Aplicación para consultar clubes y reservar canchas de tenis. El sistema está compuesto por un front-end React/Vite y un back-end Rails con API JSON y back-office.

## Estructura

- `proyecto-frontend/`: aplicación desarrollada en React.
- `proyecto-backend/tenis_court_book/`: aplicación desarrollada en Rails.

El [README del back-end](https://github.com/mai-vr/tenis_court_book) contiene información adicional de sus rutas y modelos.

## Requisitos y versiones

Versiones verificadas de las tecnologías del proyecto:

| Componente        | Versión                                                 |
| ----------------- | ------------------------------------------------------- |
| Node.js           | 24.21.0                                                 |
| React / React DOM | 19.2.8                                                  |
| Vite              | 8.3.4                                                   |
| Cypress           | 16.2.1                                                  |
| Ruby              | 3.4.10 (`.ruby-version`)                                |
| Rails             | 8.1.3.1 (`Gemfile.lock`)                                |
| Bundler           | 2.6.9 (`Gemfile.lock`)                                  |
| SQLite            | Adaptador de desarrollo; gema `sqlite3` 2.9.6 bloqueada |
| PostgreSQL        | Adaptador configurado para producción                   |

También se necesita npm (incluido con Node.js) y, para Windows, RubyInstaller con Devkit. El back-end usa SQLite localmente; PostgreSQL se usa en producción.

## Instalación y ejecución

El front-end y el back-end se encuentran en repositorios separados.

### Back-end

Primero es necesario clonar el repositorio en el ambiente local:

```powershell
git clone https://github.com/mai-vr/tenis_court_book.git
```

Luego, en PowerShell:

```powershell
Set-Location ..\proyecto-backend\tenis_court_book
bundle install
bundle exec rails db:prepare
bundle exec rails db:seed
bundle exec rails server -p 3000
```

La aplicación queda en `http://localhost:3000`; la raíz abre el back-office. La API local usa el prefijo `/api/v1`.

### Front-end

En otra terminal, desde la raíz de `proyecto-frontend`:

```powershell
npm ci
npm run dev
```

Vite muestra la URL local, normalmente `http://127.0.0.1:5173/`.

**Conexión entre ambos proyectos:** Vite selecciona automáticamente la URL según el modo de ejecución. `npm run dev` carga `.env.development` y usa `http://localhost:3000/api/v1`; `npm run build` carga `.env.production` y usa `https://tenis-court-book.onrender.com/api/v1`. Si se modifica el host, actualizar el archivo de entorno correspondiente. Ambos archivos contienen solo URLs públicas, no secretos.

## Base de datos y datos de prueba

En desarrollo y test se usa SQLite:

- Desarrollo: `storage/development.sqlite3`.
- Test: `storage/test.sqlite3`.

`bundle exec rails db:prepare` crea la base si hace falta y aplica las migraciones. `bundle exec rails db:seed` carga clubes, ubicaciones, canchas y horarios de ejemplo, además de un usuario superadministrador local. Los datos se crean desde `db/seeds.rb`; la cuenta del seed es solo de demostración y no debe reutilizarse en producción. No se documentan aquí contraseñas de cuentas.

Para crear un usuario cliente, regístralo desde el front-end o utiliza `POST /api/v1/users`. Para crear un administrador local manualmente, define una clave solo para tu entorno y abre la consola Rails:

```powershell
$env:LOCAL_ADMIN_PASSWORD = "<clave-local-elegida>"
bundle exec rails console
```

En la consola:

```ruby
User.create!(
  first_name: "Admin",
  last_name: "Local",
  email_address: "admin@gmail.com",
  password: "pepe123",
  password_confirmation: "pepe123",
  role: :superadmin
)
```

Para un administrador de club, usa `role: :club_admin` y asocia un club existente con `club: Club.first!`.

## Variables de entorno

El back-end utiliza variables de entorno para configurar la base de datos, las credenciales de Rails, el envío de correos electrónicos y servicios externos.  
| Variable | Descripción |
|---|---|
| `DATABASE_URL` | URL de conexión a PostgreSQL en producción. |
| `RAILS_MASTER_KEY` | Clave utilizada para descifrar las credenciales de Rails. |
| `SECRET_KEY_BASE` | Clave utilizada por Rails para proteger sesiones y mecanismos criptográficos. |
| `BREVO_API_KEY` | API Key de Brevo para el envío de correos electrónicos mediante su API. |
| `CLOUDINARY_URL` | URL de conexión y autenticación de Cloudinary para la gestión de imágenes. |
| `SMTP_USERNAME` | Usuario SMTP para la autenticación en el servidor de correo. |
| `SMTP_PASSWORD` | Contraseña SMTP utilizada para el envío de correos electrónicos. |
| `WEB_CONCURRENCY` | Cantidad de procesos workers que ejecuta Puma en producción. |

Estas variables se configuran en el panel de Environment Variables de Render y no se almacenan en el repositorio.
En local, SQLite es el default y no hace falta definir `DATABASE_URL`.
El front-end utiliza VITE_API_URL para definir la URL base de la API del back-end. La configuración se encuentra en dos archivos, según el entorno:
| Variable | Archivo | Descripción |
|---|---|---|
| `VITE_API_URL` | `.env.development` | URL base de la API del back-end en desarrollo local (`http://localhost:3000/api/v1`). |
| `VITE_API_URL` | `.env.production` | URL base de la API del back-end desplegada en Render (`https://tenis-court-book.onrender.com/api/v1`). |

Ejemplo de configuración:
.env.development
VITE_API_URL=http://localhost:3000/api/v1

.env.production
VITE_API_URL=https://tenis-court-book.onrender.com/api/v1

Vite carga automáticamente el archivo correspondiente al modo de ejecución:

- npm run dev: utiliza .env.development.
- npm run build: utiliza .env.production.

## Pruebas, análisis y compilación

### Back-end

Desde `proyecto-backend/tenis_court_book`:

```sh
bundle exec rails test
bundle exec rubocop
bundle exec brakeman -q
```

Brakeman es un análisis estático de seguridad y RuboCop revisa estilo Ruby. Ambos están declarados en el `Gemfile` dentro de los grupos de desarrollo/test.

### Front-end

Desde `proyecto-frontend`:

```sh
npm run lint
npm run build
```

Para ejecutar Cypress, inicia primero Vite con `npm run dev -- --host 127.0.0.1` y, en otra terminal, ejecuta:

```sh
npx cypress run --spec cypress/e2e/auth.cy.js
```

## Deploy

- Back-end/API: `https://tenis-court-book.onrender.com`; el prefijo de API es `https://tenis-court-book.onrender.com/api/v1`.
- Front-end: En desarrollo se sirve desde `http://127.0.0.1:5173/`.
