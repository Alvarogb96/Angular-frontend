export const constantes = {
    //Consultas
    SERVICE_GET_EMPLEADO: '/empleados/',
    SERVICE_GET_SUCURSAL: '/sucursales/',
    SERVICE_GET_TESTS_EMPLEADO: '/testsEmpleado/',
    SERVICE_GET_TIPOS_TEST: '/tiposTest/',
    SERVICE_POST_TEST: '/addTest/',
    SERVICE_GET_NOTICIAS: '/noticias/',
    SERVICE_GET_EPI_DISPONIBLE: '/episDisponibles/',
    SERVICE_POST_SOLICITUD_EPI: '/addSolicitudEpi/',
    SERVICE_GET_SOLICITUDES_EPI_USUARIO: '/solicitudesEpiEmpleado/',
    SERVICE_POST_FILE_SOLICITUD_BAJA: '/uploadFileBaja',
    SERVICE_POST_BAJA: '/addSolicitudBaja/',
    SERVICE_GET_SOLICITUDES_BAJA_USUARIO: '/solicitudesBaja/',
    SERVICE_POST_USUARIO: '/addUsuario/',
    SERVICE_PUT_USUARIO: '/updateUsuario/',
    SERVICE_PUT_USUARIO_BY_DIRECTIVO: '/updateUsuarioByDirectivo/',
    SERVICE_PUT_USUARIO_PASSWORD: '/updateUsuarioPassword/',
    SERVICE_PUT_SUCURSAL_PASSWORD: '/updateSucursalPassword/',
    SERVICE_GET_ALL_EMPLEADOS: '/empleados/',
    SERVICE_POST_SOLICITUDES_EPI_BY_PARAMETERS: '/solicitudesEpiByParameters/',
    SERVICE_GET_ALL_EMAILS: '/emailsEmpleados/',
    SERVICE_GET_MATERIALES_SOLICITUD_EPI: '/materialesSolicitud/',
    SERVICE_PUT_SOLICITUD_EPI: '/updateSolicitudEpi/',
    SERVICE_POST_SOLICITUDES_BAJA_BY_PARAMETERS: '/solicitudesBajaByParameters/',
    SERVICE_PUT_SOLICITUD_BAJA: '/updateSolicitudBaja/',
    SERVICE_POST_NOTICIA: '/addNoticia/',
    SERVICE_GET_TIPOS_EPI: '/tiposEpi/',
    SERVICE_POST_EPI: '/addEPI/',
    SERVICE_GET_EPIS_BY_ID_SUCURSAL: '/epis/',
    SERVICE_GET_SOLICITUDES_ANALISIS: '/getSolicitudesAprobadas/',
    SERVICE_GET_EPIS_ANALISIS: '/getEpisAnalisis/',
    SERVICE_GET_VACUNAS_ANALISIS: '/getVacunasAnalisis/',
    SERVICE_GET_BAJAS_ANALISIS: '/getBajasAnalisis/',
    SERVICE_GET_NOTICIAS_BY_SUCURSAL: '/noticiasBySucursal/',
    SERVICE_DELETE_NOTICIA: '/deleteNoticia/',
    SERVICE_UPDATE_NOTICIA: '/updateNoticia/',
    SERVICE_GET_SUCURSALES_BY_ID_DIRECTIVO: '/tiposEpi/',
    SERVICE_POST_FILE_TEST: '/uploadFileTest',
    SERVICE_DOWNLOAD_TEST: '/downloadTest/',
    SERVICE_DOWNLOAD_SOLICITUD_BAJA: '/downloadFileBaja/',
    SERVICE_GET_TIPOS_VACUNA: '/tiposVacuna/',
    SERVICE_POST_VACUNA: '/addVacuna/',
    SERVICE_GET_VACUNAS_EMPLEADO: '/vacunasEmpleado/',
    SERVICE_POST_FILE_VACUNA: '/uploadFileVacuna',
    SERVICE_DOWNLOAD_VACUNA: '/downloadFileVacuna/',
    SERVICE_GET_SUCURSALES_BY_ID_EMPRESA: '/sucursalesEmpresa/',
    SERVICE_GET_EMPLEADOS_BY_PARAMETERS: '/empleadosSucursal/',
    SERVICE_PUT_JORNADA_BY_DIRECTIVO: '/updateJornadaByDirectivo/',
    SERVICE_DELETE_EPI: '/deleteEPI/',
    SERVICE_GET_STOCK_EPI_SUCURSAL: '/stockMinimoBySucursal/',
    SERVICE_POST_STOCK_EPI_SUCURSAL: '/addStockEpis/',
    SERVICE_DELETE_TEST: '/deleteTest/',
    SERVICE_UPDATE_TEST: '/updateTest/',
    SERVICE_DELETE_VACUNA: '/deleteVacuna/',
    SERVICE_UPDATE_VACUNA: '/updateVacuna/',

    //Mensajes error login
    EMAIL_VACIO: 'Debe introducir un correo electrónico',
    EMAIL_ERROR: 'Introduce un correo electrónico válido',
    PASSWORD_VACIA: 'Debe introducir una contraseña',

    //Mensajes Logout
    MENSAJE_LOGOUT: 'Abandonará la sesión y será redirigido a la pantalla de login. ¿Desea continuar?',
    MENSAJE_LOGOUT_HEADER: 'Cerrar sesión',

    //Mensajes Solicitud Epi
    MENSAJE_GUARDAR_SOLICITUD_EPI: 'Va a realizar una solicitud de equipos de protección individual. ¿Desea continuar?',
    MENSAJE_GUARDAR_SOLICITUD_EPI_HEADER: 'Confirmación',
    MENSAJE_GUARDAR_SOLICITUD_ERROR: 'No hay suficiente cantidad de alguno de los equipos seleccionados',
    MENSAJE_GUARDAR_SOLICITUD_ERROR_HEADER: 'No se pudo realizar la solicitud',
    MENSAJE_GUARDAR_SOLICITUD_CORRECTO: 'Solicitud de equipos de protección individual registrada correctamente en el sistema',
    MENSAJE_GUARDAR_SOLICITUD_CORRECTO_HEADER: 'Solicitud añadida',
    MENSAJE_GUARDAR_SOLICITUD_ERROR_CANTIDAD: 'La cantidad solicitada de alguno de los EPI debe ser mayor que 0',

    //Mensajes toast
    MENSAJE_CABECERA_AÑADIDO_CORRECTAMENTE: 'Guardado correctamente',
    MENSAJE_TEST_AÑADIDO_CORRECTAMENTE: 'Test médico registrado en el sistema',
    MENSAJE_ERROR_ARCHIVO_TEST: 'No hay ningún archivo para descargar asociado a este Test',
    MENSAJE_ERROR_ARCHIVO_TEST_HEADER: 'Test sin archivo',
    MENSAJE_CONSULTA_EMAIL_ERRONEA: 'Error en la consulta de emails de empleados',
    MENSAJE_CONSULTA_ERRONEA_GENERICO: 'Consulta datos fallida',

    //Mensaje solicitud Epi
    MENSAJE_CONSULTA_SOLICITUD_EPI_PARAMETROS: 'Consulta de solicitudes sin resultados para los parámetros dados',
    MENSAJE_APROBAR_SOLICITUD_EPI: '¿Desea aprobar la solicitud de equipos de protección individual?',
    MENSAJE_APROBAR_SOLICITUD_EPI_HEADER: 'Aprobar solicitud',
    MENSAJE_RECHAZAR_SOLICITUD_EPI: '¿Desea rechazar la solicitud de equipos de protección individual?',
    MENSAJE_RECHAZAR_SOLICITUD_EPI_HEADER: 'Rechazar solicitud',
    MENSAJE_SOLICITUD_APROBADA_ACTUALIZADA: 'Solicitud aprobada correctamente',
    MENSAJE_SOLICITUD_RECHAZADA_ACTUALIZADA: 'Solicitud rechazada correctamente',
    MENSAJE_SOLICITUD_ACTUALIZADA: 'Solicitud actualizada',

    //Mensaje solicitud Baja
    MOTIVO_VACIO: 'Debe introducir el motivo por el que se solicita la baja.',
    MENSAJE_ARCHIVO_SOLICITUD_BAJA: 'Debe adjuntar un archivo médico con información relativa a la baja laboral.',
    MENSAJE_ARCHIVO_SOLICITUD_BAJA_HEADER: 'Falta archivo a adjuntar',
    MENSAJE_GUARDAR_SOLICITUD_BAJA_CORRECTO: 'Solicitud de baja registrada correctamente en el sistema',
    MENSAJE_GUARDAR_SOLICITUD_BAJA_CORRECTO_HEADER: 'Solicitud de baja añadida',
    MENSAJE_ERROR_ARCHIVO_SOLICITUD_BAJA: 'La solicitud no tiene ningún archivo médico asociado',
    MENSAJE_ERROR_ARCHIVO_SOLICITUD_BAJA_HEADER: 'Solicitud sin archivo',
    MENSAJE_APROBAR_SOLICITUD_BAJA: '¿Desea aprobar la solicitud de trabajo remoto?',
    MENSAJE_APROBAR_SOLICITUD_BAJA_HEADER: 'Aprobar solicitud',
    MENSAJE_RECHAZAR_SOLICITUD_BAJA: '¿Desea rechazar la solicitud de trabajo remoto?',
    MENSAJE_RECHAZAR_SOLICITUD_BAJA_HEADER: 'Rechazar solicitud',


    //Mensaje alta usuario
    MENSAJE_GUARDAR_USUARIO: 'Realizará el alta de este usuario en el sistema. ¿Desea continuar?',
    MENSAJE_GUARDAR_USUARIO_HEADER: 'Confirmación',
    MENSAJE_CABECERA_AÑADIDO_USUARIO_ERRONEO: 'Error al guardar',
    MENSAJE_AÑADIDO_USUARIO_CORRECTO_CABECERA: 'Guardado correctamente',
    MENSAJE_AÑADIDO_USUARIO_CORRECTO: 'El usuario se ha guardado correctamente en el sistema',

    //Mensaje editar usuario
    MENSAJE_EDITAR_USUARIO: 'Los cambios realizados se guardarán en el sistema. ¿Desea continuar?',
    MENSAJE_CABECERA_EDITADO_USUARIO_ERRONEO: 'Error al editar usuario',
    MENSAJE_EDITADO_USUARIO_CORRECTO_CABECERA: 'Editado correctamente',
    MENSAJE_EDITADO_USUARIO_CORRECTO: 'El usuario se ha guardado correctamente en el sistema',
    MENSAJE_EDITADO_USUARIO_PASSWORD_CORRECTO_CABECERA: 'Cambio contraseña correcto',
    MENSAJE_EDITADO_USUARIO_PASSWORD_CORRECTO: 'La nueva contraseña se ha guardado correctamente en el sistema',

    //Mensaje empleados
    MENSAJE_CONSULTA_USUARIOS_ERRONEA: 'Error en la consulta de usuarios',

    //Mensaje alta epi
    MENSAJE_GUARDAR_EPI: 'Realizará el alta de este equipo de protección individual en el sistema. ¿Desea continuar?',
    MENSAJE_GUARDAR_EPI_HEADER: 'Confirmación',
    MENSAJE_CABECERA_AÑADIDO_EPI_ERRONEO: 'Error al guardar',
    MENSAJE_AÑADIDO_EPI_CORRECTO_CABECERA: 'Guardado correctamente',
    MENSAJE_AÑADIDO_EPI_CORRECTO: 'El equipo de protección individual se ha guardado correctamente en el sistema',

    MENSAJE_ELIMINAR_EPI: 'Eliminará este equipo de protección individual del sistema. ¿Desea continuar?',
    MENSAJE_ELIMINAR_EPI_HEADER: 'Eliminar equipo de protección individual',
    MENSAJE_ELIMINADA_EPI_CORRECTO_CABECERA: 'Eliminado correctamente',
    MENSAJE_ELIMINADA_EPI_CORRECTO: 'El equipo de protección individual se ha eliminado correctamente del sistema',

    //Mensaje vacuna
    MENSAJE_VACUNA_AÑADIDA_CORRECTAMENTE: 'Información de vacuna registrada en el sistema',
    MENSAJE_ERROR_ARCHIVO_VACUNA: 'No hay ningún archivo para descargar asociado a esta vacuna',
    MENSAJE_ERROR_ARCHIVO_VACUNA_HEADER: 'Información de vacuna sin archivo',
    MENSAJE_ELIMINAR_VACUNA: 'Eliminará la información de esta vacuna del sistema. ¿Desea continuar?',
    MENSAJE_ELIMINAR_VACUNA_HEADER: 'Eliminar Vacuna',
    MENSAJE_ELIMINADA_VACUNA_CORRECTO_CABECERA: 'Eliminada correctamente',
    MENSAJE_ELIMINADA_VACUNA_CORRECTO: 'La vacuna se ha eliminado correctamente del sistema',
    MENSAJE_EDITADA_VACUNA_CORRECTO_CABECERA: 'Editada correctamente',
    MENSAJE_EDITADA_VACUNA_CORRECTO: 'La información de la vacuna se ha editado correctamente en el sistema',

    //noticias
    MENSAJE_GUARDAR_NOTICIA: 'Realizará el alta de esta noticia en el sistema. ¿Desea continuar?',
    MENSAJE_GUARDAR_NOTICIA_HEADER: 'Confirmación',
    MENSAJE_CABECERA_AÑADIDO_NOTICIA_ERRONEO: 'Error al guardar',
    MENSAJE_CABECERA_AÑADIDO_NOTICIA_CORRECTO_CABECERA: 'Guardado correctamente',
    MENSAJE_CABECERA_AÑADIDO_NOTICIA_CORRECTO: 'La noticia se ha guardado correctamente en el sistema',
    MENSAJE_ELIMINAR_NOTICIA: 'Eliminará esta noticia del sistema. ¿Desea continuar?',
    MENSAJE_ELIMINAR_NOTICIA_HEADER: 'Eliminar noticia',
    MENSAJE_ELIMINADA_NOTICIA_CORRECTO_CABECERA: 'Eliminada correctamente',
    MENSAJE_ELIMINADA_NOTICIA_CORRECTO: 'La noticia se ha eliminado correctamente del sistema',
    MENSAJE_CABECERA_ELIMINADO_ERRONEO: 'Error al eliminar',
    MENSAJE_EDITADA_NOTICIA_CORRECTO_CABECERA: 'Editada correctamente',
    MENSAJE_EDITADA_NOTICIA_CORRECTO: 'La noticia se ha editado correctamente en el sistema',
    MENSAJE_CABECERA_EDITADO_ERRONEO: 'Error al editar',

    //tests
    MENSAJE_ELIMINAR_TEST: 'Eliminará la información de este test médico del sistema. ¿Desea continuar?',
    MENSAJE_ELIMINAR_TEST_HEADER: 'Eliminar test',
    MENSAJE_ELIMINADO_TEST_CORRECTO_CABECERA: 'Eliminado correctamente',
    MENSAJE_ELIMINADA_TEST_CORRECTO: 'El test se ha eliminado correctamente del sistema',
    MENSAJE_EDITADO_TEST_CORRECTO_CABECERA: 'Editado correctamente',
    MENSAJE_EDITADO_TEST_CORRECTO: 'La información del test se ha editado correctamente en el sistema',

    //Mensaje guardar stock epi

    MENSAJE_GUARDAR_STOCK_ERROR_HEADER: 'Error al guardar',
    MENSAJE_GUARDAR_STOCK_CORRECTO: 'Stock mínimo de equipos de protección individual registrado correctamente en el sistema',
    MENSAJE_GUARDAR_STOCK_CORRECTO_HEADER: 'Stock mínimo guardado',
    MENSAJE_GUARDAR_STOCK_MINIMO: 'Va a modificar el stock mínimo de los equipos de protección individual. ¿Desea continuar?',
    

    //Roles
    ROLE_EMPLEADO: 'E',
    ROLE_DIRECTIVO: 'D',
    ROLE_EMPRESA: 'C',
    ROLE_EMPLEADO_COMPLETO: 'Empleado',
    ROLE_DIRECTIVO_COMPLETO: 'Directivo',
    ROLE_EMPRESA_COMPLETO: 'Empresa',

    //Generales
    PALABRA_ACEPTAR: 'Aceptar',
    PALABRA_CANCELAR: 'Cancelar',

    //Solicitudes 
    ESTADO_APROBADA: 'Aprobada',
    ESTADO_RECHAZADA: 'Rechazada',
    ESTADO_EN_REVISION: 'En revisión',
    APROBADA: 'S',
    NO_APROBADA: 'N',

    //Mensajes error
    CAMPO_OBLIGATORIO: 'Campo obligatorio',
    CAMPO_LONGITUD_MINIMA: 'No tiene la longitud mínima de caracteres',
    FORMATO_DNI: 'Formato NIF incorrecto',
    CONTRASEÑAS_DISTINTAS: 'Las contraseñas no coinciden',
    MENSAJE_EXPRESION_REGULAR: 'La contraseña no tiene el formato indicado'
                                








}