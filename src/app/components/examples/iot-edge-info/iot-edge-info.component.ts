import { Component, Input, OnInit } from '@angular/core';
import { WidgetContext } from '@home/models/widget-component.models';
import { WidgetComponent } from '@home/components/widget/widget.component';
import {formatValue, isDefinedAndNotNull} from "@core/public-api";
import {DataKey} from "@shared/public-api";

enum FormatKey {
  DECIMALS = 'decimals',
  UNITS = 'units'
}

interface DeviceInfo {
  [key: string]: string | number;
}

interface DeviceInfoRow {
  label: string;
  value: string;
}

@Component({
  selector: 'tb-iot-edge-info',
  templateUrl: './iot-edge-info.component.html',
  styleUrls: ['./iot-edge-info.component.scss']
})
export class IoTEdgeInfoComponent implements OnInit {

  @Input() ctx: WidgetContext;

  deviceInfoRows: DeviceInfoRow[] = [];
  title: string;
  key1: string;
  key2: string;

  ngOnInit(): void {
    this.ctx.$scope.ioTEdgeInfoComponent = this;
    this.title = this.ctx.settings?.title;
    this.key1 = this.ctx.settings?.key1;
    this.key2 = this.ctx.settings?.key2;
    this.onDataUpdated();
  }

  public onDataUpdated(): void {
    try {
      let defaultData: DeviceInfo;
      if (this.key2) {
        defaultData = JSON.parse(this.ctx.data[0].data[0][1])[this.key1][this.key2];
      } else {
        defaultData = JSON.parse(this.ctx.data[0].data[0][1])[this.key1];
      }
      const dataToUse = Object.keys(defaultData).length > 0 ? defaultData : defaultData;

      // Convert the object into an array of label-value pairs for ngFor
      this.deviceInfoRows = Object.entries(dataToUse).map(([key, value]) => ({
        label: key,
        value: String(value)
      }));

    } catch (e) {
      console.log(e);
    }
    this.ctx.detectChanges();
  }
}
