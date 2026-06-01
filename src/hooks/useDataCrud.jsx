import { useEffect, useState } from "react";

const API_URL = "https://retoolapi.dev/f1D0Zs/dataGrupo2A";

const useDataCrud = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [dataTest, setDataTest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [id, setId] = useState("");
  const [cancion, setCancion] = useState("");
  const [cantante, setCantante] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");

  // Loads the records from the API and updates the list in state.
  const fetchDataCrud = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("No se pudo obtener la información");
      }

      const data = await response.json();
      setDataTest(data);
    } catch (fetchError) {
      setError(fetchError.message || "Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataCrud();
  }, []);

  const resetForm = () => {
    setId("");
    setCancion("");
    setCantante("");
    setNacionalidad("");
  };

  const openCreateForm = () => {
    resetForm();
    setMessage("");
    setActiveTab("form");
  };

  const handleEdit = (item) => {
    setId(item.id);
    setCancion(item.cancion ?? "");
    setCantante(item.cantante ?? "");
    setNacionalidad(item.nacionalidad ?? "");
    setMessage("");
    setActiveTab("form");
  };

  // Submits the form to create a new record or update an existing one.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedCancion = cancion.trim();
    const trimmedCantante = cantante.trim();
    const trimmedNacionalidad = nacionalidad.trim();

    if (!trimmedCancion) {
      setError("La canción es obligatoria");
      return;
    } else if (!trimmedCantante) {
      setError("El cantante es obligatorio");
      return;
    } else if (!trimmedNacionalidad) {
      setError("La nacionalidad es obligatoria");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setMessage("");

      const payload = {
        cancion: trimmedCancion,
        cantante: trimmedCantante,
        nacionalidad: trimmedNacionalidad,
      };

      const response = await fetch(id ? `${API_URL}/${id}` : API_URL, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(id ? "No se pudo actualizar" : "No se pudo crear");
      }

      setMessage(
        id
          ? "Registro actualizado correctamente"
          : "Registro creado correctamente"
      );
      resetForm();
      setActiveTab("list");
      fetchDataCrud();
    } catch (submitError) {
      setError(submitError.message || "Error al guardar el registro");
    } finally {
      setSubmitting(false);
    }
  };

  // Deletes a record after confirmation and refreshes the list.
  const handleDelete = async (itemId) => {
    const shouldDelete =
      typeof window === "undefined"
        ? true
        : window.confirm("¿Deseas eliminar este registro?");

    if (!shouldDelete) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(`${API_URL}/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el registro");
      }

      setMessage("Registro eliminado correctamente");
      await fetchDataCrud();

      if (String(id) === String(itemId)) {
        resetForm();
        setActiveTab("list");
      }
    } catch (deleteError) {
      setError(deleteError.message || "Error al eliminar el registro");
    }
  };

  return {
    activeTab,
    setActiveTab,
    dataTest,
    loading,
    submitting,
    error,
    message,
    id,
    cancion,
    setCancion,
    cantante,
    setCantante,
    nacionalidad,
    setNacionalidad,
    fetchDataCrud,
    openCreateForm,
    handleEdit,
    handleSubmit,
    handleDelete,
  };
};

export default useDataCrud;
