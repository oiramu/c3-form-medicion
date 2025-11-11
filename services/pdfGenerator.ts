import { FormData, MedidorData, Sello, TransformadorData, ConductorData, ComunicacionData } from '../types';

declare const jspdf: any;

const logo = 'data:image/jpeg;base64,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';

const drawCheckbox = (doc: any, x: number, y: number, checked: boolean) => {
  doc.rect(x, y, 3, 3, 'S');
  if (checked) {
    doc.setFont('zapfdingbats', 'normal');
    doc.text('4', x + 1.5, y + 2.5, { align: 'center'});
    doc.setFont('helvetica', 'normal');
  }
};

const drawHeader = (doc: any, page: number, totalPages: number) => {
  doc.setFontSize(8);
  doc.rect(10, 10, 40, 10);
  doc.text(`FORMATO: ${String(page).padStart(2, '0')} de ${String(totalPages).padStart(2, '0')}`, 12, 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('C3', 105, 15, { align: 'center' });
  doc.setFontSize(10);
  doc.text('SISTEMA DE MEDICIÓN', 105, 20, { align: 'center' });

  doc.rect(160, 10, 40, 10);
  doc.addImage(logo, 'JPEG', 161, 11, 38, 8);
};

const drawField = (doc: any, label: string, value: string, x: number, y: number, w: number, h: number) => {
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.text(label, x, y - 1);
  doc.setFont('helvetica', 'normal');
  doc.rect(x, y, w, h);
  doc.text(value || '', x + 2, y + h / 1.5);
};

const drawMedidorSection = (doc: any, medidor: MedidorData, title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(title, 105, 30, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    
    doc.rect(10, 35, 190, 240);

    drawField(doc, '3.1. Ubicación', medidor.ubicacion, 15, 45, 60, 6);
    drawField(doc, '3.2. Propiedad', medidor.propiedad, 85, 45, 50, 6);
    drawField(doc, '3.3. Número de Serie', medidor.numeroSerie, 145, 45, 50, 6);

    drawField(doc, '3.4. Marca', medidor.marca, 15, 58, 60, 6);
    drawField(doc, '3.5. Modelo (Referencia)', medidor.modelo, 85, 58, 50, 6);
    drawField(doc, '3.6. Fabricante', medidor.fabricante, 145, 58, 50, 6);

    drawField(doc, '3.7. Año de Fabricación', medidor.anoFabricacion, 15, 71, 60, 6);
    drawField(doc, '3.8. Proveedor', medidor.proveedor, 85, 71, 110, 6);

    drawField(doc, '3.9. Tecnología', medidor.tecnologia, 15, 84, 60, 6);
    drawField(doc, '3.10. Tipo de Conexión', medidor.conexion, 85, 84, 50, 6);
    drawField(doc, '3.11. No. de elementos de la Conexión', medidor.numElementosConexion, 145, 84, 50, 6);
    
    drawField(doc, '3.12. Sentido de la medición', medidor.sentidoMedicion, 15, 97, 60, 6);
    drawField(doc, '3.13. No. Hilos', medidor.numHilos, 85, 97, 50, 6);
    drawField(doc, '3.14. No. Fases', medidor.numFases, 145, 97, 50, 6);

    drawField(doc, '3.15. Tipo de Registrador', medidor.tipoRegistrador, 15, 110, 60, 6);
    drawField(doc, '3.16. Cantidad de Enteros', medidor.cantidadEnteros, 85, 110, 50, 6);
    drawField(doc, '3.17. Cantidad de Decimales', medidor.cantidadDecimales, 145, 110, 50, 6);
    
    drawField(doc, '3.18. Tensión Nominal (V)', medidor.tensionNominal, 15, 123, 60, 6);
    drawField(doc, '3.19. Ind. Clase de Exactitud', medidor.indClase, 85, 123, 50, 6);
    drawField(doc, '3.20. Constante del Medidor', medidor.constante, 145, 123, 50, 6);

    drawField(doc, '3.21. Unidad Constante', medidor.unidadConstante, 15, 136, 60, 6);
    drawField(doc, '3.22. Frecuencia (Hz)', medidor.frecuencia, 85, 136, 50, 6);
    drawField(doc, '3.23. Ib (A)', medidor.lb, 145, 136, 50, 6);

    drawField(doc, '3.24. Imax (A)', medidor.imax, 15, 149, 60, 6);
    drawField(doc, '3.25. In (A)', medidor.in, 85, 149, 50, 6);

    // Seals table
    doc.setFont('helvetica', 'bold');
    doc.text('3.26. Sellos del Medidor', 15, 162);
    const tableHeader = ['UBICACIÓN', 'SERIE No.', 'TIPO', 'COLOR', 'FECHA INST.', 'FECHA RET.', 'PROPIEDAD'];
    const colWidths = [30, 30, 20, 20, 30, 30, 20];
    let x = 15;
    doc.setFontSize(7);
    tableHeader.forEach((header, i) => {
        doc.rect(x, 165, colWidths[i], 5, 'S');
        doc.text(header, x + colWidths[i] / 2, 168, { align: 'center' });
        x += colWidths[i];
    });

    let y = 170;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    (medidor.sellos || []).forEach(sello => {
        x = 15;
        const rowData = [sello.ubicacion, sello.serie, sello.tipo, sello.color, sello.fechaInstalacion, sello.fechaRetiro, sello.propiedad];
        rowData.forEach((cell, i) => {
            doc.rect(x, y, colWidths[i], 5, 'S');
            doc.text(cell, x + 2, y + 3);
            x += colWidths[i];
        });
        y += 5;
    });
     // Draw empty rows for the rest of the table
    for(let i=(medidor.sellos || []).length; i<10; i++) {
        x = 15;
        colWidths.forEach((w) => {
            doc.rect(x, y, w, 5, 'S');
            x += w;
        });
        y += 5;
    }

};

const drawTransformadorSection = (doc: any, transformadores: { faseR: TransformadorData, faseS: TransformadorData, faseT: TransformadorData }, title: string, isTension: boolean) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(title, 105, 30, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.rect(10, 35, 190, 240);

    const phases = ['faseR', 'faseS', 'faseT'];
    const phaseLabels = ['FASE R', 'FASE S', 'FASE T'];
    let y = 40;

    phases.forEach((phase, index) => {
        const data = (transformadores as any)[phase];
        doc.setFont('helvetica', 'bold');
        doc.text(phaseLabels[index], 15, y);
        doc.setFont('helvetica', 'normal');
        y += 5;

        drawField(doc, 'Número de Serie', data.numeroSerie, 15, y, 60, 6);
        drawField(doc, 'Modelo', data.modelo, 85, y, 50, 6);
        drawField(doc, 'Fabricante', data.fabricante, 145, y, 50, 6);
        y += 13;

        drawField(doc, 'Burden (VA)', data.burden, 15, y, 60, 6);
        drawField(doc, 'Cargas de Compensación (VA)', data.cargasCompensacion, 85, y, 50, 6);
        drawField(doc, 'Frecuencia (Hz)', data.frecuencia, 145, y, 50, 6);
        y += 13;
        
        drawField(doc, 'Clase de Exactitud', data.claseExactitud, 15, y, 60, 6);
        drawField(doc, 'Relación de Transformación', data.relacionTransformacion, 85, y, 50, 6);

        if (isTension) {
            drawField(doc, 'Tensión Primaria Nominal (V)', data.tensionPrimariaNominal, 145, y, 50, 6);
        } else {
            drawField(doc, 'Corriente Térmica (kA)', data.corrienteTermica, 145, y, 50, 6);
        }
        y += 13;
        
        if (isTension) {
            drawField(doc, 'Tensión Secundaria Nominal (V)', data.tensionSecundariaNominal, 15, y, 60, 6);
        } else {
            drawField(doc, 'Corriente Dinámica (kA)', data.corrienteDinamica, 15, y, 60, 6);
            drawField(doc, 'Corriente Primaria Nominal (A)', data.corrientePrimariaNominal, 85, y, 50, 6);
            drawField(doc, 'Corriente Secundaria Nominal (A)', data.corrienteSecundariaNominal, 145, y, 50, 6);
        }
        y += 20;

    });
};

export const generatePdf = (data: FormData) => {
  const { jsPDF } = jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  const now = new Date().toISOString();
  const totalPages = 10;
  let page = 1;

  // Page 1
  drawHeader(doc, page++, totalPages);
  doc.setFontSize(8);
  drawField(doc, 'Código del Cliente', data.codigoCliente, 50, 28, 40, 6);
  drawField(doc, 'Código SIC de la frontera IMP-(Servicio Eléctrico)', data.codigoSicImp, 130, 28, 60, 6);
  drawField(doc, 'Código SIC de la Frontera EXP', data.codigoSicExp, 130, 38, 60, 6);
  drawField(doc, 'Código NIU de la Frontera', data.codigoNiu, 130, 48, 60, 6);
  
  doc.rect(10, 60, 190, 45);
  doc.setFont('helvetica', 'bold');
  doc.text('1. REGISTRO DE NOVEDADES', 12, 65);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  
  drawField(doc, '1.1. Fecha de la ultima novedad', data.novedad.fecha, 15, 70, 40, 6);
  drawField(doc, '1.1.1. Fecha de la verificación Inicial', data.novedad.fechaVerificacion, 15, 82, 40, 6);

  doc.text('1.3. Estado de la Frontera en el ASIC:', 15, 96);
  drawCheckbox(doc, 20, 99, data.estadoFrontera === 'Activa');
  doc.text('Activa', 24, 102);
  drawCheckbox(doc, 40, 99, data.estadoFrontera === 'Cancelada');
  doc.text('Cancelada', 44, 102);
  
  doc.text('1.2. Tipo de Novedad:', 75, 70);
  const novedades = ['Hoja de vida inicial-Verificación Inicial', 'Cambio de medidor principal', 'Cambio de medidor de respaldo', 'Cambio de transformador de corriente', 'Cambio de transformador de tensión', 'Parametrización de medidor', 'Actualización hora'];
  const novedadesCol2 = ['Visita de verificación', 'Cambio de modem', 'Mantenimiento programado', 'Lectura en sitio', 'Adecuaciones en celda de medida', 'Otro - ¿Cuál?'];
  
  novedades.forEach((n, i) => {
      drawCheckbox(doc, 75, 72 + i * 4, !!data.novedad.tipos[n]);
      doc.text(n, 79, 74 + i * 4);
  });
  novedadesCol2.forEach((n, i) => {
      drawCheckbox(doc, 135, 72 + i * 4, !!data.novedad.tipos[n]);
      doc.text(n, 139, 74 + i * 4);
      if(n.startsWith('Otro') && !!data.novedad.tipos[n]) doc.text(data.novedad.otroTipo, 160, 96);
  });
  
  doc.rect(10, 110, 190, 85);
  doc.setFont('helvetica', 'bold');
  doc.text('2. INFORMACIÓN GENERAL', 12, 115);
  doc.setFont('helvetica', 'normal');

  drawField(doc, '2.1. Nombre Frontera', data.infoGeneral.nombreFrontera, 15, 120, 80, 6);
  drawField(doc, '2.2. Nombre de Usuario', data.infoGeneral.nombreUsuario, 105, 120, 90, 6);
  drawField(doc, '2.3. Dirección', data.infoGeneral.direccion, 15, 132, 80, 6);
  drawField(doc, '2.4. Localización', data.infoGeneral.localizacion, 105, 132, 40, 6);
  drawField(doc, '2.5. Ciudad/Municipio', data.infoGeneral.ciudad, 155, 132, 40, 6);
  drawField(doc, '2.6. Coordenadas (Latitud)', data.infoGeneral.latitud, 15, 144, 80, 6);
  drawField(doc, '2.7. Coordenadas (Longitud)', data.infoGeneral.longitud, 105, 144, 90, 6);
  drawField(doc, '2.8. Departamento', data.infoGeneral.departamento, 15, 156, 40, 6);
  drawField(doc, '2.9. Agente RF', data.infoGeneral.agenteRf, 65, 156, 40, 6);
  drawField(doc, '2.10. Código SIC RF', data.infoGeneral.codigoSicRf, 115, 156, 20, 6);
  drawField(doc, '2.11. Exportador Físico', data.infoGeneral.exportadorFisico, 145, 156, 20, 6);
  drawField(doc, '2.12. Código SIC EXP', data.infoGeneral.codigoSicExp, 175, 156, 20, 6);
  drawField(doc, '2.13. Fecha de Registro (matricula)', data.infoGeneral.fechaRegistro, 15, 168, 40, 6);
  drawField(doc, '2.14. Tensión de Servicio (kV)', data.infoGeneral.tensionServicio, 65, 168, 40, 6);
  drawField(doc, '2.15. Capacidad Instalada (kVA)', data.infoGeneral.capacidadInstalada, 115, 168, 80, 6);
  drawField(doc, '2.16. Tipo de conexión del usuario', data.infoGeneral.conexion, 15, 180, 40, 6);
  drawField(doc, '2.17. Clase de servicio', data.infoGeneral.claseServicio, 65, 180, 40, 6);
  drawField(doc, '2.18. Estrato', data.infoGeneral.estrato, 115, 180, 20, 6);
  drawField(doc, '2.19. Factor de liquidación externo', data.infoGeneral.factorLiqExterno, 145, 180, 50, 6);
  drawField(doc, '2.20. Factor de liquidación interno', data.infoGeneral.factorLiqInterno, 15, 190, 40, 6);
  drawField(doc, '2.21. Factor de ajuste por perdidas', data.infoGeneral.factorAjuste, 65, 190, 40, 6);
  doc.text('2.22. Frontera Embebida', 115, 190);
  drawCheckbox(doc, 145, 188, data.infoGeneral.fronteraEmbebida);
  drawField(doc, '2.23. Código SIC Frontera Principal', data.infoGeneral.codigoSicFronteraPrincipal, 15, 200, 60, 6);
  drawField(doc, '2.24. Tipo de Frontera', data.infoGeneral.tipoFrontera, 85, 200, 50, 6);
  drawField(doc, '2.25. Clasificación del punto de medición', String(data.infoGeneral.clasificacionPunto), 145, 200, 50, 6);

  // Page 2 - Medidor Principal Activa
  doc.addPage();
  drawHeader(doc, page++, totalPages);
  drawMedidorSection(doc, data.medidorPrincipalActiva, '3. MEDIDOR DE ENERGÍA ACTIVA - PRINCIPAL');

  // Page 3 - Medidor Principal Reactiva
  doc.addPage();
  drawHeader(doc, page++, totalPages);
  drawMedidorSection(doc, data.medidorPrincipalReactiva, '4. MEDIDOR DE ENERGÍA REACTIVA - PRINCIPAL');

  // Page 4 - Medidor Respaldo
  doc.addPage();
  drawHeader(doc, page++, totalPages);
  drawMedidorSection(doc, data.medidorRespaldo, '5. MEDIDOR DE ENERGÍA - RESPALDO');

  // Page 5 - Transformadores de Corriente (CT)
  doc.addPage();
  drawHeader(doc, page++, totalPages);
  drawTransformadorSection(doc, data.transformadoresCorriente, '6. TRANSFORMADORES DE CORRIENTE (CT)', false);
  
  // Page 6 - Transformadores de Tensión (PT)
  doc.addPage();
  drawHeader(doc, page++, totalPages);
  drawTransformadorSection(doc, data.transformadoresTension, '7. TRANSFORMADORES DE TENSIÓN (PT)', true);

  // Page 7 - Conductores
  doc.addPage();
  drawHeader(doc, page++, totalPages);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('8. CONDUCTORES Y CARGA DEL CIRCUITO DE MEDIDA', 105, 30, { align: 'center' });
  doc.rect(10, 35, 190, 240);
  doc.setFont('helvetica', 'bold');
  doc.text('8.1. Conductores del circuito de corriente', 15, 45);
  doc.setFont('helvetica', 'normal');
  drawField(doc, 'Calibre', data.conductores.corriente.calibre, 15, 55, 60, 6);
  drawField(doc, 'Denominación', data.conductores.corriente.denominacion, 85, 55, 50, 6);
  drawField(doc, 'Longitud (m)', data.conductores.corriente.longitud, 145, 55, 50, 6);
  drawField(doc, 'Número de Conductores', data.conductores.corriente.numConductores, 15, 68, 60, 6);
  drawField(doc, 'Tipo', data.conductores.corriente.tipo, 85, 68, 50, 6);
  drawField(doc, 'Material', data.conductores.corriente.material, 145, 68, 50, 6);
  drawField(doc, 'Fabricante', data.conductores.corriente.fabricante, 15, 81, 60, 6);
  
  doc.setFont('helvetica', 'bold');
  doc.text('8.2. Conductores del circuito de tensión', 15, 100);
  doc.setFont('helvetica', 'normal');
  drawField(doc, 'Calibre', data.conductores.tension.calibre, 15, 110, 60, 6);
  drawField(doc, 'Denominación', data.conductores.tension.denominacion, 85, 110, 50, 6);
  drawField(doc, 'Longitud (m)', data.conductores.tension.longitud, 145, 110, 50, 6);
  drawField(doc, 'Número de Conductores', data.conductores.tension.numConductores, 15, 123, 60, 6);
  drawField(doc, 'Tipo', data.conductores.tension.tipo, 85, 123, 50, 6);
  drawField(doc, 'Material', data.conductores.tension.material, 145, 123, 50, 6);
  drawField(doc, 'Fabricante', data.conductores.tension.fabricante, 15, 136, 60, 6);

  drawField(doc, '8.3. Error estimado por cableado (%)', data.conductores.errorCableado, 15, 155, 60, 6);

  // Page 8 - Comunicaciones
  doc.addPage();
  drawHeader(doc, page++, totalPages);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('15. SISTEMA DE COMUNICACIONES', 105, 30, { align: 'center' });
  doc.rect(10, 35, 190, 240);
  
  doc.setFont('helvetica', 'bold');
  doc.text('15.1. Sistema de Comunicaciones Principal', 15, 45);
  doc.setFont('helvetica', 'normal');
  const commP = data.comunicaciones.principal;
  drawField(doc, 'No. serie del Modem', commP.numeroSerieModem, 15, 55, 60, 6);
  drawField(doc, 'Marca del Modem', commP.marcaModem, 85, 55, 50, 6);
  drawField(doc, 'IP', commP.ip, 145, 55, 50, 6);
  drawField(doc, 'Puerto', commP.puerto, 15, 68, 60, 6);
  drawField(doc, 'APN', commP.apn, 85, 68, 50, 6);
  drawField(doc, 'IMEI', commP.imei, 145, 68, 50, 6);
  drawField(doc, 'Comm Port Address', commP.commPortAddress, 15, 81, 60, 6);
  drawField(doc, 'No. telefónico de la SIM CARD', commP.noTelefonico, 85, 81, 50, 6);
  drawField(doc, 'Operador Celular', commP.operador, 145, 81, 50, 6);
  drawField(doc, 'Medio de Comunicación', commP.medioComunicacion, 15, 94, 60, 6);
  drawField(doc, 'Otro - ¿Cuál?', commP.otroMedio, 85, 94, 110, 6);
  
  doc.setFont('helvetica', 'bold');
  doc.text('15.2. Sistema de Comunicaciones Respaldo', 15, 115);
  doc.setFont('helvetica', 'normal');
  const commR = data.comunicaciones.respaldo;
  drawField(doc, 'No. serie del Modem', commR.numeroSerieModem, 15, 125, 60, 6);
  drawField(doc, 'Marca del Modem', commR.marcaModem, 85, 125, 50, 6);
  drawField(doc, 'IP', commR.ip, 145, 125, 50, 6);
  drawField(doc, 'Puerto', commR.puerto, 15, 138, 60, 6);
  drawField(doc, 'APN', commR.apn, 85, 138, 50, 6);
  drawField(doc, 'IMEI', commR.imei, 145, 138, 50, 6);
  drawField(doc, 'Comm Port Address', commR.commPortAddress, 15, 151, 60, 6);
  drawField(doc, 'No. telefónico de la SIM CARD', commR.noTelefonico, 85, 151, 50, 6);
  drawField(doc, 'Operador Celular', commR.operador, 145, 151, 50, 6);
  drawField(doc, 'Medio de Comunicación', commR.medioComunicacion, 15, 164, 60, 6);
  drawField(doc, 'Otro - ¿Cuál?', commR.otroMedio, 85, 164, 110, 6);


  // Page 9 - Observaciones
  doc.addPage();
  drawHeader(doc, page++, totalPages);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('16. OBSERVACIONES GENERALES', 105, 30, { align: 'center' });
  doc.rect(10, 35, 190, 240);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const obsLines = doc.splitTextToSize(data.observaciones || '', 180);
  doc.text(obsLines, 15, 45);

  // Page 10 - Responsable
  doc.addPage();
  drawHeader(doc, page++, totalPages);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('17. RESPONSABLE DE LA INFORMACIÓN', 105, 30, { align: 'center' });
  doc.rect(10, 35, 190, 240);
  doc.setFont('helvetica', 'normal');
  
  drawField(doc, '17.1. Nombre', data.responsable.nombre, 15, 55, 180, 6);
  drawField(doc, '17.2. Documento de Identificación', data.responsable.documento, 15, 68, 180, 6);
  drawField(doc, '17.3. Fecha de Impresión de la Hoja de Vida', data.responsable.fechaImpresion, 15, 81, 180, 6);

  doc.save(`${data.infoGeneral.nombreUsuario}-${data.responsable.nombre}-${now}.pdf`);
};