import React, { useState, useReducer, useCallback } from 'react';
import { initialFormData, FormData, Action, placeholderData, Sello, logo } from './types';
import { generatePdf } from './services/pdfGenerator';

const formReducer = (state: FormData, action: Action): FormData => {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const { field, value } = action.payload;
      const keys = field.split('.');
      const newState = JSON.parse(JSON.stringify(state)); // Deep copy for nested objects
      let current: any = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    }
    case 'TOGGLE_NOVEDAD_TIPO': {
      const { tipo } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      newState.novedad.tipos[tipo] = !newState.novedad.tipos[tipo];
      return newState;
    }
    case 'ADD_SELLO': {
        const { medidor } = action.payload;
        const newState = JSON.parse(JSON.stringify(state));
        const sellos = newState[medidor].sellos;
        const newSelloId = sellos.length > 0 ? Math.max(...sellos.map((s: Sello) => s.id)) + 1 : 1;
        sellos.push({
            id: newSelloId, ubicacion: '', serie: '', tipo: '', color: '',
            fechaInstalacion: '', fechaRetiro: '', propiedad: '',
        });
        return newState;
    }
    case 'REMOVE_SELLO': {
        const { medidor, selloId } = action.payload;
        const newState = JSON.parse(JSON.stringify(state));
        newState[medidor].sellos = newState[medidor].sellos.filter((s: Sello) => s.id !== selloId);
        return newState;
    }
    case 'UPDATE_SELLO_FIELD': {
        const { medidor, selloId, field, value } = action.payload;
        const newState = JSON.parse(JSON.stringify(state));
        const sello = newState[medidor].sellos.find((s: Sello) => s.id === selloId);
        if (sello) {
            (sello as any)[field] = value;
        }
        return newState;
    }
    default:
      return state;
  }
};

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, type = 'text', className = '', placeholder = '' }) => (
  <div className={`flex flex-col ${className}`}>
    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

interface CheckboxProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name, checked, onChange, className='' }) => (
    <div className={`flex items-center ${className}`}>
        <input
            id={name}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor={name} className="ml-2 block text-sm text-gray-900">{label}</label>
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className='' }) => (
  <div className={`p-6 bg-white rounded-lg shadow-md mb-6 ${className}`}>
    <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </div>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="col-span-full border-t pt-4 mt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
        </div>
    </div>
);

const SelloTable: React.FC<{ medidorKey: keyof Pick<FormData, 'medidorPrincipalActiva' | 'medidorPrincipalReactiva' | 'medidorRespaldo'>, sellos: Sello[], dispatch: React.Dispatch<Action> }> = ({ medidorKey, sellos, dispatch }) => {
    
    const handleSelloChange = (selloId: number, field: keyof Omit<Sello, 'id'>, value: string) => {
        dispatch({ type: 'UPDATE_SELLO_FIELD', payload: { medidor: medidorKey, selloId, field, value } });
    };

    const addSello = () => {
        dispatch({ type: 'ADD_SELLO', payload: { medidor: medidorKey } });
    };

    const removeSello = (selloId: number) => {
        dispatch({ type: 'REMOVE_SELLO', payload: { medidor: medidorKey, selloId } });
    };

    const headers = ['Ubicación', 'Serie No.', 'Tipo', 'Color', 'Fecha Inst.', 'Fecha Ret.', 'Propiedad', 'Acciones'];
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map(header => <th key={header} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>)}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sellos.map(sello => (
                        <tr key={sello.id}>
                            <td className="px-1 py-1 whitespace-nowrap"><input type="text" value={sello.ubicacion} onChange={e => handleSelloChange(sello.id, 'ubicacion', e.target.value)} className="w-full text-xs p-1 border rounded"/></td>
                            <td className="px-1 py-1 whitespace-nowrap"><input type="text" value={sello.serie} onChange={e => handleSelloChange(sello.id, 'serie', e.target.value)} className="w-full text-xs p-1 border rounded"/></td>
                            <td className="px-1 py-1 whitespace-nowrap"><input type="text" value={sello.tipo} onChange={e => handleSelloChange(sello.id, 'tipo', e.target.value)} className="w-full text-xs p-1 border rounded"/></td>
                            <td className="px-1 py-1 whitespace-nowrap"><input type="text" value={sello.color} onChange={e => handleSelloChange(sello.id, 'color', e.target.value)} className="w-full text-xs p-1 border rounded"/></td>
                            <td className="px-1 py-1 whitespace-nowrap"><input type="date" value={sello.fechaInstalacion} onChange={e => handleSelloChange(sello.id, 'fechaInstalacion', e.target.value)} className="w-full text-xs p-1 border rounded"/></td>
                            <td className="px-1 py-1 whitespace-nowrap"><input type="date" value={sello.fechaRetiro} onChange={e => handleSelloChange(sello.id, 'fechaRetiro', e.target.value)} className="w-full text-xs p-1 border rounded"/></td>
                            <td className="px-1 py-1 whitespace-nowrap"><input type="text" value={sello.propiedad} onChange={e => handleSelloChange(sello.id, 'propiedad', e.target.value)} className="w-full text-xs p-1 border rounded"/></td>
                            <td className="px-1 py-1 whitespace-nowrap">
                                <button onClick={() => removeSello(sello.id)} className="text-red-600 hover:text-red-900 text-xs">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={addSello} className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded hover:bg-indigo-200">
                + Agregar Sello
            </button>
        </div>
    );
};


const App: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialFormData);
  const [activeTab, setActiveTab] = useState('general');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        field: name,
        value: type === 'checkbox' ? checked : value,
      },
    });
  }, []);

  const handleNovedadTipoToggle = useCallback((tipo: string) => {
    dispatch({
      type: 'TOGGLE_NOVEDAD_TIPO',
      payload: { tipo },
    });
  }, []);

  const handleGeneratePdf = () => {
    setIsGenerating(true);
    setTimeout(() => {
        try {
            generatePdf(state);
        } catch (error) {
            console.error("Failed to generate PDF:", error);
            alert("An error occurred while generating the PDF. Please check the console for details.");
        } finally {
            setIsGenerating(false);
        }
    }, 100);
  };
  
  const tabs = [
      { id: 'general', label: 'Info General' },
      { id: 'medidorPrincipal', label: 'Medidor Principal' },
      { id: 'medidorRespaldo', label: 'Medidor Respaldo' },
      { id: 'transformadores', label: 'Transformadores' },
      { id: 'conductoresComms', label: 'Conductores y Comms' },
      { id: 'final', label: 'Finalizar' },
  ];

  const handleNext = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
        window.scrollTo(0, 0);
        setActiveTab(tabs[currentIndex + 1].id);
    }
  };
  
  const renderContent = () => {
    const novedadesCol1 = ['Hoja de vida inicial-Verificación Inicial', 'Cambio de medidor principal', 'Cambio de medidor de respaldo', 'Cambio de transformador de corriente', 'Cambio de transformador de tensión', 'Parametrización de medidor', 'Actualización hora'];
    const novedadesCol2 = ['Visita de verificación', 'Cambio de modem', 'Mantenimiento programado', 'Lectura en sitio', 'Adecuaciones en celda de medida', 'Otro - ¿Cuál?'];

    const renderMedidorFields = (medidorKey: keyof Pick<FormData, 'medidorPrincipalActiva' | 'medidorPrincipalReactiva' | 'medidorRespaldo'>) => (
        <>
            <InputField label="Ubicación" name={`${medidorKey}.ubicacion`} value={state[medidorKey].ubicacion} onChange={handleInputChange} placeholder={placeholderData[medidorKey].ubicacion} />
            <InputField label="Propiedad" name={`${medidorKey}.propiedad`} value={state[medidorKey].propiedad} onChange={handleInputChange} placeholder={placeholderData[medidorKey].propiedad} />
            <InputField label="Número de Serie" name={`${medidorKey}.numeroSerie`} value={state[medidorKey].numeroSerie} onChange={handleInputChange} placeholder={placeholderData[medidorKey].numeroSerie} />
            <InputField label="Marca" name={`${medidorKey}.marca`} value={state[medidorKey].marca} onChange={handleInputChange} placeholder={placeholderData[medidorKey].marca} />
            <InputField label="Modelo" name={`${medidorKey}.modelo`} value={state[medidorKey].modelo} onChange={handleInputChange} placeholder={placeholderData[medidorKey].modelo} />
            <InputField label="Fabricante" name={`${medidorKey}.fabricante`} value={state[medidorKey].fabricante} onChange={handleInputChange} placeholder={placeholderData[medidorKey].fabricante} />
            <InputField label="Año Fabricación" name={`${medidorKey}.anoFabricacion`} value={state[medidorKey].anoFabricacion} onChange={handleInputChange} placeholder={placeholderData[medidorKey].anoFabricacion} />
            <InputField label="Proveedor" name={`${medidorKey}.proveedor`} value={state[medidorKey].proveedor} onChange={handleInputChange} placeholder={placeholderData[medidorKey].proveedor} />
            <InputField label="Tecnología" name={`${medidorKey}.tecnologia`} value={state[medidorKey].tecnologia} onChange={handleInputChange} placeholder={placeholderData[medidorKey].tecnologia} />
            <InputField label="Tipo Conexión" name={`${medidorKey}.conexion`} value={state[medidorKey].conexion} onChange={handleInputChange} placeholder={placeholderData[medidorKey].conexion} />
            <InputField label="No. Elementos Conexión" name={`${medidorKey}.numElementosConexion`} value={state[medidorKey].numElementosConexion} onChange={handleInputChange} placeholder={placeholderData[medidorKey].numElementosConexion} />
            <InputField label="Sentido Medición" name={`${medidorKey}.sentidoMedicion`} value={state[medidorKey].sentidoMedicion} onChange={handleInputChange} placeholder={placeholderData[medidorKey].sentidoMedicion} />
            <InputField label="No. Hilos" name={`${medidorKey}.numHilos`} value={state[medidorKey].numHilos} onChange={handleInputChange} placeholder={placeholderData[medidorKey].numHilos} />
            <InputField label="No. Fases" name={`${medidorKey}.numFases`} value={state[medidorKey].numFases} onChange={handleInputChange} placeholder={placeholderData[medidorKey].numFases} />
            <InputField label="Tipo Registrador" name={`${medidorKey}.tipoRegistrador`} value={state[medidorKey].tipoRegistrador} onChange={handleInputChange} placeholder={placeholderData[medidorKey].tipoRegistrador} />
            <InputField label="Cantidad Enteros" name={`${medidorKey}.cantidadEnteros`} value={state[medidorKey].cantidadEnteros} onChange={handleInputChange} placeholder={placeholderData[medidorKey].cantidadEnteros} />
            <InputField label="Cantidad Decimales" name={`${medidorKey}.cantidadDecimales`} value={state[medidorKey].cantidadDecimales} onChange={handleInputChange} placeholder={placeholderData[medidorKey].cantidadDecimales} />
            <InputField label="Tensión Nominal (V)" name={`${medidorKey}.tensionNominal`} value={state[medidorKey].tensionNominal} onChange={handleInputChange} placeholder={placeholderData[medidorKey].tensionNominal} />
            <InputField label="Ind. Clase Exactitud" name={`${medidorKey}.indClase`} value={state[medidorKey].indClase} onChange={handleInputChange} placeholder={placeholderData[medidorKey].indClase} />
            <InputField label="Constante" name={`${medidorKey}.constante`} value={state[medidorKey].constante} onChange={handleInputChange} placeholder={placeholderData[medidorKey].constante} />
            <InputField label="Unidad Constante" name={`${medidorKey}.unidadConstante`} value={state[medidorKey].unidadConstante} onChange={handleInputChange} placeholder={placeholderData[medidorKey].unidadConstante} />
            <InputField label="Frecuencia (Hz)" name={`${medidorKey}.frecuencia`} value={state[medidorKey].frecuencia} onChange={handleInputChange} placeholder={placeholderData[medidorKey].frecuencia} />
            <InputField label="Ib (A)" name={`${medidorKey}.lb`} value={state[medidorKey].lb} onChange={handleInputChange} placeholder={placeholderData[medidorKey].lb} />
            <InputField label="Imax (A)" name={`${medidorKey}.imax`} value={state[medidorKey].imax} onChange={handleInputChange} placeholder={placeholderData[medidorKey].imax} />
            <InputField label="In (A)" name={`${medidorKey}.in`} value={state[medidorKey].in} onChange={handleInputChange} placeholder={placeholderData[medidorKey].in} />
            <SubSection title="Sellos del Medidor">
                <div className="col-span-full">
                    <SelloTable medidorKey={medidorKey} sellos={state[medidorKey].sellos} dispatch={dispatch} />
                </div>
            </SubSection>
        </>
    );

    switch(activeTab) {
      case 'general':
        return (
          <>
            <Section title="Información de la Frontera">
                <InputField label="Código del Cliente" name="codigoCliente" value={state.codigoCliente} onChange={handleInputChange} placeholder={placeholderData.codigoCliente} />
                <InputField label="Código SIC Imp" name="codigoSicImp" value={state.codigoSicImp} onChange={handleInputChange} placeholder={placeholderData.codigoSicImp} />
                <InputField label="Código SIC Exp" name="codigoSicExp" value={state.codigoSicExp} onChange={handleInputChange} placeholder={placeholderData.codigoSicExp} />
                <InputField label="Código NIU" name="codigoNiu" value={state.codigoNiu} onChange={handleInputChange} placeholder={placeholderData.codigoNiu} />
            </Section>
            <Section title="1. Registro de Novedades">
               {/*<InputField label="Fecha de Última Novedad" name="novedad.fecha" value={state.novedad.fecha} onChange={handleInputChange} type="date" />*/}
               <InputField label="Fecha Verificación" name="novedad.fechaVerificacion" value={state.novedad.fechaVerificacion} onChange={handleInputChange} type="date" />
                <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4 mt-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">1.2 Tipo de Novedad</h3>
                        <div className="space-y-2">
                            {novedadesCol1.map(novedad => 
                                <Checkbox key={novedad} label={novedad} name={novedad} checked={!!state.novedad.tipos[novedad]} onChange={() => handleNovedadTipoToggle(novedad)} />
                            )}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">&nbsp;</h3>
                         <div className="space-y-2">
                             {novedadesCol2.map(novedad =>
                                <Checkbox key={novedad} label={novedad} name={novedad} checked={!!state.novedad.tipos[novedad]} onChange={() => handleNovedadTipoToggle(novedad)} />
                            )}
                         </div>
                     </div>
                </div>
               <InputField label="Otro Tipo (si aplica)" name="novedad.otroTipo" value={state.novedad.otroTipo} onChange={handleInputChange} placeholder={placeholderData.novedad.otroTipo} />
               <InputField label="Estado Frontera" name="estadoFrontera" value={state.estadoFrontera} onChange={handleInputChange} placeholder={placeholderData.estadoFrontera} />
            </Section>
            <Section title="2. Información General">
                <InputField label="Nombre Frontera" name="infoGeneral.nombreFrontera" value={state.infoGeneral.nombreFrontera} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.nombreFrontera}/>
                <InputField label="Nombre Usuario" name="infoGeneral.nombreUsuario" value={state.infoGeneral.nombreUsuario} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.nombreUsuario}/>
                <InputField label="Dirección" name="infoGeneral.direccion" value={state.infoGeneral.direccion} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.direccion}/>
                <InputField label="Localización" name="infoGeneral.localizacion" value={state.infoGeneral.localizacion} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.localizacion}/>
                <InputField label="Ciudad/Municipio" name="infoGeneral.ciudad" value={state.infoGeneral.ciudad} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.ciudad}/>
                <InputField label="Departamento" name="infoGeneral.departamento" value={state.infoGeneral.departamento} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.departamento}/>
                <InputField label="Latitud" name="infoGeneral.latitud" value={state.infoGeneral.latitud} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.latitud}/>
                <InputField label="Longitud" name="infoGeneral.longitud" value={state.infoGeneral.longitud} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.longitud}/>
                <InputField label="Agente RF" name="infoGeneral.agenteRf" value={state.infoGeneral.agenteRf} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.agenteRf}/>
                <InputField label="Código SIC RF" name="infoGeneral.codigoSicRf" value={state.infoGeneral.codigoSicRf} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.codigoSicRf}/>
                {/**<InputField label="Exportador Físico" name="infoGeneral.exportadorFisico" value={state.infoGeneral.exportadorFisico} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.exportadorFisico}/>
                <InputField label="Código SIC EXP" name="infoGeneral.codigoSicExp" value={state.infoGeneral.codigoSicExp} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.codigoSicExp}/>
                <InputField label="Fecha de Registro" name="infoGeneral.fechaRegistro" value={state.infoGeneral.fechaRegistro} onChange={handleInputChange} type="date" />*/}
                <InputField label="Tensión de Servicio (kV)" name="infoGeneral.tensionServicio" value={state.infoGeneral.tensionServicio} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.tensionServicio}/>
                <InputField label="Capacidad Instalada (kVA)" name="infoGeneral.capacidadInstalada" value={state.infoGeneral.capacidadInstalada} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.capacidadInstalada}/>
                <InputField label="Tipo Conexión" name="infoGeneral.conexion" value={state.infoGeneral.conexion} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.conexion}/>
                <InputField label="Clase de Servicio" name="infoGeneral.claseServicio" value={state.infoGeneral.claseServicio} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.claseServicio}/>
                <InputField label="Estrato" name="infoGeneral.estrato" value={state.infoGeneral.estrato} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.estrato}/>
                <InputField label="Factor Liq. Externo" name="infoGeneral.factorLiqExterno" value={state.infoGeneral.factorLiqExterno} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.factorLiqExterno}/>
                <InputField label="Factor Liq. Interno" name="infoGeneral.factorLiqInterno" value={state.infoGeneral.factorLiqInterno} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.factorLiqInterno}/>
                <InputField label="Factor Ajuste Pérdidas" name="infoGeneral.factorAjuste" value={state.infoGeneral.factorAjuste} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.factorAjuste}/>
                <Checkbox label="Frontera Embebida" name="infoGeneral.fronteraEmbebida" checked={state.infoGeneral.fronteraEmbebida} onChange={handleInputChange} />
                <InputField label="Código SIC Frontera Principal" name="infoGeneral.codigoSicFronteraPrincipal" value={state.infoGeneral.codigoSicFronteraPrincipal} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.codigoSicFronteraPrincipal}/>
                <InputField label="Tipo Frontera" name="infoGeneral.tipoFrontera" value={state.infoGeneral.tipoFrontera} onChange={handleInputChange} placeholder={placeholderData.infoGeneral.tipoFrontera}/>
                <InputField label="Clasificación Punto" name="infoGeneral.clasificacionPunto" value={state.infoGeneral.clasificacionPunto} onChange={handleInputChange} type="number" placeholder={String(placeholderData.infoGeneral.clasificacionPunto)}/>
            </Section>
          </>
        );
      case 'medidorPrincipal':
        return (
            <>
                <Section title="3. Medidor de Energía Activa - Principal">
                    {renderMedidorFields('medidorPrincipalActiva')}
                </Section>
                <Section title="4. Medidor de Energía Reactiva - Principal">
                    {renderMedidorFields('medidorPrincipalReactiva')}
                </Section>
            </>
        );
      case 'medidorRespaldo':
        return (
             <Section title="5. Medidor de Energía - Respaldo">
                {renderMedidorFields('medidorRespaldo')}
             </Section>
        );
      case 'transformadores':
        const renderTransformadorFields = (
            type: 'transformadoresCorriente' | 'transformadoresTension',
            phase: 'faseR' | 'faseS' | 'faseT'
        ) => (
            <>
                <InputField label="Número de Serie" name={`${type}.${phase}.numeroSerie`} value={state[type][phase].numeroSerie} onChange={handleInputChange} />
                <InputField label="Modelo" name={`${type}.${phase}.modelo`} value={state[type][phase].modelo} onChange={handleInputChange} />
                <InputField label="Fabricante" name={`${type}.${phase}.fabricante`} value={state[type][phase].fabricante} onChange={handleInputChange} />
                <InputField label="Burden (VA)" name={`${type}.${phase}.burden`} value={state[type][phase].burden} onChange={handleInputChange} />
                <InputField label="Cargas de Compensación (VA)" name={`${type}.${phase}.cargasCompensacion`} value={state[type][phase].cargasCompensacion} onChange={handleInputChange} />
                <InputField label="Frecuencia (Hz)" name={`${type}.${phase}.frecuencia`} value={state[type][phase].frecuencia} onChange={handleInputChange} />
                <InputField label="Clase de Exactitud" name={`${type}.${phase}.claseExactitud`} value={state[type][phase].claseExactitud} onChange={handleInputChange} />
                <InputField label="Relación de Transformación" name={`${type}.${phase}.relacionTransformacion`} value={state[type][phase].relacionTransformacion} onChange={handleInputChange} />
                {type === 'transformadoresCorriente' ? (
                    <>
                        <InputField label="Corriente Térmica (kA)" name={`${type}.${phase}.corrienteTermica`} value={state[type][phase].corrienteTermica} onChange={handleInputChange} />
                        <InputField label="Corriente Dinámica (kA)" name={`${type}.${phase}.corrienteDinamica`} value={state[type][phase].corrienteDinamica} onChange={handleInputChange} />
                        <InputField label="Corriente Primaria Nominal (A)" name={`${type}.${phase}.corrientePrimariaNominal`} value={state[type][phase].corrientePrimariaNominal} onChange={handleInputChange} />
                        <InputField label="Corriente Secundaria Nominal (A)" name={`${type}.${phase}.corrienteSecundariaNominal`} value={state[type][phase].corrienteSecundariaNominal} onChange={handleInputChange} />
                    </>
                ) : (
                    <>
                        <InputField label="Tensión Primaria Nominal (V)" name={`${type}.${phase}.tensionPrimariaNominal`} value={state[type][phase].tensionPrimariaNominal} onChange={handleInputChange} />
                        <InputField label="Tensión Secundaria Nominal (V)" name={`${type}.${phase}.tensionSecundariaNominal`} value={state[type][phase].tensionSecundariaNominal} onChange={handleInputChange} />
                    </>
                )}
            </>
        );
        return (
            <>
                <Section title="6. Transformadores de Corriente (CT)">
                    <SubSection title="Fase R">{renderTransformadorFields('transformadoresCorriente', 'faseR')}</SubSection>
                    <SubSection title="Fase S">{renderTransformadorFields('transformadoresCorriente', 'faseS')}</SubSection>
                    <SubSection title="Fase T">{renderTransformadorFields('transformadoresCorriente', 'faseT')}</SubSection>
                </Section>
                <Section title="7. Transformadores de Tensión (PT)">
                    <SubSection title="Fase R">{renderTransformadorFields('transformadoresTension', 'faseR')}</SubSection>
                    <SubSection title="Fase S">{renderTransformadorFields('transformadoresTension', 'faseS')}</SubSection>
                    <SubSection title="Fase T">{renderTransformadorFields('transformadoresTension', 'faseT')}</SubSection>
                </Section>
            </>
        );
      case 'conductoresComms':
        return (
            <>
                <Section title="8. Conductores">
                    <SubSection title="Circuito de Corriente">
                        <InputField label="Calibre" name="conductores.corriente.calibre" value={state.conductores.corriente.calibre} onChange={handleInputChange} />
                        <InputField label="Denominación" name="conductores.corriente.denominacion" value={state.conductores.corriente.denominacion} onChange={handleInputChange} />
                        <InputField label="Longitud (m)" name="conductores.corriente.longitud" value={state.conductores.corriente.longitud} onChange={handleInputChange} />
                        <InputField label="No. Conductores" name="conductores.corriente.numConductores" value={state.conductores.corriente.numConductores} onChange={handleInputChange} />
                        <InputField label="Tipo" name="conductores.corriente.tipo" value={state.conductores.corriente.tipo} onChange={handleInputChange} />
                        <InputField label="Material" name="conductores.corriente.material" value={state.conductores.corriente.material} onChange={handleInputChange} />
                        <InputField label="Fabricante" name="conductores.corriente.fabricante" value={state.conductores.corriente.fabricante} onChange={handleInputChange} />
                    </SubSection>
                    <SubSection title="Circuito de Tensión">
                        <InputField label="Calibre" name="conductores.tension.calibre" value={state.conductores.tension.calibre} onChange={handleInputChange} />
                        <InputField label="Denominación" name="conductores.tension.denominacion" value={state.conductores.tension.denominacion} onChange={handleInputChange} />
                        <InputField label="Longitud (m)" name="conductores.tension.longitud" value={state.conductores.tension.longitud} onChange={handleInputChange} />
                        <InputField label="No. Conductores" name="conductores.tension.numConductores" value={state.conductores.tension.numConductores} onChange={handleInputChange} />
                        <InputField label="Tipo" name="conductores.tension.tipo" value={state.conductores.tension.tipo} onChange={handleInputChange} />
                        <InputField label="Material" name="conductores.tension.material" value={state.conductores.tension.material} onChange={handleInputChange} />
                        <InputField label="Fabricante" name="conductores.tension.fabricante" value={state.conductores.tension.fabricante} onChange={handleInputChange} />
                    </SubSection>
                    <InputField label="Error Estimado por Cableado (%)" name="conductores.errorCableado" value={state.conductores.errorCableado} onChange={handleInputChange} className="col-span-full mt-4" />
                </Section>
                <Section title="15. Comunicaciones">
                    <SubSection title="Principal">
                        <InputField label="No. Serie Modem" name="comunicaciones.principal.numeroSerieModem" value={state.comunicaciones.principal.numeroSerieModem} onChange={handleInputChange} />
                        <InputField label="Marca Modem" name="comunicaciones.principal.marcaModem" value={state.comunicaciones.principal.marcaModem} onChange={handleInputChange} />
                        <InputField label="IP" name="comunicaciones.principal.ip" value={state.comunicaciones.principal.ip} onChange={handleInputChange} />
                        <InputField label="Puerto" name="comunicaciones.principal.puerto" value={state.comunicaciones.principal.puerto} onChange={handleInputChange} />
                        <InputField label="APN" name="comunicaciones.principal.apn" value={state.comunicaciones.principal.apn} onChange={handleInputChange} />
                        <InputField label="IMEI" name="comunicaciones.principal.imei" value={state.comunicaciones.principal.imei} onChange={handleInputChange} />
                        <InputField label="Comm Port Address" name="comunicaciones.principal.commPortAddress" value={state.comunicaciones.principal.commPortAddress} onChange={handleInputChange} />
                        <InputField label="No. telefónico" name="comunicaciones.principal.noTelefonico" value={state.comunicaciones.principal.noTelefonico} onChange={handleInputChange} />
                        <InputField label="Operador" name="comunicaciones.principal.operador" value={state.comunicaciones.principal.operador} onChange={handleInputChange} />
                        <InputField label="Medio Comunicación" name="comunicaciones.principal.medioComunicacion" value={state.comunicaciones.principal.medioComunicacion} onChange={handleInputChange} />
                        <InputField label="Otro Medio" name="comunicaciones.principal.otroMedio" value={state.comunicaciones.principal.otroMedio} onChange={handleInputChange} />
                    </SubSection>
                    <SubSection title="Respaldo">
                        <InputField label="No. Serie Modem" name="comunicaciones.respaldo.numeroSerieModem" value={state.comunicaciones.respaldo.numeroSerieModem} onChange={handleInputChange} />
                        <InputField label="Marca Modem" name="comunicaciones.respaldo.marcaModem" value={state.comunicaciones.respaldo.marcaModem} onChange={handleInputChange} />
                        <InputField label="IP" name="comunicaciones.respaldo.ip" value={state.comunicaciones.respaldo.ip} onChange={handleInputChange} />
                        <InputField label="Puerto" name="comunicaciones.respaldo.puerto" value={state.comunicaciones.respaldo.puerto} onChange={handleInputChange} />
                        <InputField label="APN" name="comunicaciones.respaldo.apn" value={state.comunicaciones.respaldo.apn} onChange={handleInputChange} />
                        <InputField label="IMEI" name="comunicaciones.respaldo.imei" value={state.comunicaciones.respaldo.imei} onChange={handleInputChange} />
                        <InputField label="Comm Port Address" name="comunicaciones.respaldo.commPortAddress" value={state.comunicaciones.respaldo.commPortAddress} onChange={handleInputChange} />
                        <InputField label="No. telefónico" name="comunicaciones.respaldo.noTelefonico" value={state.comunicaciones.respaldo.noTelefonico} onChange={handleInputChange} />
                        <InputField label="Operador" name="comunicaciones.respaldo.operador" value={state.comunicaciones.respaldo.operador} onChange={handleInputChange} />
                        <InputField label="Medio Comunicación" name="comunicaciones.respaldo.medioComunicacion" value={state.comunicaciones.respaldo.medioComunicacion} onChange={handleInputChange} />
                        <InputField label="Otro Medio" name="comunicaciones.respaldo.otroMedio" value={state.comunicaciones.respaldo.otroMedio} onChange={handleInputChange} />
                    </SubSection>
                </Section>
            </>
        );
      case 'final':
        return (
            <Section title="Observaciones y Responsable">
                 <div className="col-span-full">
                    <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700">16. Observaciones</label>
                    <textarea
                        id="observaciones"
                        name="observaciones"
                        rows={6}
                        value={state.observaciones}
                        onChange={handleInputChange}
                        placeholder={placeholderData.observaciones}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                 </div>
                <InputField label="Nombre Responsable" name="responsable.nombre" value={state.responsable.nombre} onChange={handleInputChange} placeholder={placeholderData.responsable.nombre} />
                <InputField label="Documento" name="responsable.documento" value={state.responsable.documento} onChange={handleInputChange} placeholder={placeholderData.responsable.documento} />
                <InputField label="Fecha de Impresión" name="responsable.fechaImpresion" value={state.responsable.fechaImpresion} onChange={handleInputChange} type="date" />
            </Section>
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center gap-4">
            <img src={logo} alt="Pronto Servicios Logo" className="h-10 sm:h-12" />
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Sistema de medición</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pb-28">
        <div className="px-4 py-6 sm:px-0">
            <div className="border-b border-gray-200 overflow-x-auto">
                <nav className="-mb-px flex space-x-4 sm:space-x-8 flex-nowrap" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${
                                activeTab === tab.id
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-2 sm:px-1 border-b-2 font-medium text-sm`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
          <div className="mt-6">{renderContent()}</div>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-lg z-10">
        <div className="max-w-7xl mx-auto">
            {activeTab === 'final' ? (
                <button
                    onClick={handleGeneratePdf}
                    disabled={isGenerating}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isGenerating ? 'Generando...' : 'Generar PDF'}
                </button>
            ) : (
                <button
                    onClick={handleNext}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Siguiente
                </button>
            )}
        </div>
      </footer>
    </div>
  );
};

export default App;