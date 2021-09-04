const express = require("express");
const path = require("path");
const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "."));
const base = require("airtable").base("appNeB87OTy9Ndvlb");

let records;

app.get("/", (req, res) => {
    //your existing code

    if (records) {
        console.log("cached");
        res.render("page", {
            records,
        });
        console.log('running 1')
    } else {
        (async () => {
            //...
            records = await base("Business Hours")
                .select({
                    view: "Grid view",
                })
                .firstPage();

            for (const record of records) {
                ///console.log(record.fields);
                //console.log(record.get("Day"), record.get("Hours"))
            }
            for (const record of records) {
                // console.log(record.fields)
                //console.log(record.get("Day"), record.get("Hours"));
            }
            res.render("page", {
                records,
            });

            setTimeout(() => {
                records = null;
            }, 10 * 1000);
        })();

        console.log('running 2')
    }
});

app.listen(3000, () => console.log("Server ready"));
