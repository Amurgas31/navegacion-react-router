import React from "react";

const DataCrudList = ({
  dataTest,
  loading,
  error,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Lista de registros
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Consulta, edita y elimina los datos de la música.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Nuevo registro
        </button>
      </div>

      {loading ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-center text-gray-600">
          Cargando datos...
        </div>
      ) : null}

      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!loading && (!dataTest || !dataTest.length) ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-gray-600">
          No hay registros disponibles.
        </div>
      ) : null}

      {!loading && dataTest && dataTest.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-sm font-semibold text-gray-600">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Canción</th>
                <th className="px-4 py-3">Cantante</th>
                <th className="px-4 py-3">Nacionalidad</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataTest.map((item) => (
                <tr key={item.id} className="text-sm text-gray-700">
                  <td className="px-4 py-3 text-gray-500">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.cancion}
                  </td>
                  <td className="px-4 py-3">{item.cantante}</td>
                  <td className="px-4 py-3">{item.nacionalidad}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
};

export default DataCrudList;