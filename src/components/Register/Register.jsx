// src/components/Register/Register.jsx
import React, { useState } from 'react';
import supabase from '../../api/v1';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [username, setUsername] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');

  const handleRegister = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: username, // Use email as a username
        password: contrasena,
      });
  
      if (error) {
        throw error;
      }
  
      // If the user is successfully registered, add additional data to the 'usuarios' table
      const { data: userData, error: profileError } = await supabase
        .from('usuarios')
        .upsert(
          [{ id: user.id, nombre, apellido, username, foto_perfil: fotoPerfil }],
          { onConflict: ['id'] }
        );
  
      if (profileError) {
        throw profileError;
      }
  
      // Optionally, you can redirect to the login page or any other page upon successful registration.
      console.log('User registration successful:', user, userData);
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      <form>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <br />
        <label>
          Apellido:
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </label>
        <br />
        <label>
          Username (email):
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
        </label>
        <br />
        <label>
          Foto de Perfil (URL):
          <input type="text" value={fotoPerfil} onChange={(e) => setFotoPerfil(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
