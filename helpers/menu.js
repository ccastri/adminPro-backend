const getMenuFront = (role) => {
    const menu = []
    if (role === 'USER_ROLE') {
        menu.push(
            {

                title: 'Medicina General',
                icon: 'mdi mdi-gauge',
                submenu: [
                    // Informacion basica acerca de mejoras y optimizacion de procesos en la institucion
                    // Tambien acerca del manejo que se le puede dar a enfermedades comunes dpeendiendo ubicacion
                    // Si el paciente tiene una condicion especifica se le puede dar a conocer informacion al respecto
                    { title: 'Novedades', url: '/' },
                    // Linea de tiempo con los momentos importantes durante el proceso clinico que atraviese el paciente
                    { title: 'Mi diagnóstico', url: 'diagnostic' },
                    // Linea de tiempo con los momentos importantes durante el proceso clinico que atraviese el paciente
                    { title: 'Mi tratamiento', url: 'treatment' },
                    // PDF's y demás documentación que se le entrega a los pacientes despues de usar servicios diagnósticos
                    { title: 'Mis resultados', url: 'results' },
                    // Calendario para agendar consultas: Citas presenciales o 
                    // virtuales usando servicios de videollamadas(Servicio pro)
                    { title: 'Mis citas', url: 'appointments' },
                    // Tener una relacion de gastos incurridos por el paciente durante uno o varios procesos clinicos
                    // Cotizaciones de servicios de terceros que le puedan interesar dentro de sus procesos
                    // Informacion acerca de legislaciones beneficas y posibles extensiones de cobertura a pacientes
                    { title: 'Mis finanzas', url: 'finances' },
                    { title: 'Mis estadisticas', url: 'chart1' },

                ],
            },
            {

                title: 'Medicina Especializada',
                icon: 'mdi mdi-gauge',
                submenu: [
                    // Informacion basica acerca de mejoras y optimizacion de procesos en la institucion
                    // Tambien acerca del manejo que se le puede dar a enfermedades comunes dpeendiendo ubicacion
                    // Si el paciente tiene una condicion especifica se le puede dar a conocer informacion al respecto
                    { title: 'Novedades', url: '/spcialties/news' },
                    // Linea de tiempo con los momentos importantes durante el proceso clinico que atraviese el paciente
                    { title: 'Mi diagnóstico', url: '/spcialties/diagnostic' },
                    // Linea de tiempo con los momentos importantes durante el proceso clinico que atraviese el paciente
                    { title: 'Mi tratamiento', url: '/spcialties/treatment' },
                    // PDF's y demás documentación que se le entrega a los pacientes despues de usar servicios diagnósticos
                    { title: 'Mis resultados', url: '/spcialties/results' },
                    // Calendario para agendar consultas: Citas presenciales o 
                    // virtuales usando servicios de videollamadas(Servicio pro)
                    { title: 'Mis citas', url: '/spcialties/appointments' },
                    // Tener una relacion de gastos incurridos por el paciente durante uno o varios procesos clinicos
                    // Cotizaciones de servicios de terceros que le puedan interesar dentro de sus procesos
                    // Informacion acerca de legislaciones beneficas y posibles extensiones de cobertura a pacientes
                    { title: 'Mis finanzas', url: 'finances' },
                ],
            },
            {

                title: 'Mis Ordenes',
                icon: 'mdi mdi-gauge',
                submenu: [
                    // Informacion basica acerca de mejoras y optimizacion de procesos en la institucion
                    // Tambien acerca del manejo que se le puede dar a enfermedades comunes dpeendiendo ubicacion
                    // Si el paciente tiene una condicion especifica se le puede dar a conocer informacion al respecto
                    { title: 'Novedades', url: '/Patients/orders/news' },
                    // Linea de tiempo con los momentos importantes durante el proceso clinico que atraviese el paciente
                    { title: 'Laboratorio clinico', url: '/Patients/orders/lab' },
                    // Linea de tiempo con los momentos importantes durante el proceso clinico que atraviese el paciente
                    { title: 'Laboratorio de imagenes', url: '/Patients/orders/imaging' },
                    // PDF's y demás documentación que se le entrega a los pacientes despues de usar servicios diagnósticos
                    { title: 'Ordenes de medicamentos', url: '/Patients/orders/meds' },
                    // Calendario para agendar consultas: Citas presenciales o 
                    // virtuales usando servicios de videollamadas(Servicio pro)
                    { title: 'Prestamo de equipos', url: '/Patients/orders/borrow-device' },
                    // Tener una relacion de gastos incurridos por el paciente durante uno o varios procesos clinicos
                    // Cotizaciones de servicios de terceros que le puedan interesar dentro de sus procesos
                    // Informacion acerca de legislaciones beneficas y posibles extensiones de cobertura a pacientes
                ],
            },
            {

                title: 'Mi familia',
                icon: 'mdi mdi-gauge',
                submenu: [
                    // Informacion basica acerca de mejoras y optimizacion de procesos en la institucion
                    // Tambien acerca del manejo que se le puede dar a enfermedades comunes dpeendiendo ubicacion
                    // Si el paciente tiene una condicion especifica se le puede dar a conocer informacion al respecto
                    { title: 'Novedades Familia', url: '/Familia/news' },
                    // Linea de tiempo con los momentos importantes durante el proceso clinico que atraviese el paciente
                    { title: 'Mis mascotas', url: '/Familia/pet-frendly' },
                    // Linea de tiempo con los momentos importantes durante el proceso clinico que atraviese el paciente
                    { title: 'Laboratorio de Familiar', url: '/Familia/orders/imaging' },
                    // PDF's y demás documentación que se le entrega a los pacientes despues de usar servicios diagnósticos
                    { title: 'Calendario Familiar', url: '/Patients/orders/meds' },
                    // Calendario para agendar consultas: Citas presenciales o 
                    // virtuales usando servicios de videollamadas(Servicio pro)
                    { title: 'Mis Seguro familiar', url: '/Care-Plan/orders/borrow-device' },
                    // Tener una relacion de gastos incurridos por el paciente durante uno o varios procesos clinicos
                    // Cotizaciones de servicios de terceros que le puedan interesar dentro de sus procesos
                    // Informacion acerca de legislaciones beneficas y posibles extensiones de cobertura a pacientes
                ],
            }


        )
    }
    if (role === 'ADMIN_ROLE' || role === 'DOCTOR_ROLE') {
        menu.push({
            title: 'Hospital virtual',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                // { title: 'Users', url: 'users' },
                { title: 'Laboratorio clínico', url: 'lab' },
                { title: 'Prescripciones médicas', url: 'prescriptions' },
                { title: 'Laboratorio de imágenes', url: 'Imaging' },
            ]
        })
        menu.push({
            title: 'Mi hospital',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                // { title: 'Users', url: 'users' },
                { title: 'Doctores', url: 'doctors' },
                { title: 'Hospitales', url: 'hospitals' },
            ],
        })
    }
    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: 'Usuarios', url: 'users' })
        menu[1].submenu.push([{ title: 'Reportes de laboratorio', url: 'lab' }, { title: 'Reportes de imagenes', url: 'imaging' }])
    }
    if (role === 'DOCTOR_ROLE') {
        // Opciones específicas para doctores
        menu.push({
            title: 'Mi Consultorio',
            icon: 'mdi mdi-doctor',
            submenu: [
                // Opciones específicas para el rol "DOCTOR_ROLE"
                { title: 'Mis pacientes', url: 'assigned-patients' },
                { title: 'Mi quirofano', url: 'assigned-patients' },
                { title: 'Historial de pacientes', url: 'patient-history' },
                // Puedes agregar más opciones específicas para doctores aquí
            ],
        });
    }

    // !PENDIENTE IMPLEMENTAR MENU DE DOCTORES
    // if (role === 'DOCTOR_ROLE') {
    //     menu[2].submenu.unshift({ title: 'Usuarios', url: 'users' })
    //     menu[2].submenu.push([{ title: 'Reportes de laboratorio', url: 'lab' }, { title: 'Reportes de imagenes', url: 'imaging' }])
    // }
    return menu
}

module.exports = { getMenuFront }