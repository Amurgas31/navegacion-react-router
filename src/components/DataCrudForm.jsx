import React from "react";

const DataCrudForm = ({
  id,
  cancion,
  setCancion,
  cantante,
  setCantante,
  nacionalidad,
  setNacionalidad,
  onSubmit,
  onCancel,
  submitting,
  error,
  message,
}) => {
  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {id ? "Editar registro" : "Crear registro"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Administra los datos de la música con canción, cantante y nacionalidad.
          </p>
        </div>

        {id ? (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Cancelar edición
          </button>
        ) : null}
      </div>

      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </div>
      ) : null}

      <form className="space-y-4" onSubmit={onSubmit}>
        {/* Campo Canción */}
        <div>
          <label
            htmlFor="cancion"
            className="block text-sm font-medium text-gray-700"
          >
            Canción
          </label>
          <input
            type="text"
            id="cancion"
            value={cancion}
            onChange={(event) => setCancion(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el nombre de la canción"
          />
        </div>

        {/* Campo Cantante */}
        <div>
          <label
            htmlFor="cantante"
            className="block text-sm font-medium text-gray-700"
          >
            Cantante
          </label>
          <input
            type="text"
            id="cantante"
            value={cantante}
            onChange={(event) => setCantante(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el nombre del cantante"
          />
        </div>

        {/* Campo Nacionalidad */}
        <div>
          <label
            htmlFor="nacionalidad"
            className="block text-sm font-medium text-gray-700"
          >
            Nacionalidad
          </label>
          <input
            type="text"
            id="nacionalidad"
            value={nacionalidad}
            onChange={(event) => setNacionalidad(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa la nacionalidad"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {submitting
            ? "Guardando..."
            : id
            ? "Actualizar registro"
            : "Crear registro"}
        </button>
      </form>
    </section>
  );
};

export default DataCrudForm;