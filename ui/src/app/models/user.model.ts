import {userRole} from './user-role.type';

export class User {
    key: string;
    name: string;
    email: string;
    roles: userRole[];
    companyRef: string;

    constructor() {
    }
}
