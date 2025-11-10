import { FormData } from '../src/types';

declare const jspdf: any;

const logoBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAA8AFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9UooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA+WPiT8Y/iB4T+IviLRdI1+OHTrC/lt4ImsbeQpGrYALEEn8TXMf8L++Lf8A0NI/8Flp/wDGqPG3/JWvFv8A2GLr/wBGtXLUAfQfwU+LnjnxZ8UdF0jXdcS602687zodsFuN22F2HzKoI5APIr6er40/Zq/5LZoP/b1/6TSV9l0AFFFFABRRRQB8jeNv+SteLf8A2MXX/o1q5aup8bf8la8W/wDYXuv/AEa1ctQB9Bfs1/8AJbNB/wC3r/0mkqW+/aQ17Q/FGuaHqnh/SbmXS9QnsjPazTws/lyMmSp3AZxnGRWd+zX/AMls0H/t6/8ASaSvn/4hf8lP8Uf9hi8/9HvQB7LqX7TOs3dlNBp/h3TdOuJFKLdCaWZ4s/xKCFGfoQa4LxZ8VfGXjSI2+s65M9kTlrG3Aghb/eVeG/4ETXFUUAFfUX7LHinUdY0DWtH1G7mvE0qSBraSZy7xpIJMx7jyQNnGeBkAcAV8u19Nfsj/wDIu+Jf+vq1/wDQZaAPf6KKKACiiigD5E8b/wDJWPFv/YXuv/RrVy1fTPib9nTwz4k8S6nrk+qaxBc6jcyXUqQyRFEdsZAJQnHHrXMf8MkeDP8AoM6//wB/4P8A43QBw37Nf/JbNB/7ev8A0mkr5/8AiF/yU/xR/wBhi8/9HvX2j8NfgdoXwz1uTVtI1HVbmd7doCt3JGUCsVJI2oD/AAjvXmGtfsi+Gda1m/1ObW9djlvriS5kWOWHYGdixA3Rk4yegoA+WK9v1b9mrxfpemXF7DPpWptAhka2tLh/OYDrtDoAT7ZzXaeHP2U/D+g6/Y6pHr+tzPZzrOsciQbGKkEA4QHHHrXvlAH5/EEEgggjgg9qSv0NuPAnhG5neafwroMsrsWd306EliTkkkrkmsbxJ8IfDOpaDqMGmeG9CsdQkt3W2uE0+MbJSp2tkLkYPNAHxVX01+yP8A8i74l/6+rX/0GWsA/so3oYgfEBsDpmw/P/lrXufwz+HFh8MtEuNL0u9vb2Ge4Nyz3hUsGKquBtAGMKP1oA6yiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z';

const drawCheckbox = (doc: any, x: number, y: number, checked: boolean) => {
  doc.rect(x, y, 3, 3);
  if (checked) {
    doc.text('X', x + 0.8, y + 2.5);
  }
};

const drawHeader = (doc: any) => {
  doc.setFontSize(8);
  doc.rect(10, 10, 40, 10);
  doc.text('Hoja de Vida: 01 de 01', 12, 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('HOJA DE VIDA', 105, 15, { align: 'center' });
  doc.setFontSize(10);
  doc.text('SISTEMA DE MEDICIÓN', 105, 20, { align: 'center' });

  doc.rect(160, 10, 40, 10);
  doc.addImage(logoBase64, 'JPEG', 161, 11, 38, 8);
};

const drawField = (doc: any, label: string, value: string, x: number, y: number, w: number, h: number) => {
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text(label, x, y - 1);
  doc.setFont('helvetica', 'normal');
  doc.rect(x, y, w, h);
  doc.text(value || '', x + 2, y + h / 1.5);
};

export const generatePdf = (data: FormData) => {
  const { jsPDF } = jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  const now = new Date().toISOString();

  // Page 1
  drawHeader(doc);
  
  doc.setFontSize(8);
  
  drawField(doc, 'Cédula Catastral del Predio', data.cedulaCatastral, 50, 28, 40, 6);
  drawField(doc, 'Código SIC de la frontera IMP-(Servicio Eléctrico)', data.codigoSicImp, 130, 28, 60, 6);
  drawField(doc, 'Código SIC de la Frontera EXP', data.codigoSicExp, 130, 38, 60, 6);
  drawField(doc, 'Código NIU de la Frontera', data.codigoNiu, 130, 48, 60, 6);
  
  // Section 1
  doc.rect(10, 60, 190, 40);
  doc.setFont('helvetica', 'bold');
  doc.text('1. REGISTRO DE NOVEDADES', 12, 65);
  doc.setFont('helvetica', 'normal');
  
  doc.text('1.1. Fecha de la ultima novedad:', 15, 70);
  doc.rect(15, 72, 40, 6);
  doc.text(data.novedad.fecha, 17, 76);
  
  doc.text('1.1.1. Fecha de la verificación Inicial:', 15, 82);
  doc.rect(15, 84, 40, 6);
  doc.text(data.novedad.fechaVerificacion, 17, 88);

  doc.text('1.3. Estado de la Frontera en el ASIC:', 15, 94);
  drawCheckbox(doc, 20, 97, data.estadoFrontera === 'Activa');
  doc.text('Activa', 24, 100);
  drawCheckbox(doc, 40, 97, data.estadoFrontera === 'Cancelada');
  doc.text('Cancelada', 44, 100);
  
  doc.text('1.2. Tipo de Novedad:', 80, 70);
  const novedades = [
      'Hoja de vida inicial-Verificación Inicial', 'Cambio de medidor principal', 'Cambio de medidor de respaldo',
      'Cambio de transformador de corriente', 'Cambio de transformador de tensión', 'Parametrización de medidor', 'Actualización hora'
  ];
  const novedadesCol2 = [
      'Visita de verificación', 'Cambio de modem', 'Mantenimiento programado', 'Lectura en sitio',
      'Adecuaciones en celda de medida', 'Otro - ¿Cuál?'
  ];
  novedades.forEach((n, i) => {
      drawCheckbox(doc, 80, 72 + i * 4, data.novedad.tipo === n);
      doc.text(n, 84, 74 + i * 4);
  });
  novedadesCol2.forEach((n, i) => {
      drawCheckbox(doc, 140, 72 + i * 4, data.novedad.tipo === n);
      doc.text(n, 144, 74 + i * 4);
      if(n.startsWith('Otro') && data.novedad.tipo === n) doc.text(data.novedad.otroTipo, 165, 96);
  });
  
  // Section 2
  doc.rect(10, 105, 190, 80);
  doc.setFont('helvetica', 'bold');
  doc.text('2. INFORMACIÓN GENERAL', 12, 110);
  doc.setFont('helvetica', 'normal');

  drawField(doc, '2.1. Nombre Frontera', data.infoGeneral.nombreFrontera, 15, 115, 80, 6);
  drawField(doc, '2.2. Nombre de Usuario', data.infoGeneral.nombreUsuario, 105, 115, 90, 6);
  drawField(doc, '2.3. Dirección', data.infoGeneral.direccion, 15, 125, 80, 6);
  drawField(doc, '2.4. Localización', data.infoGeneral.localizacion, 105, 125, 40, 6);
  drawField(doc, '2.5. Ciudad/Municipio', data.infoGeneral.ciudad, 155, 125, 40, 6);
  drawField(doc, '2.6. Coordenadas (Latitud)', data.infoGeneral.latitud, 15, 135, 80, 6);
  drawField(doc, '2.7. Coordenadas (Longitud)', data.infoGeneral.longitud, 105, 135, 90, 6);
  drawField(doc, '2.8. Departamento', data.infoGeneral.departamento, 15, 145, 40, 6);
  drawField(doc, '2.9. Agente RF', data.infoGeneral.agenteRf, 65, 145, 40, 6);
  drawField(doc, '2.10. Código SIC RF', data.infoGeneral.codigoSicRf, 115, 145, 20, 6);
  drawField(doc, '2.11. Exportador Físico', data.infoGeneral.exportadorFisico, 145, 145, 20, 6);
  drawField(doc, '2.12. Código SIC EXP', data.infoGeneral.codigoSicExp, 175, 145, 20, 6);
  drawField(doc, '2.13. Fecha de Registro (matricula)', data.infoGeneral.fechaRegistro, 15, 155, 40, 6);
  drawField(doc, '2.14. Tensión de Servicio (kV)', data.infoGeneral.tensionServicio, 65, 155, 40, 6);
  drawField(doc, '2.15. Capacidad Instalada (kVA)', data.infoGeneral.capacidadInstalada, 115, 155, 80, 6);

  // ... Continue drawing all fields for all pages. This is a truncated example for brevity.
  
  doc.addPage();
  // Page 2 - Medidor Principal Activa
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('3. MEDIDOR DE ENERGÍA ACTIVA - PRINCIPAL', 105, 15, { align: 'center' });

  drawField(doc, '3.3. Número de Serie', data.medidorPrincipalActiva.numeroSerie, 15, 25, 60, 6);
  drawField(doc, '3.4. Marca', data.medidorPrincipalActiva.marca, 85, 25, 50, 6);
  drawField(doc, '3.5. Modelo (Referencia)', data.medidorPrincipalActiva.modelo, 145, 25, 50, 6);
  // ... more fields from page 2

  doc.save(`c3-form-${now}.pdf`);
};
