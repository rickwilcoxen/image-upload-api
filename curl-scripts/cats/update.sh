#!/bin/bash

API="http://localhost:4741"
URL_PATH="/cats"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "category": {
      "text": "'"${TEXT}"'"
    }
  }'

echo
