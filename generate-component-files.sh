#!/bin/bash

component=$1

if [[ -n "$component" ]]; then
    mkdir -p components/"${component}"/__tests__ &&
    touch components/"${component}"/__tests__/"${component}".test.tsx components/"${component}"/"${component}".styles.ts components/"${component}"/"${component}".tsx
else
    echo "argument error"
fi

