export interface FormData {
  // Page 1
  cedulaCatastral: string;
  codigoSicImp: string;
  codigoSicExp: string;
  codigoNiu: string;
  novedad: {
    fecha: string;
    fechaVerificacion: string;
    tipos: { [key: string]: boolean };
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

export type Action =
  | {
      type: 'UPDATE_FIELD';
      payload: {
        field: string;
        value: any;
      };
    }
  | {
      type: 'TOGGLE_NOVEDAD_TIPO';
      payload: {
        tipo: string;
      };
    }
  | {
      type: 'ADD_SELLO';
      payload: {
        medidor: keyof Pick<FormData, 'medidorPrincipalActiva' | 'medidorPrincipalReactiva' | 'medidorRespaldo'>;
      };
    }
  | {
      type: 'REMOVE_SELLO';
      payload: {
        medidor: keyof Pick<FormData, 'medidorPrincipalActiva' | 'medidorPrincipalReactiva' | 'medidorRespaldo'>;
        selloId: number;
      };
    }
  | {
      type: 'UPDATE_SELLO_FIELD';
      payload: {
        medidor: keyof Pick<FormData, 'medidorPrincipalActiva' | 'medidorPrincipalReactiva' | 'medidorRespaldo'>;
        selloId: number;
        field: keyof Omit<Sello, 'id'>;
        value: string;
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

const novedadTipos = {
    'Hoja de vida inicial-Verificación Inicial': false,
    'Cambio de medidor principal': false,
    'Cambio de medidor de respaldo': false,
    'Cambio de transformador de corriente': false,
    'Cambio de transformador de tensión': false,
    'Parametrización de medidor': false,
    'Actualización hora': false,
    'Visita de verificación': false,
    'Cambio de modem': false,
    'Mantenimiento programado': false,
    'Lectura en sitio': false,
    'Adecuaciones en celda de medida': false,
    'Otro - ¿Cuál?': false,
};

export const placeholderData: FormData = {
  cedulaCatastral: '123456789',
  codigoSicImp: 'FRT11014',
  codigoSicExp: 'EXP-PAIPA-001',
  codigoNiu: 'CONSUMOS PROPIOS PAIPA 3',
  novedad: {
    fecha: '2025-11-10',
    fechaVerificacion: '2025-11-11',
    tipos: {
      ...novedadTipos,
      'Hoja de vida inicial-Verificación Inicial': true,
      'Cambio de medidor principal': true,
      'Cambio de medidor de respaldo': true,
      'Cambio de transformador de corriente': true,
      'Cambio de transformador de tensión': true,
      'Parametrización de medidor': true,
      'Actualización hora': true,
      'Visita de verificación': true,
      'Cambio de modem': true,
      'Mantenimiento programado': true,
      'Lectura en sitio': true,
      'Adecuaciones en celda de medida': true,
    },
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
    tipos: { ...novedadTipos },
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

export const logo = 'data:image/png;base64,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';