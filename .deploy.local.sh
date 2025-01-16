PROJECT_ID=apigee-test74
SERVICE_NAME=apigee-extcallout1

gcloud run deploy $SERVICE_NAME --source . --project $PROJECT_ID --region europe-west4 --allow-unauthenticated --use-http2