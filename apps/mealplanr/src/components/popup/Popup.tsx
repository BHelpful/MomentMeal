import React, { Component } from 'react';
import { setUserPopup } from '../../reducers/navState';
import './Popup.scss';

interface PopupProps {
  type: string,
  dispatch: Function,
  navCollapsed: boolean,
}

//Creates a popup container
 class Popup extends Component<PopupProps> {
  override render() {
    const {type, children, dispatch, navCollapsed} = this.props;
    return (
      <div className={"popup"} onClick={() => dispatch(setUserPopup(0))}>
        <div id={type} onClick={(evt)=>evt.stopPropagation()} className={navCollapsed?"close":"far"}>
          {children}
        </div>
      </div>
    );
  }
}

export default Popup;