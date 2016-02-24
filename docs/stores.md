# Flux Stores

### JobStore

Holds all persisted job data.

##### Actions:
- `receiveAllJobs`
- `receiveSingleJob`
- `removeJob`

##### Listeners:
- `JobsIndex` (passes to `JobsIndexMainItem` and `JobsIndexSubItem` via props)

### JobFormStore

Holds un-persisted job data to send to the API.

##### Actions:
- `receiveJobFormParams`

##### Listeners:
- `JobForm`

### SearchStore

Holds search parameters to send to the API.

##### Actions:
- `receiveSearchParams`

##### Listeners:
- `SearchIndex`
