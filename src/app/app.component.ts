import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    theme = 'blue';

    layout = 'layout-blue';

    layoutMode = 'horizontal';

    wrapperMode = false;

    inputStyle = 'outlined';

    ripple: boolean;

    constructor(private primengConfig: PrimeNGConfig, private translateService: TranslateService) { }

    ngOnInit() {

        this.primengConfig.setTranslation({
            accept: 'Accept',
            reject: 'Cancel',
            //translations
        });
        this.primengConfig.ripple = true;
        this.ripple = true;

        this.translateService.setDefaultLang('es');
    }

    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
    }

}
