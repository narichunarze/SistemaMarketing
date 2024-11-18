import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './demo/view/dashboard.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/notFound/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/login/app.login.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {IconsComponent} from './utilities/icons.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';
import { PagingFilterComponent } from './pages/utils/paging-filter/paging-filter';
import { AuthClassGuard } from './auth--class.guard';
import { UserInicioComponent } from './pages/user-inicio/user-inicio.component';
import { AdminInicioComponent } from './pages/admin-inicio/admin-inicio.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { ArtesComponent } from './pages/artes/artes.component';
import { VideosComponent } from './pages/videos/videos.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { AdminArtesComponent } from './pages/admin-artes/admin-artes.component';
import { AdminEventosComponent } from './pages/admin-eventos/admin-eventos.component';
import { VideoAdminComponent } from './pages/admin-video/video-admin.component';
import { AdminPodcastComponent } from './pages/admin-podcast/admin-podcast.component';
import { AdminRegistrarComponent } from './pages/admin-registrar/admin-registrar.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'dashboard', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardComponent, canActivate: [AuthClassGuard],},
                     //user index
                     {path: 'user-index', component: UserInicioComponent , canActivate: [AuthClassGuard],},
                     {path: 'user-artes', component: ArtesComponent,  canActivate: [AuthClassGuard],},
                     {path: 'user-video', component: VideosComponent,  canActivate: [AuthClassGuard],},
                     {path: 'user-evento', component: EventosComponent,  canActivate: [AuthClassGuard],},
                     {path: 'user-podcast', component: PodcastComponent,  canActivate: [AuthClassGuard],},
                     

                     //admin index
                     {path: 'admin-index', component: AdminInicioComponent ,canActivate: [AuthClassGuard],},
                     {path: 'admin-artes', component: AdminArtesComponent, canActivate: [AuthClassGuard]},
                     {path: 'admin-video', component: VideoAdminComponent ,canActivate: [AuthClassGuard],},
                     {path: 'admin-evento', component: AdminEventosComponent ,canActivate: [AuthClassGuard],},
                     {path: 'admin-podcast', component: AdminPodcastComponent ,canActivate: [AuthClassGuard],},
                     {path: 'admin-registrar', component: AdminRegistrarComponent ,canActivate: [AuthClassGuard],},

                     


                     


                    //configuration settings

                  

                    //OTHERS

                    {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                    {path: 'uikit/input', component: InputDemoComponent},
                    {path: 'uikit/button', component: ButtonDemoComponent},
                    {path: 'uikit/table', component: TableDemoComponent},
                    {path: 'uikit/list', component: ListDemoComponent},
                    {path: 'uikit/tree', component: TreeDemoComponent},
                    {path: 'uikit/panel', component: PanelsDemoComponent},
                    {path: 'uikit/overlay', component: OverlaysDemoComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/media', component: MediaDemoComponent},
                    {path: 'uikit/message', component: MessagesDemoComponent},
                    {path: 'uikit/misc', component: MiscDemoComponent},
                    {path: 'uikit/charts', component: ChartsDemoComponent},
                    {path: 'uikit/file', component: FileDemoComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'pages/invoice', component: AppInvoiceComponent},
                    {path: 'pages/help', component: AppHelpComponent},
                    {path: 'pages/empty', component: EmptyDemoComponent},
                    {path: 'documentation', component: DocumentationComponent},
                    {path: 'blocks', component: BlocksComponent},
                ]
            },
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'home', component: AppLoginComponent,
                // loadChildren: () => import('../app/pages/login/app.login.module').then(m => m.LoginModule)
            },
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled', useHash: false},
    )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
