import { NgModule } from '@angular/core';
import { ExampleTableComponent } from './example-table/example-table.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/public-api';
import {
  BasicWidgetConfigModule,
  HomeComponentsModule,
  WidgetConfigComponentsModule
} from '@home/components/public-api';
import { ChartModule } from 'primeng/chart';
import { AddEntityComponent } from './example-action/add-entity.component';
import {
  ExampleTableCustomSettingsComponent
} from './example-table-with-custom-settings/example-table-custom-settings.component';
import {
  ExampleTableAdvancedConfigComponent
} from './example-table-with-custom-settings/advanced-config/example-table-advanced-config.component';
import {
  ExampleTableBasicConfigComponent
} from './example-table-with-custom-settings/basic-config/example-table-basic-config.component';
import {
  DataKeySettingsComponent
} from './example-table-with-custom-settings/data-key-settings/data-key-settings.component';
import {
  ExampleTableCustomSubscriptionComponent
} from './example-table-with-custom-subscription/example-table-custom-subscription.component';
import {
  ExampleOfUsingThirdPartyLibraryComponent
} from './example-of-using-third-party-library/example-of-using-third-party-library.component';
import { ExampleChartComponent } from './example-chart/example-chart.component';
import {
  ExampleChartSettingsComponent
} from './example-chart/chart-settings/example-chart-settings.component';
import {CustomLastestValueComponent} from "./custom-lastest-value/custom-lastest-value.component";
import {CustomAttributesValueComponent} from "./custom-attributes-value/custom-attributes-value.component";
import {DeviceInfoComponent} from "./device-info/device-info.component";
import {CustomChartComponent} from "./custom-chart/custom-chart.component";

@NgModule({
  declarations: [
    ExampleTableComponent,
    AddEntityComponent,
    ExampleTableCustomSettingsComponent,
    ExampleTableAdvancedConfigComponent,
    ExampleTableBasicConfigComponent,
    DataKeySettingsComponent,
    ExampleTableCustomSubscriptionComponent,
    ExampleOfUsingThirdPartyLibraryComponent,
    ExampleChartComponent,
    ExampleChartSettingsComponent,
    CustomLastestValueComponent,
    DeviceInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeComponentsModule,
    ChartModule,
    BasicWidgetConfigModule,
    WidgetConfigComponentsModule,
    CustomAttributesValueComponent,
    CustomChartComponent
  ],
  exports: [
    ExampleTableComponent,
    AddEntityComponent,
    ExampleTableCustomSettingsComponent,
    ExampleTableAdvancedConfigComponent,
    ExampleTableBasicConfigComponent,
    DataKeySettingsComponent,
    ExampleTableCustomSubscriptionComponent,
    ExampleOfUsingThirdPartyLibraryComponent,
    ExampleChartComponent,
    ExampleChartComponent,
    ExampleChartSettingsComponent,
    CustomLastestValueComponent,
    CustomAttributesValueComponent,
    DeviceInfoComponent,
    CustomChartComponent
  ]
})

export class ExamplesModule {
}
