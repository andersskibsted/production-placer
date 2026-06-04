# productionPlacer
The new tool for enhancing coorporation between production of refined goods dependent on agricultural produce

To run, Docker is required.
From the root directory of the unzipped file, run:

```
docker compose up --build
```

To close press ``` d ``` to detach and then 

``` 
docker compose down -v
```

Then ProductionPlacer is available in your prefered browser at 

``` 
http://localhost:5173
```


# ProductionPlacer how-to:
It is based on production data of danish agriculture, from 2005-2025.
You can look up production of different produce by region and year.
You can see the development in yields for a given region from 2005-2025.
You can find a suitable region for your next production.
See which regions can provide the necessary amount of crops for your production.
Register your production in the database with the required produce.
Delete a production from the database by the production ID.

# RegEx
RegEx's have been used to verify correct input to year and to production names.

```js 
const regex = /^20((0[5-9])|(1[0-9])|(2[0-5]))$/;
...
const regex = /^[A-Z]([a-z,A-Z]+\s?)*[0-9]*$/; 
```

