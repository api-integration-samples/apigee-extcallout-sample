PROJECT_ID=
SERVICE_NAME=

gcloud run deploy $SERVICE_NAME --source . --project $PROJECT_ID --region europe-west4 --allow-unauthenticated --use-http2