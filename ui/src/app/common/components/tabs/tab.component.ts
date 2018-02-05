import { Component, EventEmitter, forwardRef, Inject, Input, Output } from '@angular/core';
import { TabsComponent } from './tabs.component';
import {AbstractComponent} from '../abstract-component';

@Component({
    selector: 'tab',
    templateUrl: './tab.component.html'
})
export class TabComponent extends AbstractComponent  {

    @Input() tabTitle: string;
    @Input() tabId: string;
    @Input() disabled = false;
    @Output() onQueryChanged: EventEmitter<string> = new EventEmitter();
    active: boolean;

    constructor(@Inject(forwardRef(() => TabsComponent)) private tabs: TabsComponent) {
        super();
        tabs.addTab(this);
    }
}
