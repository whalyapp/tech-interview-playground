import express from "express";

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