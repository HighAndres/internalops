import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import bcrypt from 'bcryptjs'

const url = process.env.DATABASE_URL ?? 'file:./prisma/dev.db'
const adapter = new PrismaLibSql({ url })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding Mirmibug InternalOps...')

  await prisma.activityLog.deleteMany()
  await prisma.internalNote.deleteMany()
  await prisma.internalDocument.deleteMany()
  await prisma.clientAsset.deleteMany()
  await prisma.internalPendingItem.deleteMany()
  await prisma.internalRisk.deleteMany()
  await prisma.relatedTicket.deleteMany()
  await prisma.internalHistoryEntry.deleteMany()
  await prisma.client.deleteMany()
  await prisma.user.deleteMany()

  const hashedPassword = await bcrypt.hash('mirmibug2026', 10)

  const admin = await prisma.user.create({
    data: {
      name: 'Admin Mirmibug',
      email: 'admin@mirmibug.com',
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
    },
  })
  console.log('Usuario admin creado:', admin.email)

  const franslux = await prisma.client.create({
    data: {
      name: 'FRANSLUX',
      legalName: 'Franslux S.A.S.',
      contactName: 'Franco Suárez',
      contactEmail: 'franco@franslux.com',
      phone: '+57 310 555 0001',
      status: 'ACTIVE',
      notes: 'Cliente desde 2021. Infraestructura mixta on-premise y cloud.',
      ticketsClientSlug: 'franslux',
    },
  })

  const humanTalent = await prisma.client.create({
    data: {
      name: 'Human Talent',
      legalName: 'The Human Talent SAS',
      contactName: 'Andrés Celis',
      contactEmail: 'andres.celis@thehumantalent.com',
      phone: '+57 314 555 0002',
      status: 'ACTIVE',
      notes: 'Cliente estratégico. Plataforma de gestión de talento humano.',
      ticketsClientSlug: 'human-talent',
    },
  })

  const nalla = await prisma.client.create({
    data: {
      name: 'Nalla',
      legalName: 'Nalla Digital SAS',
      contactName: 'Laura Nalla',
      contactEmail: 'laura@nalladigital.com',
      phone: '+57 300 555 0003',
      status: 'ACTIVE',
      notes: 'E-commerce y presencia digital. Migración en curso.',
      ticketsClientSlug: 'nalla-digital',
    },
  })

  console.log('Clientes creados:', [franslux.name, humanTalent.name, nalla.name].join(', '))

  await prisma.internalHistoryEntry.createMany({
    data: [
      {
        clientId: franslux.id,
        title: 'Caída de servidor principal',
        type: 'INCIDENT',
        summary: 'El servidor primario presentó caída por sobrecalentamiento.',
        rootCause: 'Fallo en sistema de refrigeración del rack principal.',
        actionTaken: 'Reemplazo de ventiladores y migración temporal a servidor secundario.',
        result: 'Servicio restaurado en 4 horas.',
        impact: 'Interrupción de operaciones por 3.5 horas.',
        createdById: admin.id,
      },
      {
        clientId: franslux.id,
        title: 'Mantenimiento preventivo mensual',
        type: 'MAINTENANCE',
        summary: 'Mantenimiento preventivo programado de equipos de red.',
        actionTaken: 'Limpieza de equipos, actualización de firmware en switches.',
        result: 'Todo en orden. Firmware actualizado a versión 4.2.1.',
        createdById: admin.id,
      },
      {
        clientId: humanTalent.id,
        title: 'Reunión de planificación Q2',
        type: 'MEETING',
        summary: 'Reunión con equipo técnico para planificar proyectos del segundo trimestre.',
        details: 'Se discutieron migraciones de base de datos, mejoras de performance y plan de DR.',
        actionTaken: 'Aprobado roadmap técnico Q2. Asignados responsables.',
        createdById: admin.id,
      },
      {
        clientId: humanTalent.id,
        title: 'Despliegue versión 2.5.0',
        type: 'DEPLOYMENT',
        summary: 'Despliegue exitoso de la nueva versión de la plataforma.',
        details: 'Actualización mayor con módulo de reportes y mejoras de seguridad.',
        result: 'Despliegue exitoso en 45 minutos. Sin incidencias.',
        impact: 'Cero downtime gracias a despliegue blue-green.',
        createdById: admin.id,
      },
      {
        clientId: nalla.id,
        title: 'Migración a nueva plataforma cloud',
        type: 'DEPLOYMENT',
        summary: 'Inicio de migración de infraestructura on-premise a AWS.',
        rootCause: 'Costos operativos elevados y limitaciones de escalabilidad.',
        actionTaken: 'Configuración de VPC, EC2 y RDS en región us-east-1.',
        result: 'Fase 1 completada. Aplicación principal en cloud.',
        impact: 'Reducción estimada de costos del 35% a partir del próximo mes.',
        createdById: admin.id,
      },
      {
        clientId: nalla.id,
        title: 'Capacitación equipo en AWS',
        type: 'TRAINING',
        summary: 'Sesión de capacitación al equipo técnico de Nalla sobre gestión de AWS.',
        details: 'Temas: EC2, S3, RDS, CloudWatch, IAM básico.',
        result: '5 integrantes capacitados. Material entregado.',
        createdById: admin.id,
      },
    ],
  })

  await prisma.relatedTicket.createMany({
    data: [
      {
        clientId: franslux.id,
        externalTicketId: 'EXT-1001',
        externalTicketNumber: '#1001',
        title: 'Error en módulo de facturación',
        status: 'RESOLVED',
        priority: 'HIGH',
        category: 'Bug',
        assignedTo: 'Técnico A',
        requester: 'Franco Suárez',
        sourceSystem: 'Freshdesk',
        openedAt: new Date('2026-04-10'),
        closedAt: new Date('2026-04-12'),
      },
      {
        clientId: franslux.id,
        externalTicketId: 'EXT-1024',
        externalTicketNumber: '#1024',
        title: 'Solicitud de nuevo equipo para área contable',
        status: 'OPEN',
        priority: 'MEDIUM',
        category: 'Solicitud',
        assignedTo: 'Técnico B',
        requester: 'María López',
        sourceSystem: 'Freshdesk',
        openedAt: new Date('2026-04-28'),
      },
      {
        clientId: humanTalent.id,
        externalTicketId: 'EXT-2005',
        externalTicketNumber: '#2005',
        title: 'Performance lenta en módulo de reportes',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        category: 'Performance',
        assignedTo: 'Dev Senior',
        requester: 'Andrés Celis',
        sourceSystem: 'Jira',
        openedAt: new Date('2026-04-22'),
      },
      {
        clientId: nalla.id,
        externalTicketId: 'EXT-3012',
        externalTicketNumber: '#3012',
        title: 'Configurar dominio personalizado en CloudFront',
        status: 'PENDING',
        priority: 'MEDIUM',
        category: 'Configuración',
        assignedTo: 'Cloud Engineer',
        requester: 'Laura Nalla',
        sourceSystem: 'ClickUp',
        openedAt: new Date('2026-04-30'),
      },
    ],
  })

  await prisma.internalRisk.createMany({
    data: [
      {
        clientId: franslux.id,
        title: 'Servidor sin redundancia activa',
        description: 'El servidor de producción opera sin failover configurado.',
        severity: 'HIGH',
        status: 'OPEN',
        recommendation: 'Implementar servidor espejo con replicación automática.',
      },
      {
        clientId: franslux.id,
        title: 'Backups sin verificación periódica',
        description: 'Los backups no se verifican mensualmente, riesgo de datos corruptos.',
        severity: 'MEDIUM',
        status: 'MITIGATED',
        recommendation: 'Programar restauraciones de prueba mensuales.',
      },
      {
        clientId: humanTalent.id,
        title: 'Dependencia de un solo proveedor cloud',
        description: 'Toda la plataforma depende exclusivamente de un único proveedor.',
        severity: 'MEDIUM',
        status: 'ACCEPTED',
        recommendation: 'Evaluar estrategia multi-cloud o plan de contingencia.',
      },
      {
        clientId: nalla.id,
        title: 'Credenciales IAM con permisos excesivos',
        description: 'Usuarios IAM con políticas AdministratorAccess en cuenta de producción.',
        severity: 'CRITICAL',
        status: 'OPEN',
        recommendation: 'Aplicar principio de mínimo privilegio. Revisar todas las policies.',
      },
    ],
  })

  await prisma.internalPendingItem.createMany({
    data: [
      {
        clientId: franslux.id,
        title: 'Documentar topología de red actualizada',
        description: 'Crear diagrama de red post-expansión del data center.',
        priority: 'MEDIUM',
        status: 'OPEN',
        dueDate: new Date('2026-05-15'),
      },
      {
        clientId: franslux.id,
        title: 'Renovar licencias antivirus',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        dueDate: new Date('2026-05-10'),
      },
      {
        clientId: humanTalent.id,
        title: 'Implementar monitoreo de performance con Datadog',
        priority: 'HIGH',
        status: 'OPEN',
        dueDate: new Date('2026-05-20'),
      },
      {
        clientId: nalla.id,
        title: 'Corregir permisos IAM en producción',
        description: 'Urgente: resolver el riesgo crítico de IAM.',
        priority: 'URGENT',
        status: 'OPEN',
        dueDate: new Date('2026-05-05'),
      },
      {
        clientId: nalla.id,
        title: 'Configurar alertas de billing en AWS',
        priority: 'MEDIUM',
        status: 'OPEN',
      },
    ],
  })

  await prisma.clientAsset.createMany({
    data: [
      {
        clientId: franslux.id,
        name: 'Servidor Principal Franslux',
        type: 'SERVER',
        brand: 'Dell',
        model: 'PowerEdge R740',
        serialNumber: 'SN-DELL-001',
        ipAddress: '192.168.1.10',
        location: 'Rack A - Sede principal',
        status: 'ACTIVE',
      },
      {
        clientId: franslux.id,
        name: 'Switch Core Cisco',
        type: 'NETWORK_DEVICE',
        brand: 'Cisco',
        model: 'Catalyst 2960-X',
        ipAddress: '192.168.1.1',
        location: 'Rack A',
        status: 'ACTIVE',
      },
      {
        clientId: franslux.id,
        name: 'Laptop Gerencia',
        type: 'LAPTOP',
        brand: 'Lenovo',
        model: 'ThinkPad X1 Carbon',
        assignedTo: 'Franco Suárez',
        status: 'ACTIVE',
      },
      {
        clientId: humanTalent.id,
        name: 'Instancia EC2 Producción',
        type: 'SERVER',
        brand: 'AWS',
        model: 'c5.2xlarge',
        ipAddress: '10.0.1.50',
        location: 'AWS us-east-1',
        status: 'ACTIVE',
      },
      {
        clientId: humanTalent.id,
        name: 'RDS PostgreSQL Principal',
        type: 'SERVER',
        brand: 'AWS',
        model: 'db.r5.large',
        location: 'AWS us-east-1',
        status: 'ACTIVE',
        notes: 'Multi-AZ habilitado',
      },
      {
        clientId: nalla.id,
        name: 'EC2 Web Server',
        type: 'SERVER',
        brand: 'AWS',
        model: 't3.medium',
        location: 'AWS us-east-1',
        status: 'ACTIVE',
      },
      {
        clientId: nalla.id,
        name: 'Dominio nalladigital.com',
        type: 'LICENSE',
        brand: 'GoDaddy',
        status: 'ACTIVE',
        notes: 'Vence enero 2027',
      },
    ],
  })

  await prisma.internalDocument.createMany({
    data: [
      {
        clientId: franslux.id,
        title: 'Procedimiento de recuperación ante desastres',
        category: 'DR / BCP',
        content:
          'En caso de fallo total del servidor principal:\n1. Activar servidor espejo en rack B.\n2. Redirigir DNS a IP de failover (192.168.1.20).\n3. Notificar al cliente via WhatsApp Business.\n4. Documentar incidente en InternalOps.\nTiempo objetivo de recuperación: 4 horas.',
        tags: 'DR, BCP, servidor, recovery',
      },
      {
        clientId: humanTalent.id,
        title: 'Guía de despliegue a producción',
        category: 'DevOps',
        content:
          'Pasos para desplegar a producción:\n1. Crear PR desde develop a main.\n2. Aprobar CI/CD pipeline.\n3. Ejecutar migraciones de base de datos.\n4. Deploy blue-green vía GitHub Actions.\n5. Verificar health checks.\n6. Monitorear logs por 30 minutos.',
        tags: 'deploy, CI/CD, GitHub Actions',
      },
      {
        clientId: nalla.id,
        title: 'Arquitectura AWS - Diagrama y descripción',
        category: 'Infraestructura',
        content:
          'Componentes activos:\n- EC2 t3.medium: servidor web (nginx + Node.js)\n- RDS MySQL db.t3.small: base de datos\n- S3 bucket: almacenamiento estático\n- CloudFront: CDN\n- Route53: DNS\n\nTodo en VPC privada us-east-1.',
        tags: 'AWS, arquitectura, cloud',
      },
    ],
  })

  await prisma.internalNote.createMany({
    data: [
      {
        clientId: franslux.id,
        title: 'Consideraciones para renovación de contrato',
        content:
          'El contrato actual vence en agosto 2026. Franco indicó interés en ampliar el alcance para incluir soporte de aplicaciones. Preparar propuesta antes de junio.',
      },
      {
        clientId: humanTalent.id,
        title: 'Contactos técnicos del cliente',
        content:
          'CTO: Andrés Celis (andres.celis@thehumantalent.com)\nDev Lead: persona por confirmar\nOps: Equipo interno de 2 personas\nPreferencia de contacto: Slack o WhatsApp para urgencias.',
      },
      {
        clientId: nalla.id,
        title: 'Notas de onboarding',
        content:
          'Cliente nuevo (Q1 2026). Migración desde hosting compartido a AWS en curso. Laura es muy técnica, prefiere comunicación detallada. Evitar términos muy básicos.',
      },
    ],
  })

  console.log('Seed completado exitosamente.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
