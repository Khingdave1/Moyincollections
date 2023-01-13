import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultHeaderComponent } from './components/default-header/default-header.component';
import { DefaultFooterComponent } from './components/default-footer/default-footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DefaultHeaderInfoComponent } from './components/default-header-info/default-header-info.component';
import { GoBackTopComponent } from './components/go-back-top/go-back-top.component';
import { WhatsappChatComponent } from './components/whatsapp-chat/whatsapp-chat.component';
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidenavComponent } from './components/dashboard-sidenav/dashboard-sidenav.component';
import { AlertPopupComponent } from './components/alert-popup/alert-popup.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [
    DefaultHeaderComponent,
    DefaultFooterComponent,
    DefaultHeaderInfoComponent,
    GoBackTopComponent,
    WhatsappChatComponent,
    DashboardHeaderComponent,
    DashboardSidenavComponent,
    AlertPopupComponent,
    LoaderComponent,
    ConfirmModalComponent,
    // ClickedOutsideDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    DefaultHeaderComponent,
    DefaultFooterComponent,
    DefaultHeaderInfoComponent,
    GoBackTopComponent,
    WhatsappChatComponent,
    DashboardHeaderComponent,
    DashboardSidenavComponent,
    AlertPopupComponent,
    LoaderComponent,
    ConfirmModalComponent,
  ]
})
export class SharedModule { }
