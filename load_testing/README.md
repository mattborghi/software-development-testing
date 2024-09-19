# Load testing

Run results with

```sh
./jmeter -n -t ~/Desktop/Ekumen/training/testing_l1/e2e-with-playwright/load_testing/JMeter.jmx
```

## Initial Page Load

- 10 Users:

  - Mean response time: 51.1 ms
  - Median response time: 47.5 ms
  - Max response time: 84 ms
  - Min response time: 39 ms

- 100 Users:

  - Mean response time: 32.78 ms
  - Median response time: 31 ms
  - Max response time: 83 ms
  - Min response time: 19 ms

- 1,000 Users:

  - Mean response time: 3,821.9 ms (~3.8 seconds)
  - Median response time: 3,981 ms (~4 seconds)
  - Max response time: 10,749 ms (~10.7 seconds)
  - Min response time: 298 ms

**Observations**:

- The response time is relatively low and stable for 10 and 100 users, with the mean decreasing slightly at 100 users.
- At 1,000 users, the response time dramatically increases to several seconds, indicating a significant impact on server performance under heavy load.

This suggests that the server handles up to 100 users efficiently, but performance degrades considerably at 1,000 users.

## API LOAD AT GET /V1/TICKETS

TODO: Complete summary
