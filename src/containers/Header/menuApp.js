export const adminMenu = [

    // quan ly nguoi dung
    { 
        name: 'menu.admin.manage-user',
        menus: [
            // {
            //     name: 'menu.admin.crud',link: '/system/user-manage'
            // },
            {
                name: 'menu.admin.crud-redux',link: '/system/user-redux'

            },
            {
                name: 'menu.admin.manage-doctor',link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                 
                // ]

            },
            // {
            //     name: 'menu.admin.manage-admin',link: '/system/user-admin'
            // },
            { 
                        name: 'menu.doctor.manage-schedule',link: '/doctor/manage-schedule'
              
            },
            

        ]
    },
    //quan ly phong kham
    { 
        name: 'menu.admin.medical-facilities',
        menus: [
            {
                name: 'menu.admin.manage-medical-facilities',link: '/system/manage-medical-facilities'
            },
            {
                name: 'menu.admin.manage-update-clinic',link: '/system/manage-update-clinic'
            },
        ]
    },

    // quan ly chuyen khoa
    { 
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.add-specialty',link: '/system/add-specialty'
            },

            {
                name: 'menu.admin.manage-specialty',link: '/system/manage-specialty'
            },
            
        ]
    },
      // quan ly hoi dap
      { 
        name: 'menu.admin.asked-answered',
        menus: [
            {
                name: 'menu.admin.manage-asked-answered',link: '/system/manage-asked-answered'
            },
            
            
        ]
    },
];




export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',

        menus: [
            {     
            name: 'menu.doctor.manage-schedule',link: '/doctor/manage-schedule'
 
            },
            {     
                name: 'menu.doctor.manage-patient',link: '/doctor/manage-patient'
     
            }
        
        ],
       
        
    }
    
  
];

export const communityDoctorMenu = [
    
        { 
        name: 'menu.admin.asked-answered',
        menus: [
            {
                name: 'menu.admin.manage-asked-answered',link: '/system/manage-asked-answered'
            },
            
            
        ]
    },
       
        
    
  
];


export const onlineDoctorMenu = [
    {
        name: 'menu.admin.manage-user',

        menus: [
           
        
        ],
       
        
    }
    
  
];