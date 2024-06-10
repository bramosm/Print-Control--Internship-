const PrintDetails = ({ print }) => {
    return (
        <div className="print-details">
            <div class="w-full flex justify-center items-center" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <div class="w-3/5 bg-blue-100 rounded-lg shadow-sm p-5 border border border-blue-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                    <div class="flex flex-col sm:flex-row justify-start items-center gap-4">
                        <div class="text-center sm:text-left">
                            <h1 class="text-gray-800 font-bold tracking-wider">{print.nombreDocumento}</h1>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>Usuario: </strong>{print.nombreUsuario}</p>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>Cliente: </strong>{print.nombreCliente}</p>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>Impresora: </strong>{print.nombreImpresora}</p>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>Páginas Impresas: </strong>{print.paginasImpresas}</p>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>Fecha de Impresión: </strong>{print.fechaImpresion}</p>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>Fecha de inserción a la base de datos: </strong>{print.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrintDetails