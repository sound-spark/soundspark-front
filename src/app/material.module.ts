import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    imports: [
        MatToolbarModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatDialogModule
    ],
    exports: [
        MatToolbarModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatDialogModule
    ]
})
export class MaterialModule {
}
