import React from "react";
 
import useFakeLogin from "../hooks/useFakeLogin";
 
const Home = () => {
 
  const { authCokie, setAuthCokie } = useFakeLogin();
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Bienvenido a Nuestra App
        </h1>
      </header>
      <main className="mt-8">
        <button
          className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={() => setAuthCokie(!authCokie)}
        >
          Cambiar estado de autenticación (Simulación)
        </button>
 
        <p className="mt-4 text-gray-700">
          Estado de autenticación:{" "}
          <span className="font-bold">
            {authCokie ? "Autenticado" : "No autenticado"}
          </span>
        </p>
      </main>
    </div>
  );
};
 
export default Home;