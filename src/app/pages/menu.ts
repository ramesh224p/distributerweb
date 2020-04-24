export let MENU_ITEM = [
    { path: 'index', title: 'Dashboard', icon: 'dashboard' },
    { path: 'attendance', title: 'Attendance', icon: 'check-square-o' },
    { path: 'inventory', title: 'Inventory', icon: 'navicon',
        children: [
            { path: 'inventory-details', title: 'Inventory-Details' },
            { path: 'indent', title: 'Indent' },
            { path: 'list-indent', title: 'List-Indent' },
            { path: 'acknowledgement', title: 'Acknowledgement' }
        ]
    },
    { path: 'manager', title: 'Manager', icon: 'user',
        children: [
            { path: 'employees', title: 'Employees' },
            { path: 'complaints', title: 'Complaints' },
        ]
    },
    { path: 'setup', title: 'Setup', icon: 'pencil',
        children: [
            { path: 'branches', title: 'Branches' },
            { path: 'finances', title: 'Finances' },
        ]
    },
    { path: 'reports', title: 'Reports', icon: 'file-text-o' },
];
