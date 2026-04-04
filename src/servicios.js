// 1. Definimos la estructura (Interface) para que TypeScript no se queje
/**
 * @typedef {Object} Servicio
 * @property {number} id
 * @property {string} nombre
 * @property {string[]} subservicios
 * @property {any} fotos
 * @property {string} [detalle]  <-- El corchete [ ] significa que es opcional
 */

// @ts-ignore
const contextoImagenes = require.context('./assets/trabajos', false, /\.(png|jpe?g|svg)$/);

const todasLasFotos = contextoImagenes.keys().map(contextoImagenes);

/** @type {Servicio[]} */ // <-- Aquí le decimos que este array contiene "Servicios"
export const serviciosPeluqueria = [
 {
    id: 1,
    nombre: 'Colorimetría',
    subservicios: ['Corrección de Color', 'Cobertura de Canas', 'Balayage', 'Baby Lights'],
    fotos: todasLasFotos.filter((/** @type {string} */ foto) => {
      // 1. Definimos las palabras clave dentro de la función
      const palabrasClave = ['balage', 'balayage', 'canas', 'baby', 'color', 'mechas'];
      
      // 2. Usamos .some() para ver si la foto coincide con alguna palabra
      // Usamos .toLowerCase() para que no importe si el archivo está en MAYÚSCULAS
      return palabrasClave.some(palabra => foto.toLowerCase().includes(palabra));
    }),
    detalle: 'Expertos en cambios de look y cuidado capilar.'
  },
{
    id: 2,
    nombre: 'Tratamiento Capilar',
    subservicios: ['Alisado', 'Botox', 'Hidratación', 'Cabellos Curlys', 'Nutrición'],
    fotos: todasLasFotos.filter((/** @type {string} */ foto) => {
      // 1. Agregamos palabras clave basadas en tus subservicios
      const palabrasClave = ['botox', 'alisado', 'hidratacion', 'curly', 'nutricion', 'tratamiento'];
      
      // 2. Buscamos coincidencias ignorando mayúsculas/minúsculas
      return palabrasClave.some(palabra => foto.toLowerCase().includes(palabra));
    }),
    detalle: 'Recupera la vitalidad de tu cabello con nuestros tratamientos.'
  },
{
    id: 3,
    nombre: 'Cortes de Cabello',
    subservicios: ['Corte Dama', 'Corte Varón', 'Corte Niños', 'Cambio de Look'],
    fotos: todasLasFotos.filter((/** @type {string} */ foto) => {
      // 1. Palabras clave que cubren todos tus tipos de corte
      const palabrasClave = ['corte', 'dama', 'varon', 'nino', 'look', 'barba', 'fade', 'tijera'];
      
      // 2. Filtramos ignorando mayúsculas y minúsculas
      return palabrasClave.some(palabra => foto.toLowerCase().includes(palabra));
    }),
    detalle: 'Cortes modernos y clásicos para toda la familia.'
  }
];