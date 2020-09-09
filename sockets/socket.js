const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, guardarMensaje } = require('../controllers/socket_controller');

// Mensajes de Sockets
io.on('connection', client => {


    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    // Verificar JWT
    if (!valido) { return client.disconnect() }
    console.log('Cliente conectado');


    // Cliente autenticado
    usuarioConectado(uid);

    // Ingresar al usuario a una sala
    // Sala global, sala de cliente.id, sala privada
    client.join(uid);

    // Escuchar mensaje personal
    client.on('mensaje-personal', async (payload) => {
        await guardarMensaje(payload);
        io.to(payload.destino).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });


    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });
});
