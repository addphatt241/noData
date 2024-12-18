const allRoles = {
    user: ['user',],
    admin: ['all'],
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
