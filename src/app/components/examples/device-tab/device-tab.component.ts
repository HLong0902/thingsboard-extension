import {Component, Input, OnInit} from '@angular/core';
import {WidgetContext} from '@home/models/widget-component.models';
import {formatValue, isDefinedAndNotNull} from '@core/public-api';
import {DataKey} from '@shared/public-api';

enum FormatKey {
   DECIMALS = 'decimals',
   UNITS = 'units'
}

@Component({
   selector: 'tb-device-tab',
   templateUrl: 'device-tab.component.html',
   styleUrls: ['device-tab.component.scss']
})

export class DeviceTabComponent implements OnInit {

   @Input() ctx: WidgetContext;

   public tableValues: Array<any>;
   public entityName: string;

   ngOnInit(): void {
      this.ctx.$scope.deviceTabComponent = this;
      this.entityName = this.ctx.widgetConfig.title;
      this.tableValues = new Array<any>();
   }
  public onClick() {
    const stateId = this.ctx.settings?.stateId;
    if (stateId) {
      this.ctx.stateController.openState(stateId, {}, true);
    }
  }

   public onDataUpdated(): void {

     for (var i = 0; i<= this.ctx.data.length; i++) {
       let data = this.ctx.data[i];
       if (data) {
         let rowName: string =  data.dataKey.label;
         let rowValue: string =  data.data != null && data.data.length > 0 ? data.data[0][1] : '';
         this.tableValues[i] = {"key": rowName, "value": formatValue(
             rowValue,
             this.getFormatInfo<number>(data.dataKey, FormatKey.DECIMALS),
             this.getFormatInfo<string>(data.dataKey, FormatKey.UNITS),
             false)};
       }
     }

      // for (const key of this.ctx.data) {
      //    if (key.data.length) {
      //       const rowName: string =  key.dataKey.label;
      //       const rowValue: string = formatValue(
      //           key.data[0][1],
      //           this.getFormatInfo<number>(key.dataKey, FormatKey.DECIMALS),
      //           this.getFormatInfo<string>(key.dataKey, FormatKey.UNITS),
      //           false);
      //       this.tableValues[rowName] = rowValue;
      //    }
      // }
      this.ctx.detectChanges();
   }

   private getFormatInfo<T>(dataKey: DataKey, formatKey: FormatKey): T {
      let formatInfo = this.ctx[formatKey] as T;
      if (isDefinedAndNotNull(dataKey[formatKey])) {
         formatInfo = dataKey[formatKey] as T;
      }

      return formatInfo;
   }
}
