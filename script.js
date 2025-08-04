const dataUrl = 'data.json';
const usuariosUrl = 'usuarios.json';

// Mostrar formulario de registro
document.getElementById('mostrar-registro')?.addEventListener('click', () => {
    const registroForm = document.getElementById('registro-form');
    registroForm.classList.toggle('oculto');
});

// Manejar el formulario de inicio de sesión
document.getElementById('login-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    fetch(usuariosUrl)
        .then(res => res.json())
        .then(data => {
            const usuarioValido = data.usuarios.find(
                u => u.usuario === usuario && u.password === password
            );

            if (usuarioValido) {
                alert('Inicio de sesión exitoso');
                localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioValido));
                window.location.href = 'index.html';
            } else {
                mostrarErrorLogin();
            }
        });
});

function mostrarErrorLogin() {
    const error = document.getElementById('login-error');
    error.classList.remove('oculto');
    setTimeout(() => {
        error.classList.add('oculto');
    }, 3000);
}

// Manejar el formulario de registro
document.getElementById('registro-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const nuevoUsuario = document.getElementById('nuevo-usuario').value;
    const nuevoPassword = document.getElementById('nuevo-password').value;
    const telefono = document.getElementById('telefono').value;

    fetch(usuariosUrl)
        .then(res => res.json())
        .then(data => {
            const existe = data.usuarios.some(u => u.usuario === nuevoUsuario);
            if (existe) {
                alert('El usuario ya existe.');
                return;
            }

            data.usuarios.push({ usuario: nuevoUsuario, password: nuevoPassword, telefono });
            guardarUsuarios(data).then(() => {
                document.getElementById('registro-form').reset();
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
            });
        });
});

function guardarUsuarios(data) {
    return fetch(usuariosUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}
