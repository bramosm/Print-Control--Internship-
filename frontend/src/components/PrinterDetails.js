const PrinterDetails = ({ printer }) => {
    return (
        <div className="print-details">
            <div class="w-full flex justify-center items-center" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <div class="w-3/5 bg-blue-100 rounded-lg shadow-sm p-5 border border border-blue-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                    <div class="flex flex-col sm:flex-row justify-start items-center gap-4">
                        <div class="text-center sm:text-left">
                            <h1 class="text-gray-800 font-bold tracking-wider">{printer.nombreImpresora}</h1>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>Nombre de la Impresora: </strong>{printer.nombreImpresora}</p>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>IP de la Impresora: </strong>{printer.ipImpresora}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrinterDetails