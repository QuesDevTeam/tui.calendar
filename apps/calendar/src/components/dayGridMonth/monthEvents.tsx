import { h } from 'preact';
import { memo } from 'preact/compat';

import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { MONTH_CELL_BAR_HEIGHT } from '@src/constants/style';
import { useTheme } from '@src/contexts/themeStore';
import { EVENT_HEIGHT } from '@src/helpers/grid';
import type EventUIModel from '@src/model/eventUIModel';
import { monthGridCellSelector } from '@src/selectors/theme';

interface Props {
  name: string;
  contentAreaHeight: number;
  eventHeight?: number;
  events: EventUIModel[];
  className: string;
  isOneEventCalendar?: boolean;
}

export const MonthEvents = memo(function MonthEvents({
  // contentAreaHeight,
  eventHeight = EVENT_HEIGHT,
  events,
  name,
  className,
  isOneEventCalendar = false,
}: Props) {
  const { headerHeight } = useTheme(monthGridCellSelector);

  // const parsedEventHeight = isOneEventCalendar ? 0 : eventHeight;
  const dayEvents = events
    // .filter(isWithinHeight(contentAreaHeight, parsedEventHeight + MONTH_EVENT_MARGIN_TOP))
    .map((uiModel) => (
      <HorizontalEvent
        key={`${name}-DayEvent-${uiModel.cid()}`}
        uiModel={uiModel}
        eventHeight={eventHeight}
        headerHeight={headerHeight ?? MONTH_CELL_BAR_HEIGHT}
        isOneEventCalendar={isOneEventCalendar}
      />
    ));

  return (
    <div className={className} style={isOneEventCalendar ? { height: '100%' } : {}}>
      {dayEvents}
    </div>
  );
});
