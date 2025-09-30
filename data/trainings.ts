
import { Training } from '../types';

export const trainings: Training[] = [
  {
    id: 1,
    title: 'Clean Code: Escritura de Código Limpio',
    description: 'Aprende a escribir código legible, mantenible y eficiente siguiendo las prácticas de Clean Code.',
    progress: 67,
    enrollmentId: 101,
    completedConceptIds: [1, 2],
    concepts: [
        { id: 1, title: 'Nombres Significativos', description: 'Usa nombres que revelen la intención.' },
        { id: 2, title: 'Funciones Pequeñas', description: 'Las funciones deben ser cortas y hacer una sola cosa.' },
        { id: 3, title: 'Comentarios', description: 'Evita comentarios innecesarios; el código debe auto-documentarse.' },
    ]
  },
  {
    id: 2,
    title: 'Uso Efectivo de Variables',
    description: 'Domina las mejores prácticas para declarar, nombrar y gestionar variables en tus programas.',
    progress: 50,
    enrollmentId: 102,
    completedConceptIds: [1],
    concepts: [
      { id: 1, title: 'Declaración y Alcance', description: 'Entiende var, let y const.' },
      { id: 2, title: 'Nomenclatura', description: 'Convenciones de nombres para claridad.' },
    ],
  },
  {
    id: 3,
    title: 'Principios SOLID en Desarrollo de Software',
    description: 'Comprende y aplica los principios SOLID para diseñar software robusto y escalable.',
    progress: 80,
    enrollmentId: 103,
    completedConceptIds: [1, 2, 3, 4],
    concepts: [
        { id: 1, title: 'Principio de Responsabilidad Única (SRP)', description: 'Una clase debe tener una, y solo una, razón para cambiar.' },
        { id: 2, title: 'Principio Abierto/Cerrado (OCP)', description: 'Las entidades de software deben estar abiertas para extensión, pero cerradas para modificación.' },
        { id: 3, title: 'Principio de Sustitución de Liskov (LSP)', description: 'Los objetos de una superclase deben poder ser reemplazados por objetos de una subclase sin afectar la corrección del programa.' },
        { id: 4, title: 'Principio de Segregación de Interfaces (ISP)', description: 'Ningún cliente debe ser forzado a depender de métodos que no utiliza.' },
        { id: 5, title: 'Principio de Inversión de Dependencias (DIP)', description: 'Los módulos de alto nivel no deben depender de los módulos de bajo nivel. Ambos deben depender de abstracciones.' },
    ]
  },
  {
    id: 4,
    title: 'Patrones de Diseño en Programación',
    description: 'Familiarízate con los patrones de diseño más comunes para resolver problemas de desarrollo.',
    progress: 10,
    enrollmentId: 104,
    completedConceptIds: [],
    concepts: [
      { id: 1, title: 'Singleton', description: 'Asegura que una clase solo tenga una instancia y proporciona un punto de acceso global a ella.' },
      { id: 2, title: 'Factory', description: 'Crea objetos sin exponer la lógica de creación al cliente.' },
      { id: 3, title: 'Observer', description: 'Define una dependencia uno a muchos entre objetos.' },
    ]
  },
  {
    id: 5,
    title: 'Pruebas Unitarias y TDD',
    description: 'Aprende a escribir pruebas unitarias y a desarrollar software guiado por pruebas (TDD).',
    progress: 100,
    enrollmentId: 105,
    completedConceptIds: [1, 2, 3],
     concepts: [
      { id: 1, title: '¿Qué es una prueba unitaria?', description: 'Conceptos básicos y herramientas.' },
      { id: 2, title: 'Ciclo TDD: Red-Green-Refactor', description: 'El flujo de trabajo de Test-Driven Development.' },
      { id: 3, title: 'Mocks y Stubs', description: 'Aislando dependencias en las pruebas.' },
    ]
  },
  {
    id: 6,
    title: 'Refactorización de Código',
    description: 'Desarrolla habilidades para mejorar y optimizar código existente sin alterar su funcionalidad.',
    progress: 0,
    concepts: [
      { id: 1, title: 'Identificando "Code Smells"', description: 'Señales de que tu código necesita refactorización.' },
      { id: 2, title: 'Técnicas Comunes de Refactorización', description: 'Extraer método, renombrar variable, etc.' },
    ]
  },
  {
    id: 7,
    title: 'Metodologías Ágiles de Desarrollo',
    description: 'Explora Scrum, Kanban y otras metodologías para una gestión de proyectos más flexible y eficiente.',
    progress: 0,
    concepts: [
        { id: 1, title: 'Manifiesto Ágil', description: 'Valores y principios.' },
        { id: 2, title: 'Scrum', description: 'Roles, eventos y artefactos.' },
        { id: 3, title: 'Kanban', description: 'Visualizando el flujo de trabajo.' },
    ]
  },
  {
    id: 8,
    title: 'Introducción a la Computación en la Nube',
    description: 'Conoce los conceptos fundamentales de la nube, sus servicios principales y proveedores líderes.',
    progress: 0,
    concepts: [
        { id: 1, title: '¿Qué es la Nube?', description: 'Modelos de servicio (IaaS, PaaS, SaaS).' },
        { id: 2, title: 'Proveedores Principales', description: 'Introducción a AWS, Azure y GCP.' },
    ]
  },
  {
    id: 9,
    title: 'Fundamentos de Ciberseguridad',
    description: 'Aprende a proteger sistemas y datos de amenazas digitales con principios básicos de seguridad.',
    progress: 0,
    concepts: [
        { id: 1, title: 'Triada de la CIA', description: 'Confidencialidad, Integridad y Disponibilidad.' },
        { id: 2, title: 'Tipos de Amenazas', description: 'Malware, Phishing, etc.' },
    ]
  },
];