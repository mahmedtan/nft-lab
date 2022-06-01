// Please make changes to this file in order to change site appearence.

import { Theme, Variant } from "utils/types";

const { PRIMARY, SECONDARY } = Variant;

const theme: Theme = {
  /* 
   Color palette for the entire site can edited at styles/globals.css
 */

  /* 
    The variants for different components.
    Current options are:
    PRIMARY
    SECONDARY
 */
  variants: {
    hero: PRIMARY, //Secondary not developerd
    about: SECONDARY,
    team: PRIMARY,
    faq: SECONDARY,
    collection: PRIMARY,
    roadmap: PRIMARY,
  },

  /* 
    Social Media links for the product
 */
  links: {
    twitter: "https://twitter.com/GenesisPlots",
    discord: "https://discord.com/invite/P6y86edh",
    facebook: "https://www.facebook.com",
    instagram: "https://discord.com/invite/P6y86edh",
  },
};

//DO NOT CHANGE ANYTHING BELOW THIS LINE.

export default theme;
