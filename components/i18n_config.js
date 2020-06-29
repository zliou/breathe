import * as React from 'react';
import { Button } from 'react-native';

import I18nLibrary from './i18n_library';

export default class I18nConfig extends React.Component {

  setLanguage = (hl) => {
    console.log("i18n_config.js");
    console.log(hl);
  }

   
  render() {
    let i18n_library = new I18nLibrary().getLibrary();
    let hl_map = i18n_library.hlToLanguage;
    return (
      Object.keys(hl_map).map((hl) => {
        <Button
            title={hl_map[hl]}
            onPress={() => this.setLanguage(hl)}/>
      })
    );
  }


}
