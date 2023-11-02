import React from "react";

import { Box } from "@chakra-ui/react";
export default function Article() {
  return (
    <Box>
      <div
        id="retainable-rss-embed"
        data-rss="https://medium.com/feed/@rakeoff"
        data-maxcols="3"
        data-layout="grid"
        data-poststyle="inline"
        data-readmore="Read the rest"
        data-buttonclass="btn btn-primary"
        data-offset="-100"
      ></div>
    </Box>
  );
}
