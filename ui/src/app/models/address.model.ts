import { Injectable } from '@angular/core';
import {ActivityType} from './activity-type.type';
import {UserInfoModel} from './user-info.model';

@Injectable()
export class AddressModel {
    body: string;
    zipCode: string;
    city: string;
    country: string;

  constructor() { }

}


