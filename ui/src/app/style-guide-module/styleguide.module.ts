import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StyleguideComponent} from "./styleguide.component";
import { ColorsGuideComponent } from './colors-guide/colors-guide.component';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { TypographyGuideComponent } from './typography-guide/typography-guide.component';
import { IconsGuideComponent } from './icons-guide/icons-guide.component';
import { FormsGuideComponent } from './forms-guide/forms-guide.component';
import { ButtonsGuideComponent } from './buttons-guide/buttons-guide.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
      RouterModule

  ],
  declarations: [
    StyleguideComponent,
    ColorsGuideComponent,
    TypographyGuideComponent,
    IconsGuideComponent,
    FormsGuideComponent,
    ButtonsGuideComponent
  ]
})
export class StyleguideModule { }
