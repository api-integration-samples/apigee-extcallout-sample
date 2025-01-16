# Apigee ExternalCallout Sample Project
This is a sample service that can be used with Apigee and called with the [ExternalCallout](https://cloud.google.com/apigee/docs/api-platform/reference/policies/external-callout-policy) policy. It uses a random-jokes library to get a new joke, and add it to the `x-random-joke` header. 

## Run locally
You can test the service locally just using Node.js and a gRPC testing tool such as [grpcurl](https://github.com/fullstorydev/grpcurl).

```sh
# build and run
npm i
npm run build
node dist

# test
grpcurl -plaintext -d @ -proto external_callout.proto localhost:8080 apigee.ExternalCalloutService/ProcessMessage  <<EOM
{
  "response": {
          "headers": {}
  }
}
EOM
# shouldreturn a x-random-joke header
```

This is exactly how Apigee calls it in an API pipeline, but just that the request, response, and other variables are filled with runtime data.

## Deploy to Cloud Run
You can deploy the service to Cloud Run with this script:

```sh
./.3.deploy.sh
```

After deploying, you can import the Apigee proxy in `src/apigee/apiproxies/ExtJokesAPI` and test all three extensions (JSPolicy, ExtCallout, ServiceCallout).