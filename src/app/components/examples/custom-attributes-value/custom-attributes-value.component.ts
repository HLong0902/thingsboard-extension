import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {WidgetContext} from '@home/models/widget-component.models';
import {WidgetComponent} from "@home/components/widget/widget.component";

@Component({
  selector: 'tb-custom-attributes-value',
  templateUrl: './custom-attributes-value.component.html',
  standalone: true,
  styleUrls: ['./custom-attributes-value.component.scss']
})
export class CustomAttributesValueComponent implements OnInit {

  @Input() ctx: WidgetContext;
  @Input() widgetTitlePanel: TemplateRef<any>;
  public datas: Array<any>;

  constructor(
    public widgetComponent: WidgetComponent,
  ) {}

  ngOnInit(): void {
    this.ctx.$scope.customAttributesValue = this;
    this.datas = new Array<any>();
    this.updateValues();
  }

  public onDataUpdated(): void {
    this.updateValues();
    this.ctx.detectChanges();
  }

  private updateValues(): void {
    if (this.ctx.datasources.length > 0) {
      // @ts-ignore
      this.ctx.attributeService.getEntityAttributes(this.ctx.datasources[0].entityId, 'SERVER_SCOPE', this.ctx.datasources[0].dataKeys.map(key => key.name)).subscribe(attrs => {
        this.datas = attrs.map((attr, i) => ({
          key: this.ctx.datasources[0].dataKeys[i].label,
          value: attr.value
        }));
      });
    }
  }
}
