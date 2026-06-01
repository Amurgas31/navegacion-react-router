import { useEffect, useState } from "react";

const API_URL = "https://retoolapi.dev/1osLfi/dataTest";

const useDataTest = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [dataTest, setDataTest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // Loads the records from the API and updates the list in state.
  const fetchDataTest = async () => {
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

  // Fetch the data once when the hook is mounted.
  useEffect(() => {
    fetchDataTest();
  }, []);

  // Clears the form fields and removes the current record id.
  const resetForm = () => {
    setId("");
    setName("");
    setAge("");
  };

  // Opens the form in create mode with empty values.
  const openCreateForm = () => {
    resetForm();
    setMessage("");
    setActiveTab("form");
  };

  // Loads the selected record into the form so it can be edited.
  const handleEdit = (item) => {
    setId(item.id);
    setName(item.name ?? "");
    setAge(item.age ?? "");
    setMessage("");
    setActiveTab("form");
  };

  // Submits the form to create a new record or update an existing one.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const numericAge = Number(age);

    if (!trimmedName) {
      setError("El nombre es obligatorio");
      return;
    }

    if (!age || Number.isNaN(numericAge) || numericAge < 0) {
      setError("La edad debe ser un numero valido");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setMessage("");

      const payload = {
        name: trimmedName,
        age: numericAge,
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
      fetchDataTest();
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
      await fetchDataTest();

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
    name,
    setName,
    age,
    setAge,
    fetchDataTest,
    openCreateForm,
    handleEdit,
    handleSubmit,
    handleDelete,
  };
};

export default useDataTest;
