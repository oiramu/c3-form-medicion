
export interface FormData {
  // Page 1
  cedulaCatastral: string;
  codigoSicImp: string;
  codigoSicExp: string;
  codigoNiu: string;
  novedad: {
    fecha: string;
    fechaVerificacion: string;
    tipo: string;
    otroTipo: string;
  };
  estadoFrontera: string;
  infoGeneral: {
    nombreFrontera: string;
    nombreUsuario: string;
    direccion: string;
    localizacion: string;
    ciudad: string;
    latitud: string;
    longitud: string;
    departamento: string;
    agenteRf: string;
    codigoSicRf: string;
    exportadorFisico: string;
    codigoSicExp: string;
    fechaRegistro: string;
    tensionServicio: string;
    capacidadInstalada: string;
    conexion: string;
    claseServicio: string;
    estrato: string;
    factorLiqExterno: string;
    factorLiqInterno: string;
    factorAjuste: string;
    fronteraEmbebida: boolean;
    codigoSicFronteraPrincipal: string;
    tipoFrontera: string;
    clasificacionPunto: number;
  };

  // Page 2 & 3
  medidorPrincipalActiva: MedidorData;
  medidorPrincipalReactiva: MedidorData;
  medidorRespaldo: MedidorData;

  // Page 5 & 6
  transformadoresCorriente: {
    faseR: TransformadorData;
    faseS: TransformadorData;
    faseT: TransformadorData;
  };
  transformadoresTension: {
    faseR: TransformadorData;
    faseS: TransformadorData;
    faseT: TransformadorData;
  };

  // Page 7
  conductores: {
    corriente: ConductorData;
    tension: ConductorData;
    errorCableado: string;
  };

  // Page 9
  comunicaciones: {
    principal: ComunicacionData;
    respaldo: ComunicacionData;
  };

  // Page 10
  observaciones: string;
  
  // Page 11
  responsable: {
    nombre: string;
    documento: string;
    fechaImpresion: string;
  };
}

export interface MedidorData {
  ubicacion: string;
  propiedad: string;
  numeroSerie: string;
  marca: string;
  modelo: string;
  fabricante: string;
  anoFabricacion: string;
  proveedor: string;
  tecnologia: string;
  conexion: string;
  numElementosConexion: string;
  sentidoMedicion: string;
  numHilos: string;
  numFases: string;
  tipoRegistrador: string;
  cantidadEnteros: string;
  cantidadDecimales: string;
  tensionNominal: string;
  indClase: string;
  constante: string;
  unidadConstante: string;
  frecuencia: string;
  lb: string;
  imax: string;
  in: string;
  sellos: Sello[];
}

export interface Sello {
  id: number;
  ubicacion: string;
  serie: string;
  tipo: string;
  color: string;
  fechaInstalacion: string;
  fechaRetiro: string;
  propiedad: string;
}

export interface TransformadorData {
  numeroSerie: string;
  modelo: string;
  fabricante: string;
  burden: string;
  cargasCompensacion: string;
  frecuencia: string;
  claseExactitud: string;
  corrienteTermica: string;
  corrienteDinamica: string;
  corrientePrimariaNominal: string;
  corrienteSecundariaNominal: string;
  relacionTransformacion: string;
  tensionPrimariaNominal: string;
  tensionSecundariaNominal: string;
}

export interface ConductorData {
  calibre: string;
  denominacion: string;
  longitud: string;
  numConductores: string;
  tipo: string;
  material: string;
  fabricante: string;
}

export interface ComunicacionData {
  numeroSerieModem: string;
  marcaModem: string;
  ip: string;
  puerto: string;
  apn: string;
  imei: string;
  commPortAddress: string;
  noTelefonico: string;
  operador: string;
  medioComunicacion: string;
  otroMedio: string;
}

export type Action = {
  type: 'UPDATE_FIELD';
  payload: {
    field: string;
    value: any;
  };
};

const emptyMedidorData: MedidorData = {
    ubicacion: '', propiedad: '', numeroSerie: '', marca: '', modelo: '', fabricante: '',
    anoFabricacion: '', proveedor: '', tecnologia: '', conexion: '', numElementosConexion: '',
    sentidoMedicion: '', numHilos: '', numFases: '', tipoRegistrador: '', cantidadEnteros: '',
    cantidadDecimales: '', tensionNominal: '', indClase: '', constante: '', unidadConstante: '',
    frecuencia: '', lb: '', imax: '', in: '', sellos: [],
};

const emptyTransformadorData: TransformadorData = {
    numeroSerie: '', modelo: '', fabricante: '', burden: '', cargasCompensacion: '', frecuencia: '',
    claseExactitud: '', corrienteTermica: '', corrienteDinamica: '', corrientePrimariaNominal: '',
    corrienteSecundariaNominal: '', relacionTransformacion: '', tensionPrimariaNominal: '',
    tensionSecundariaNominal: '',
};

const emptyConductorData: ConductorData = {
    calibre: '', denominacion: '', longitud: '', numConductores: '', tipo: '', material: '',
    fabricante: '',
};

const emptyComunicacionData: ComunicacionData = {
    numeroSerieModem: '', marcaModem: '', ip: '', puerto: '', apn: '', imei: '', commPortAddress: '',
    noTelefonico: '', operador: '', medioComunicacion: '', otroMedio: '',
};

export const placeholderData: FormData = {
  cedulaCatastral: '123456789',
  codigoSicImp: 'FRT11014',
  codigoSicExp: 'EXP-PAIPA-001',
  codigoNiu: 'CONSUMOS PROPIOS PAIPA 3',
  novedad: {
    fecha: '2015-04-20',
    fechaVerificacion: '2014-05-19',
    tipo: 'Hoja de vida inicial-Verificación Inicial',
    otroTipo: '',
  },
  estadoFrontera: 'Activa',
  infoGeneral: {
    nombreFrontera: 'CONSUMOS PROPIOS PAIPA 3',
    nombreUsuario: 'GESTIÓN ENERGETICA S.A E.S.P (GENSA)',
    direccion: 'KM 3 VIA PAIPA-TUNJA',
    localizacion: 'INTEMPERIE',
    ciudad: 'PAIPA',
    latitud: '5.6697',
    longitud: '-73.1563',
    departamento: 'BOYACA',
    agenteRf: 'GENSA',
    codigoSicRf: 'HIMG',
    exportadorFisico: 'GENSA',
    codigoSicExp: 'EXP-PAIPA-001',
    fechaRegistro: '2014-05-01',
    tensionServicio: '13.8',
    capacidadInstalada: '12000',
    conexion: 'trifásica',
    claseServicio: 'Industrial',
    estrato: 'N/A',
    factorLiqExterno: '13,800',
    factorLiqInterno: '0',
    factorAjuste: '0',
    fronteraEmbebida: true,
    codigoSicFronteraPrincipal: 'FRT 11014',
    tipoFrontera: 'Entre Agentes',
    clasificacionPunto: 2,
  },
  medidorPrincipalActiva: {
    ubicacion: 'Interior',
    propiedad: 'OR',
    numeroSerie: '90447964',
    marca: 'LANDIS GYR',
    modelo: 'MAXSYS 2510',
    fabricante: 'LANDYS GYR',
    anoFabricacion: '2013',
    proveedor: 'COMMERCIAL METERING SAS',
    tecnologia: 'Estático',
    conexion: 'Indirecta',
    numElementosConexion: '3 elementos',
    sentidoMedicion: 'Bidireccional',
    numHilos: '4',
    numFases: '3',
    tipoRegistrador: 'Display',
    cantidadEnteros: '9',
    cantidadDecimales: '0',
    tensionNominal: '120',
    indClase: '0.25',
    constante: '555,555',
    unidadConstante: 'imp/kWh',
    frecuencia: '60',
    lb: '0.1',
    imax: '20',
    in: '5',
    sellos: [
      { id: 8, ubicacion: 'ATRÁS', serie: '47194', tipo: 'SELLO', color: 'NARANJA', fechaInstalacion: '2014-10-20', fechaRetiro: '', propiedad: 'RF' },
    ],
  },
  medidorPrincipalReactiva: {
    ubicacion: 'Exterior',
    propiedad: 'RF',
    numeroSerie: '90447965',
    marca: 'LANDIS GYR',
    modelo: 'MAXSYS 2510R',
    fabricante: 'LANDYS GYR',
    anoFabricacion: '2013',
    proveedor: 'COMMERCIAL METERING SAS',
    tecnologia: 'Estático',
    conexion: 'Indirecta',
    numElementosConexion: '3 elementos',
    sentidoMedicion: 'Bidireccional',
    numHilos: '4',
    numFases: '3',
    tipoRegistrador: 'Display',
    cantidadEnteros: '9',
    cantidadDecimales: '0',
    tensionNominal: '120',
    indClase: '0.5',
    constante: '555,555',
    unidadConstante: 'imp/kVArh',
    frecuencia: '60',
    lb: '0.1',
    imax: '20',
    in: '5',
    sellos: [],
  },
  medidorRespaldo: {
    ubicacion: 'Interior',
    propiedad: 'OR',
    numeroSerie: '90448000',
    marca: 'LANDIS GYR',
    modelo: 'BACKUP 1000',
    fabricante: 'LANDYS GYR',
    anoFabricacion: '2012',
    proveedor: 'COMMERCIAL METERING SAS',
    tecnologia: 'Electromecánico',
    conexion: 'Indirecta',
    numElementosConexion: '3 elementos',
    sentidoMedicion: 'Unidireccional',
    numHilos: '4',
    numFases: '3',
    tipoRegistrador: 'Display',
    cantidadEnteros: '8',
    cantidadDecimales: '0',
    tensionNominal: '120',
    indClase: '1.0',
    constante: '100,000',
    unidadConstante: 'imp/kWh',
    frecuencia: '60',
    lb: '0.2',
    imax: '30',
    in: '5',
    sellos: [],
  },
  transformadoresCorriente: {
    faseR: { numeroSerie: '160051', modelo: 'ABK 10', fabricante: 'HOWEST', burden: '20', cargasCompensacion: '5.08', frecuencia: '60', claseExactitud: '0.5', corrienteTermica: '22', corrienteDinamica: '55', corrientePrimariaNominal: '600', corrienteSecundariaNominal: '5', relacionTransformacion: '600/5', tensionPrimariaNominal: '', tensionSecundariaNominal: '' },
    faseS: { numeroSerie: '160052', modelo: 'ABK 10', fabricante: 'HOWEST', burden: '20', cargasCompensacion: '5.08', frecuencia: '60', claseExactitud: '0.5', corrienteTermica: '22', corrienteDinamica: '55', corrientePrimariaNominal: '600', corrienteSecundariaNominal: '5', relacionTransformacion: '600/5', tensionPrimariaNominal: '', tensionSecundariaNominal: '' },
    faseT: { numeroSerie: '160053', modelo: 'ABK 10', fabricante: 'HOWEST', burden: '20', cargasCompensacion: '5.08', frecuencia: '60', claseExactitud: '0.5', corrienteTermica: '22', corrienteDinamica: '55', corrientePrimariaNominal: '600', corrienteSecundariaNominal: '5', relacionTransformacion: '600/5', tensionPrimariaNominal: '', tensionSecundariaNominal: '' },
  },
  transformadoresTension: {
    faseR: { numeroSerie: '160057', modelo: 'VRS15', fabricante: 'HOWEST', burden: '25', cargasCompensacion: '8.15', frecuencia: '60', claseExactitud: '0.5', tensionPrimariaNominal: '13.8', tensionSecundariaNominal: '120', relacionTransformacion: '13800/120', corrienteTermica: '0', corrienteDinamica: '0', corrientePrimariaNominal: '0', corrienteSecundariaNominal: '0' },
    faseS: { numeroSerie: '160058', modelo: 'VRS15', fabricante: 'HOWEST', burden: '25', cargasCompensacion: '8.15', frecuencia: '60', claseExactitud: '0.5', tensionPrimariaNominal: '13.8', tensionSecundariaNominal: '120', relacionTransformacion: '13800/120', corrienteTermica: '0', corrienteDinamica: '0', corrientePrimariaNominal: '0', corrienteSecundariaNominal: '0' },
    faseT: { numeroSerie: '160059', modelo: 'VRS15', fabricante: 'HOWEST', burden: '25', cargasCompensacion: '8.15', frecuencia: '60', claseExactitud: '0.5', tensionPrimariaNominal: '13.8', tensionSecundariaNominal: '120', relacionTransformacion: '13800/120', corrienteTermica: '0', corrienteDinamica: '0', corrientePrimariaNominal: '0', corrienteSecundariaNominal: '0' },
  },
  conductores: {
    corriente: { calibre: '10', denominacion: 'AWG', longitud: '50', numConductores: '6', tipo: 'multicond', material: 'Cobre', fabricante: 'CENTELSA' },
    tension: { calibre: '10', denominacion: 'AWG', longitud: '50', numConductores: '3', tipo: 'multicond', material: 'Cobre', fabricante: 'CENTELSA' },
    errorCableado: '0.5',
  },
  comunicaciones: {
    principal: { numeroSerieModem: 'MOD12345', marcaModem: 'Huawei', ip: '192.168.1.100', puerto: '502', apn: 'internet', imei: '123456789012345', commPortAddress: 'COM3', noTelefonico: '3100000000', operador: 'Movistar', medioComunicacion: 'Otra', otroMedio: 'RED INTERNA DE DATOS' },
    respaldo: { numeroSerieModem: 'MOD54321', marcaModem: 'Huawei', ip: '192.168.1.101', puerto: '502', apn: 'internet', imei: '543210987654321', commPortAddress: 'COM4', noTelefonico: '3100000001', operador: 'Movistar', medioComunicacion: 'Otra', otroMedio: 'RED INTERNA DE DATOS' },
  },
  observaciones: 'SE REALIZARÁ PLAN DE MANTENIMIENTO PREVENTIVO Y PRUEBAS DE RUTINA',
  responsable: {
    nombre: 'JOSÉ MANUEL CRUZ',
    documento: '80.199.880',
    fechaImpresion: '2014-05-19',
  }
};

export const initialFormData: FormData = {
  cedulaCatastral: '',
  codigoSicImp: '',
  codigoSicExp: '',
  codigoNiu: '',
  novedad: {
    fecha: '',
    fechaVerificacion: '',
    tipo: '',
    otroTipo: '',
  },
  estadoFrontera: '',
  infoGeneral: {
    nombreFrontera: '',
    nombreUsuario: '',
    direccion: '',
    localizacion: '',
    ciudad: '',
    latitud: '',
    longitud: '',
    departamento: '',
    agenteRf: '',
    codigoSicRf: '',
    exportadorFisico: '',
    codigoSicExp: '',
    fechaRegistro: '',
    tensionServicio: '',
    capacidadInstalada: '',
    conexion: '',
    claseServicio: '',
    estrato: '',
    factorLiqExterno: '',
    factorLiqInterno: '',
    factorAjuste: '',
    fronteraEmbebida: false,
    codigoSicFronteraPrincipal: '',
    tipoFrontera: '',
    clasificacionPunto: 0,
  },
  medidorPrincipalActiva: { ...emptyMedidorData },
  medidorPrincipalReactiva: { ...emptyMedidorData },
  medidorRespaldo: { ...emptyMedidorData },
  transformadoresCorriente: {
    faseR: { ...emptyTransformadorData },
    faseS: { ...emptyTransformadorData },
    faseT: { ...emptyTransformadorData },
  },
  transformadoresTension: {
    faseR: { ...emptyTransformadorData },
    faseS: { ...emptyTransformadorData },
    faseT: { ...emptyTransformadorData },
  },
  conductores: {
    corriente: { ...emptyConductorData },
    tension: { ...emptyConductorData },
    errorCableado: '',
  },
  comunicaciones: {
    principal: { ...emptyComunicacionData },
    respaldo: { ...emptyComunicacionData },
  },
  observaciones: '',
  responsable: {
    nombre: '',
    documento: '',
    fechaImpresion: '',
  }
};
