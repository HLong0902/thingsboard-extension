import {Component, Input, OnInit} from '@angular/core';
import {WidgetContext} from '@home/models/widget-component.models';
import {formatValue, isDefinedAndNotNull, isNumeric} from '@core/public-api';
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
    this.onDataUpdated();
  }

  public onClick() {
    let stateId = this.ctx.settings?.stateId;
    if (stateId) {
    const params = {
      entityId: this.ctx.stateController.getStateParams().entityId,
      entityName: this.ctx.stateController.getStateParams().entityName,
    };
      this.ctx.stateController.updateState(stateId, params, false);
    }
  }

  public onDataUpdated(): void {
    let props = this.ctx.settings;
    try {
      let data = JSON.parse(this.ctx.data[0].data[0][1])['basic_information'];
      let keys = Object.keys(props);
      if (keys.length > 0) {
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] !== 'stateId' && !isNumeric(keys[i])) {
            try {
              let rowName: string = props[keys[i]];
              if (rowName && data[rowName]) {
                let rowValue: string = data[rowName];
                this.tableValues[i] = {"key": rowName, "value": rowValue};
              }
            } catch (e) {
              console.error(e);
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
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
