const express = require("express");
const path = require("path");
const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "."));
const base = require("airtable").base("appNeB87OTy9Ndvlb");

app.get("/", (req, res) => {
    //your existing code

    (async () => {
        //...
        const records = await base("Business Hours")
            .select({
                view: "Grid view",
            })
            .firstPage();

        for (const record of records) {
            console.log(record.fields);
            //console.log(record.get("Day"), record.get("Hours"))
        }
        for (const record of records) {
            // console.log(record.fields)
            console.log(record.get("Day"), record.get("Hours"));
        }
        res.render("page", {
            records,
        });
    })();
});

app.listen(3000, () => console.log("Server ready"));
