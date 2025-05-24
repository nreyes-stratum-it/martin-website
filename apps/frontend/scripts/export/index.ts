import {exportRoutingData} from "./export-routing";

(async () => {
    try {
        await exportRoutingData();
        console.log("✅ All data exported successfully.");
    } catch (err: any) {

        if (err?.response) {
            const {status, statusText, data} = err.response;
            console.error(`❌ Export failed (${status} ${statusText}) – ${data?.error ?? err.message}`);
        } else {
            console.error(`❌ Export failed: ${err.message ?? err}`);
        }
        process.exit(1);
    }
})();
