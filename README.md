# AdminBarrio

**AdminBarrio** es un sistema integral de gestión de expensas y servicios para barrios y consorcios. Este MVP (Producto Mínimo Viable) está diseñado para facilitar la liquidación de expensas, la gestión de cobros y el control de servicios básicos como agua potable, gas y más.

## Funcionalidades del MVP

- **Gestión de Gastos**: Registro y categorización de gastos generales del barrio.
- **Gestión de Servicios**: Configuración y registro de servicios básicos como agua potable y gas.
- **Liquidación de Sueldos**: Cálculo automático y generación de recibos de sueldo.
- **Liquidación de Expensas**: Generación de expensas con desglose detallado y emisión de facturas.
- **Gestión de Cobros**: Registro de pagos, control de morosos y notificaciones automáticas.
- **Gestión de Usuarios**: Roles básicos para Administrador, Auditor e Intendente.

---

## Tecnologías Utilizadas

- **Frontend**: React con TypeScript.
- **Backend**: Laravel (PHP 8.1).
- **Base de Datos**: MySQL 8.
- **Contenedores**: Docker y Docker Compose.
- **Notificaciones**: Mailhog para pruebas de envío de correos en el entorno de desarrollo.

---

## Estructura del Proyecto

adminbarrio/
│
├── backend/          # Código del backend (Laravel)
├── frontend/         # Código del frontend (React)
├── database/         # Configuraciones y scripts de la base de datos
├── docker/           # Archivos específicos para la configuración de Docker
├── docker-compose.yml # Configuración de servicios Docker
└── README.md         # Documentación del proyecto

---

## Requisitos Previos

1. **Docker**: Asegúrate de tener Docker y Docker Compose instalados.
2. **Git**: Para clonar el repositorio y manejar versiones.

---

## Instalación y Configuración

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/tu-usuario/adminbarrio.git
   cd adminbarrio

	2.	Iniciar los Contenedores
Ejecuta el siguiente comando para levantar los servicios:

docker-compose up --build


	3.	Acceso al Sistema
	•	Frontend: http://localhost:3000
	•	Backend: http://localhost:8000
	•	Mailhog: http://localhost:8025
	4.	Configuración Adicional
	•	Accede al contenedor del backend para correr las migraciones de Laravel:

docker exec -it adminbarrio-backend bash
php artisan migrate
php artisan db:seed

Próximos Pasos
	•	Completar las migraciones y modelos básicos del backend.
	•	Desarrollar componentes básicos del frontend.
	•	Configurar el sistema de notificaciones y pruebas iniciales.

Contribuciones

Las contribuciones son bienvenidas. Por favor, crea un fork del repositorio, realiza los cambios y envía un pull request.

Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.