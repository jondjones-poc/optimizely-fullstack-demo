### Datafile via SDK Key

```javascript
import { createInstance } from "@optimizely/optimizely-sdk";
const optimizelyClient = createInstance({
    sdkKey: sdkKey,
});
```

### Call datafile and pass in the JSON directly

```javascript
const datafile = await fetch(`https://cdn.optimizely.com/datafiles/${sdkKey}.json`);
const optimizelyClient = createInstance({
    datafile: datafile,
    datafileOptions: {
        autoUpdate: true,
        updateInterval: 600000,
      },
});
```

### Assigning a user

```javascript
optimizelyClient.onReady().then(() => {
  optimizelyUserContext = optimizelyClient.createUserContext(
    userId,
    {
      utc_campaign: "utc-param",
      segment: "my-param",
      user: "value",
    }
  );
});
```

### Bucketing example

```javascript
useEffect(() => {
    optimizelyClient.onReady().then(() => {

      const decision  = optimizelyUserContext.decide('ab_test');

      const componentMessage = decision.variables.component_message;
      const discountAmount = decision.variables.discount_amount;
    });
}, []);
```

### Log an event

```javascript
const activateUser = (componentName) => {
  optimizelyClient.track('banner_click', componentName);
};
```
