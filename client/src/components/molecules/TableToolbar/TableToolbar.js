import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import {
  FilterDrawer,
  filterSelectors,
  filterActions
} from 'material-ui-filter';

let TableToolbar = props => {
  const {
    selected,
    numSelected,
    classes,
    setFilterIsOpen,
    list,
    setSearch
  } = props;
  let counter = 0;
  const filterFields = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
    { name: 'registered', label: 'Registered', type: 'date' },
    { name: 'isActive', label: 'Is Active', type: 'bool' },
    { name: 'testObject', label: 'Object', type: 'object' }
  ];

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Trees
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        <FilterDrawer name="trees" fields={filterFields} />
      </div>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

const styles = theme => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    position: 'fixed',
    top: '64px',
    backgroundColor: '#dedede',
    zIndex: 102
  },

  tableWrapper: {
    overflowX: 'auto'
  }
});

const mapState = state => {
  const { filters } = state;
  const { hasFilters } = filterSelectors.selectFilterProps('trees', filters);
  const list = filterSelectors.getFilteredList('trees', filters, '');

  return {
    selected: state.trees.selected,
    numSelected: state.trees.length,
    hasFilters,
    list
  };
};

const mapDispatch = dispatch => {
  return {
    dispatch
  };
};

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true, name: 'TableToolbar' }),
  connect(
    mapState,
    mapDispatch
  )
)(TableToolbar);
