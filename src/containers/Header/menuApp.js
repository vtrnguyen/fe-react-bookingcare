export const adminMenu = [
    { // manage user
        name: 'menu.admin.manage-user', 
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'
            },
            { // manage doctor schedule
                name: 'menu.doctor.update-schedule', link: '/doctor/manage-schedule'
            },
        ]
    },
    { // quan ly phong kham
        name: 'menu.admin.clinic', 
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]
    },
    { // quan ly chuyên khoa
        name: 'menu.admin.specialty', 
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
    { // quan ly cam nang
        name: 'menu.admin.handbook', 
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
        ]
    },
];

export const doctorMenu = [
    { // manage doctor schedule
        name: 'menu.doctor.manage-schedule',
        menus: [
            { 
                name: 'menu.doctor.update-schedule', link: '/doctor/manage-schedule'
            }     
        ]
    }
];