import { Injectable } from '@angular/core';
import {ActivityType} from './activity-type.type';
import {UserInfoModel} from './user-info.model';

@Injectable()
export class ActivityModel{
    key: string;
    objectType: string;
    objectKey: string;
    objectBusinessKey: string;
    type: ActivityType;
    userInfo: UserInfoModel;
    timestamp: Date;

  constructor() { }

}


