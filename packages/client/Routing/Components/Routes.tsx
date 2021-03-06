import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core';
import { RouteList } from './RouteList';
import { Search } from './Search';
import { useEffect } from 'react';
import { useHeaderTagsActions } from 'client/Common/provider/HeaderTagProvider';
import { useRoutingConfig } from 'client/Routing/provider/RoutingConfigProvider';
import type { FC } from 'react';

const RouteHeaderTags = () => {
  const { updateTitle, updateDescription } = useHeaderTagsActions();
  const { start, destination, via, date } = useRoutingConfig();

  useEffect(() => {
    if (!start && !destination) {
      updateTitle();
      updateDescription();
    } else {
      updateTitle(
        `${start?.title ?? '?'} -> ${destination?.title ?? '?'} @ ${format(
          date || Date.now(),
          'HH:mm dd.MM.yy',
        )}`,
      );
      const viaString = `-> ${via.map((v) => `${v.title} -> `)}`;

      updateDescription(
        `${start?.title ?? '?'} ${viaString}${
          destination?.title ?? '?'
        } @ ${format(date || Date.now(), 'HH:mm dd.MM.yy')}`,
      );
    }
  });

  return null;
};

const useStyles = makeStyles({
  wrap: {
    marginLeft: '.5em',
    marginRight: '.5em',
  },
});

export const Routes: FC = () => {
  const classes = useStyles();
  return (
    <main className={classes.wrap}>
      <RouteHeaderTags />
      <Search />
      <RouteList />
    </main>
  );
};
