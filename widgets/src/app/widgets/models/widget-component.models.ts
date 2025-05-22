///
/// Copyright © 2016-2020 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import {
  DataSet,
  Datasource,
  DatasourceData,
  PageLink,
  SortOrder,
  Timewindow,
  WidgetActionDescriptor,
  WidgetConfig,
  WidgetControllerDescriptor,
  WidgetTimewindow,
  WidgetTypeDescriptor,
} from '@shared/public-api';
import {
  AppState,
  AssetService,
  AttributeService,
  CustomerService,
  DashboardService,
  DeviceService,
  DialogService,
  EntityRelationService,
  EntityService,
  EntityViewService,
  IAliasController,
  IStateController,
  IWidgetSubscription,
  IWidgetUtils,
  RafService,
  RpcApi,
  SubscriptionEntityInfo,
  TimewindowFunctions,
  UserService,
  WidgetActionsApi,
  WidgetSubscriptionApi
} from '@core/public-api';
import { ChangeDetectorRef, ComponentFactory, Injector, NgZone, Type } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { CustomDialogService } from '@home/components/widget/dialog/custom-dialog.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

export declare type NotificationType = 'info' | 'warn' | 'success' | 'error';
export declare type NotificationHorizontalPosition = 'start' | 'center' | 'end' | 'left' | 'right';
export declare type NotificationVerticalPosition = 'top' | 'bottom';

export interface IWidgetAction {
  name: string;
  icon: string;
  onAction: ($event: Event) => void;
}

export interface WidgetHeaderAction extends IWidgetAction {
  displayName: string;
  descriptor: WidgetActionDescriptor;
}

export interface WidgetAction extends IWidgetAction {
  show: boolean;
}

export interface WidgetContext {
  readonly stateController: IStateController;
  readonly aliasController: IAliasController;
  readonly dashboardTimewindow: Timewindow;
  readonly widgetConfig: WidgetConfig;
  readonly settings: any;
  readonly units: string;
  readonly decimals: number;
  changeDetector(cd: ChangeDetectorRef): void;

  deviceService: DeviceService;
  assetService: AssetService;
  entityViewService: EntityViewService;
  customerService: CustomerService;
  dashboardService: DashboardService;
  userService: UserService;
  attributeService: AttributeService;
  entityRelationService: EntityRelationService;
  entityService: EntityService;
  dialogs: DialogService;
  customDialog: CustomDialogService;
  date: DatePipe;
  translate: TranslateService;
  http: HttpClient;
  sanitizer: DomSanitizer;
  router: Router;

  subscriptions: {[id: string]: IWidgetSubscription};
  defaultSubscription: IWidgetSubscription;

  timewindowFunctions: TimewindowFunctions;
  controlApi: RpcApi;
  utils: IWidgetUtils;

  $container: JQuery<HTMLElement>;
  $containerParent: JQuery<HTMLElement>;
  width: number;
  height: number;
  $scope: IDynamicWidgetComponent;
  isEdit: boolean;
  isMobile: boolean;

  widgetNamespace?: string;
  subscriptionApi?: WidgetSubscriptionApi;

  actionsApi?: WidgetActionsApi;
  activeEntityInfo?: SubscriptionEntityInfo;

  datasources?: Array<Datasource>;
  data?: Array<DatasourceData>;
  hiddenData?: Array<{data: DataSet}>;
  timeWindow?: WidgetTimewindow;

  hideTitlePanel: boolean;

  widgetTitle?: string;
  widgetTitleTooltip?: string;
  customHeaderActions?: Array<WidgetHeaderAction>;
  widgetActions?: Array<WidgetAction>;

  servicesMap?: Map<string, Type<any>>;

  $injector?: Injector;

  ngZone?: NgZone;

  store?: Store<AppState>;

  rxjs: any;

  showSuccessToast(message: string, duration?: number,
                   verticalPosition?: NotificationVerticalPosition,
                   horizontalPosition?: NotificationHorizontalPosition,
                   target?: string): void;

  showInfoToast(message: string,
                verticalPosition?: NotificationVerticalPosition,
                horizontalPosition?: NotificationHorizontalPosition,
                target?: string): void;

  showWarnToast(message: string,
                verticalPosition?: NotificationVerticalPosition,
                horizontalPosition?: NotificationHorizontalPosition,
                target?: string): void;

  showErrorToast(message: string,
                 verticalPosition?: NotificationVerticalPosition,
                 horizontalPosition?: NotificationHorizontalPosition,
                 target?: string): void;

  showToast(type: NotificationType, message: string, duration?: number,
            verticalPosition?: NotificationVerticalPosition,
            horizontalPosition?: NotificationHorizontalPosition,
            target?: string): void;

  hideToast(target?: string): void;

  detectChanges(updateWidgetParams?: boolean): void;

  updateWidgetParams(): void;

  updateAliases(aliasIds?: Array<string>): void;

  reset(): void;

  pageLink(pageSize: number, page?: number, textSearch?: string, sortOrder?: SortOrder): PageLink;
}

export interface IDynamicWidgetComponent {
  readonly ctx: WidgetContext;
  readonly errorMessages: string[];
  readonly $injector: Injector;
  executingRpcRequest: boolean;
  rpcEnabled: boolean;
  rpcErrorText: string;
  rpcRejection: HttpErrorResponse;
  raf: RafService;
  [key: string]: any;
}

export interface WidgetInfo extends WidgetTypeDescriptor, WidgetControllerDescriptor {
  widgetName: string;
  alias: string;
  typeSettingsSchema?: string | any;
  typeDataKeySettingsSchema?: string | any;
  componentFactory?: ComponentFactory<IDynamicWidgetComponent>;
}
