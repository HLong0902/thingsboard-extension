import { Component, Input, OnInit } from '@angular/core';
import { WidgetContext } from '@home/models/widget-component.models';
import { WidgetComponent } from '@home/components/widget/widget.component';
import {formatValue, isDefinedAndNotNull} from "@core/public-api";
import {DataKey} from "@shared/public-api";

enum FormatKey {
  DECIMALS = 'decimals',
  UNITS = 'units'
}

@Component({
  selector: 'tb-iot-edge-info',
  templateUrl: './iot-edge-info.component.html',
  styleUrls: ['./iot-edge-info.component.scss']
})
export class IoTEdgeInfoComponent implements OnInit {

  @Input() ctx: WidgetContext;

  public tableValues: Array<any>;
  public entityName: string;

  ngOnInit(): void {
    this.ctx.$scope.ioTEdgeInfoComponent = this;
    this.entityName = this.ctx.settings?.name;
    this.tableValues = new Array<any>();
  }


  public onDataUpdated(): void {
    this.entityName = this.ctx.settings?.name;
    try {
      var datas = JSON.parse(this.ctx.data[0].data[0][1]);
      datas = datas['basic_information'];
      for (let key in datas) {
        this.tableValues[key] = datas[key];
      }
    } catch (e) {
      console.log(e);
    }
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
