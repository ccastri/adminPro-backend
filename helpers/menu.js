const getMenuFront = (role) => {
    const menu = [
        {
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            submenu: [
                { title: 'Principal', url: '/' },
                { title: 'Progreso del tratamiento', url: 'progress' },
                { title: 'Tus predicciones', url: 'promises' },
                { title: 'Citas', url: 'rxjs' },
                { title: 'Estadisticas', url: 'chart1' },
            ],
        },
        {
            title: 'Maintenance',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                // { title: 'Users', url: 'users' },
                { title: 'Doctors', url: 'doctors' },
                { title: 'Hospitals', url: 'hospitals' },
            ],
        },
    ];
    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: 'Users', url: 'users' })
    }
    return menu
}

module.exports = { getMenuFront }