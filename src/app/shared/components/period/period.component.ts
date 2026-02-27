import { Component, computed, input } from '@angular/core';
import { BaseTranslationsComponent } from '../base/base-translations.component';
import { TranslatesEnum } from '../../enums/translates.enum';

@Component({
  selector: 'app-period',
  template: `{{ formattedPeriod() }}`,
})
export class PeriodComponent extends BaseTranslationsComponent {
  start = input<string | undefined>();
  end = input<string | undefined>();

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.YEAR,
      TranslatesEnum.YEARS,
      TranslatesEnum.MONTH,
      TranslatesEnum.MONTHS,
      TranslatesEnum.TODAY,
      TranslatesEnum.PERIOD_DATE_FORMAT,
    ];
  }

  readonly formattedPeriod = computed(() => {
    const start = this.start();
    const end = this.end();
    const duration = this.getDuration(start, end, this.translations());

    return this.languageService.getTranslationWithParams(
      TranslatesEnum.PERIOD_DATE_FORMAT,
      {
        start,
        end: end ?? this.translations().get(TranslatesEnum.TODAY),
        duration,
      },
    )();
  });

  private getDuration(
    start: string | undefined,
    end: string | undefined,
    translations: Map<TranslatesEnum, string>,
  ): string {
    if (!start || !translations) return '';

    const startMonths = this.toTotalMonths(start);
    const endMonths = this.toTotalMonths(end ?? this.getToday());

    if (startMonths === null || endMonths === null) return '';

    const totalMonths = endMonths - startMonths + 1;
    if (totalMonths <= 0) return '';

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const parts: string[] = [];

    if (years) {
      parts.push(this.getYearsPart(years, translations));
    }

    if (months) {
      parts.push(this.getMonthsPart(months, translations));
    }

    return parts.join(', ');
  }

  private getYearsPart(
    years: number,
    translations: Map<TranslatesEnum, string>,
  ): string {
    const labelYears =
      years > 1
        ? translations.get(TranslatesEnum.YEARS)
        : translations.get(TranslatesEnum.YEAR);
    return `${years} ${labelYears}`;
  }

  private getMonthsPart(
    months: number,
    translations: Map<TranslatesEnum, string>,
  ): string {
    const labelMonths =
      months > 1
        ? translations.get(TranslatesEnum.MONTHS)
        : translations.get(TranslatesEnum.MONTH);
    return `${months} ${labelMonths}`;
  }

  private toTotalMonths(value: string | null): number | null {
    if (!value) return null;

    const [month, year] = value.split('/').map(Number);
    if (!month || !year) return null;

    return year * 12 + (month - 1);
  }

  private getToday(): string {
    return new Intl.DateTimeFormat('fr-FR', {
      month: '2-digit',
      year: 'numeric',
    }).format(new Date());
  }
}
