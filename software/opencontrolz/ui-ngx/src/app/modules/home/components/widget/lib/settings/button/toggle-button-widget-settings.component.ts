///
/// Copyright © 2024 OpenControlz
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

import { Component } from '@angular/core';
import { TargetDevice, WidgetSettings, WidgetSettingsComponent, widgetType } from '@shared/models/widget.models';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@core/core.state';
import { ValueType } from '@shared/models/constants';
import { toggleButtonDefaultSettings } from '@home/components/widget/lib/button/toggle-button-widget.models';

type ButtonAppearanceType = 'checked' | 'unchecked';

@Component({
  selector: 'tb-toggle-button-widget-settings',
  templateUrl: './toggle-button-widget-settings.component.html',
  styleUrls: ['./../widget-settings.scss']
})
export class ToggleButtonWidgetSettingsComponent extends WidgetSettingsComponent {

  get targetDevice(): TargetDevice {
    return this.widgetConfig?.config?.targetDevice;
  }

  get widgetType(): widgetType {
    return this.widgetConfig?.widgetType;
  }

  valueType = ValueType;

  buttonAppearanceType: ButtonAppearanceType = 'checked';

  toggleButtonWidgetSettingsForm: UntypedFormGroup;

  constructor(protected store: Store<AppState>,
              private fb: UntypedFormBuilder) {
    super(store);
  }

  protected settingsForm(): UntypedFormGroup {
    return this.toggleButtonWidgetSettingsForm;
  }

  protected defaultSettings(): WidgetSettings {
    return {...toggleButtonDefaultSettings};
  }

  protected onSettingsSet(settings: WidgetSettings) {
    this.toggleButtonWidgetSettingsForm = this.fb.group({
      initialState: [settings.initialState, []],
      checkState: [settings.checkState, []],
      uncheckState: [settings.uncheckState, []],
      disabledState: [settings.disabledState, []],

      autoScale: [settings.autoScale, []],
      horizontalFill: [settings.horizontalFill, []],
      verticalFill: [settings.verticalFill, []],

      checkedAppearance: [settings.checkedAppearance, []],
      uncheckedAppearance: [settings.uncheckedAppearance, []],

      background: [settings.background, []]
    });
  }

  protected validatorTriggers(): string[] {
    return ['autoScale'];
  }

  protected updateValidators(emitEvent: boolean) {
    const autoScale: boolean = this.toggleButtonWidgetSettingsForm.get('autoScale').value;

    if (autoScale) {
      this.toggleButtonWidgetSettingsForm.get('horizontalFill').disable();
      this.toggleButtonWidgetSettingsForm.get('verticalFill').disable();
    } else {
      this.toggleButtonWidgetSettingsForm.get('horizontalFill').enable();
      this.toggleButtonWidgetSettingsForm.get('verticalFill').enable();
    }
  }
}
