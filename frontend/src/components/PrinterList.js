const PrinterList = ({ printer }) => {
    return (
        <div className="printer-details">
            <div class="w-full flex justify-center items-center" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <div class="w-3/5 bg-blue-100 rounded-lg shadow-sm p-5 border border border-blue-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                    <div class="flex flex-col sm:flex-row justify-start items-center gap-4">
                        <div class="text-center sm:text-left">
                            <h1 class="text-gray-800 font-bold tracking-wider">{printer.nombreImpresora}</h1>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>IP de la Impresora: </strong>{printer.ipImpresora}</p>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>Páginas Impresas: </strong>{printer.totalPaginasImpresasIm}</p>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>Promedio de Páginas por trabajo: </strong>{printer.promedioPaginasPorTrabajoIm}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrinterList