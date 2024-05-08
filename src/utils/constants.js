const CONSTANTS = Object.freeze({
  ImportApi: 'https://staging.app.zusodental.com/api/',
  api: process.env.REACT_APP_BASE_URL + '/api/v1/',

  modules: {
    ADMIN_USER: 'admin-users',
    DASHBOARD: 'dashboard',
    ADMIN_LEADS: 'admin-leads',
    LEADS: 'leads',
    ADMIN_CLIENTS: 'admin-clients',
    ADMIN_BRANDS: 'admin-brands',
    CLIENTS: 'clients',
    ADMIN_PROJECTS: 'admin-projects',
    ADMIN_INVOICES: 'admin-invoices',
    ADMIN_MONETARY: 'admin-monetary',
    PROJECTS: 'projects',
    INVOICES: 'invoices',
    ITEMS: 'items',
    ROLES_AND_PERMISSIONS: 'RolesAndPermissions',
  },

  leadStatus: {
    ASSIGNED: 'assigned',
    UN_ASSIGNED: 'un-assigned',
    HOT_LEAD: 'hot-lead',
    NURCHERING: 'nurchering',
    PROSPECTING: 'prospectering',
    CLOSED: 'closed',
    DEAD: 'dead',
    DNC_DHU: 'dnc/dhu',
  },

  modalStyles: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      padding: '0px',
    },
  },
});

export default CONSTANTS;
