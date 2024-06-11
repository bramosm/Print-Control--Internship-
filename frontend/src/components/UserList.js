const UserList = ({ user }) => {
    return (
        <div className="user-details">
            <div class="w-full flex justify-center items-center" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <div class="w-3/5 bg-blue-100 rounded-lg shadow-sm p-5 border border border-blue-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                    <div class="flex flex-col sm:flex-row justify-start items-center gap-4">
                        <div class="text-center sm:text-left">
                            <h1 class="text-gray-800 font-bold tracking-wider">{user.nombreUsuario}</h1>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>Correo: </strong>{user.emailUsuario}</p>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>Total de Páginas Impresas: </strong>{user.totalPaginasImpresas}</p>
                                <p class="text-gray-500 font-semibold"><strong class='text-gray-800 font-bold'>Promedio de Páginas Impresas por Trabajo: </strong>{user.promedioPaginasPorTrabajo}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserList