import express from "express";
import { runSQLQuery } from "../service/postgres";

export const runExpressServer = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Create Express server
        const app = express();
        app.set("port", process.env.PORT || 5000);

        // Health check
        app.get("/ready", (req, res, next) => {
            res.status(200)
            res.json({})
        })

        // SQL test
        app.get("/sqltest", async (req, res, next) => {
            const nowFromPg = await runSQLQuery('SELECT NOW()')
            res.status(200)
            res.json({result: nowFromPg})
        })

        app.listen(app.get("port"), () => {
            console.log(
                " 🚀 Express App is running at http://localhost:%d in %s mode",
                app.get("port"),
                app.get("env")
            );
            console.log("  Press CTRL-C to stop\n");
            resolve();
        });
    })
}