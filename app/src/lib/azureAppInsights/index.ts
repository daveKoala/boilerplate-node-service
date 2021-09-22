import ConfigManager from '../configManager';
import AppInsight = require('applicationinsights');

// https://docs.microsoft.com/en-us/azure/azure-monitor/app/api-custom-events-metrics

AppInsight.setup(ConfigManager.appInsight.key)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true);

AppInsight.defaultClient.context.tags[
  AppInsight.defaultClient.context.keys.cloudRole
] = ConfigManager.appInsight.cloudRole;

function removeStackTracesForHealthEndPoints(
  envelope: AppInsight.Contracts.EnvelopeTelemetry
) {
  const data = envelope.data.baseData;
  if (
    data?.url &&
    ['/pingz', 'favicon'].some(
      (subString) => subString.toLowerCase() === data?.url.toLowerCase()
    )
  ) {
    return false;
  } else {
    return true;
  }
}

AppInsight.defaultClient.addTelemetryProcessor(
  removeStackTracesForHealthEndPoints
);

AppInsight.start();

export default AppInsight;

// This 'client' can be used for custom logging. E.g Database connection failure/retry
export const client = AppInsight.defaultClient;
