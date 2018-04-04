import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColorsGuideComponent} from './colors-guide/colors-guide.component';
import {TypographyGuideComponent} from './typography-guide/typography-guide.component';
import {IconsGuideComponent} from './icons-guide/icons-guide.component';
import {FormsGuideComponent} from './forms-guide/forms-guide.component';
import {ButtonsGuideComponent} from './buttons-guide/buttons-guide.component';
import {StyleGuideComponent} from './style-guide.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {DashboardGuideComponent} from './dashboard-guide/dashboard-guide.component';
import { PrismSyntaxHighlighterDirective } from './prism-syntax-highlighter.directive';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterModule
    ],
    declarations: [
        StyleGuideComponent,
        ColorsGuideComponent,
        TypographyGuideComponent,
        IconsGuideComponent,
        FormsGuideComponent,
        ButtonsGuideComponent,
        DashboardGuideComponent,
        PrismSyntaxHighlighterDirective,
    ]
})
export class StyleGuideModule {
}
