#!/bin/bash
npm run build -- --base-href "https://guillaumegds.github.io/hackdev/"
npm run deploy -- --repo=https://github.com/Guillaumegds/hackdev.git
