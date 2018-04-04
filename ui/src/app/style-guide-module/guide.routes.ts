import {Routes} from '@angular/router';
import {StyleGuideComponent} from './style-guide.component';
import {DashboardGuideComponent} from './dashboard-guide/dashboard-guide.component';
import {ColorsGuideComponent} from './colors-guide/colors-guide.component';
import {TypographyGuideComponent} from './typography-guide/typography-guide.component';
import {IconsGuideComponent} from './icons-guide/icons-guide.component';
import {ButtonsGuideComponent} from './buttons-guide/buttons-guide.component';
import {FormsGuideComponent} from './forms-guide/forms-guide.component';


export const GuideRoutes: Routes = [
    { path: '',
        component: StyleGuideComponent,
        children: [
            {path: 'dashboard', component: DashboardGuideComponent},
            {path: 'colors', component: ColorsGuideComponent},
            {path: 'typography', component: TypographyGuideComponent},
            {path: 'icons', component: IconsGuideComponent},
            {path: 'buttons', component: ButtonsGuideComponent},
            {path: 'forms', component: FormsGuideComponent},
            {path: '**', redirectTo: 'dashboard'}
        ]
    },
    {path: '**', redirectTo: 'dashboard'}
];
