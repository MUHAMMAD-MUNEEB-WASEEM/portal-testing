import React from 'react';
import './CustomTableContainer.css';
import { Divider } from '@chakra-ui/react';

const TableNavigationMenu = () => {
  return (
    <div className="tab-container mt-[-4px]">
      <input type="radio" name="tab" id="tab1" className="tab tab--1" />
      <label className="tab_label select-none mt-2 capitalize text-gray-600" for="tab1">
        Today
      </label>
      <Divider orientation="vertical" className="mt-3 bg-gray-400 w-[2px] !h-6" />
      <input type="radio" name="tab" id="tab2" className="tab tab--2" />
      <label className="tab_label select-none mt-2 capitalize text-gray-600" for="tab2">
        weekly
      </label>
      <Divider orientation="vertical" className="mt-3 bg-gray-400 w-[2px] !h-6" />
      <input type="radio" name="tab" id="tab3" className="tab tab--3" />
      <label className="tab_label select-none mt-2 capitalize text-gray-600" for="tab3">
        monthly
      </label>
      <div class="indicator"></div>
    </div>
  );
};

export default TableNavigationMenu;
