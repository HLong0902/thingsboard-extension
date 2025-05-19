import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {WidgetContext} from '@home/models/widget-component.models';
import {WidgetComponent} from "@home/components/widget/widget.component";

@Component({
  selector: 'tb-custom-lastest-value',
  templateUrl: './custom-lastest-value.component.html',
  styleUrls: ['./custom-lastest-value.component.scss']
})
export class CustomLastestValueComponent implements OnInit {

  @Input() ctx: WidgetContext;
  @Input() widgetTitlePanel: TemplateRef<any>;
  public datas: Array<any>;

  constructor(
    public widgetComponent: WidgetComponent,
  ) {}

  ngOnInit(): void {
    this.ctx.$scope.customLastestValue = this;
    this.datas = new Array<any>();
    this.updateValues();
  }

  public onDataUpdated(): void {
    this.updateValues();
    this.ctx.detectChanges();
  }

  private updateValues(): void {
    for (var i = 0; i < this.ctx.datasources[0].dataKeys.length; i++) {
      let tbDatasource = this.ctx.datasources[0].dataKeys[i];
      let value = this.ctx.defaultSubscription.data[0].data != null && this.ctx.defaultSubscription.data[0].data.length > 0  ? this.ctx.defaultSubscription.data[0].data[0][1] : '';
      this.datas[i] = {"key": tbDatasource.label, "value": value};
    }
  }
}
